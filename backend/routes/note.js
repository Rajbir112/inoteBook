const express = require('express');
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes'); // first import note model 
const { body, validationResult } = require('express-validator')
const router = express.Router();

// Route 1 : fetch the notes saved by user pi/notes/fetchallnotes. Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user }); //find wheter the notes existes for user using user's id
        res.json(notes); // return the notes
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
// Route 2 : add a new note api/notes/addnotes. Login required
router.post('/addnotes', fetchuser,
    [
        body('title', 'Enter a valid title').isLength({ min: 5 }),
        body('description', 'Description must be atleast 5 characters').isLength({ min: 3 })
    ],
    async (req, res) => {
        try {

            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }

            const { title, description, tag } = req.body; //extract title,description,tag form incomin data or body

            const note = new Notes({
                title, description, tag, user: req.user
            })

            const savedNote = await note.save();

            res.send(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");

        }
    });

// Route 3 : find the note and update it  api/notes/updatenote/:id. Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("note not found");
    }
    if (note.user.toString() != req.user) {
        return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(
        req.params.id, // Filter condition
        { $set: newNote }, // Update operation
        { new: true } // Options: return updated doc, create if not found
    );
    res.json(note);
})

// Route 4 : find the note and delete it  api/notes/deletenode/:id. Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // const { title, description, tag } = req.body;
    // const newNote = {};
    // if (title) { newNote.title = title }
    // if (description) { newNote.description = description }
    // if (tag) { newNote.tag = tag }

    let note = await Notes.findById(req.params.id);
    try {
        if (!note) {
            return res.status(404).send("note not found");
        }
        if (note.user.toString() != req.user) {
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;