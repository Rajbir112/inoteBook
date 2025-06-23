const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, //stored as Object id for optimization
        ref: 'User' // refreing user , for easy handling
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Notes = mongoose.model('notes', notesSchema);

module.exports = Notes;
