const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';
var fetchuser = require('../middleware/fetchuser');
// Route1: POST /api/auth/createuser
router.post(
  '/createuser',// check the conditions to fill up
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  ],
  async (req, res) => {
    // if there is error , don't save it and show it 
    const result = validationResult(req);
    let success = false;
    if (!result.isEmpty()) {
      return res.status(400).json({ success, errors: result.array() });
    }
    //chicking wheter use with email eisgt already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "sorry user with this email alredy exist" });
    }

    //create user after confirming all the requirment's

    try {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);// performing hashing on password to make the password strong
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      })

      const data = {
        data: {
          user: user.id
        }                     //Payload of token 
      }
      success = true
      var authtoken = jwt.sign(data, JWT_SECRET); // genrating the token //using header(metadata about the token),payload , secret key // and signature is genrated autmatically 
      res.json({ success ,authtoken });
    }   // if any error accured other that we kept in mind that will be displayed here:
    catch (error) {
      console.error(error.message);
      res.status(500).send("same Error occured");
    }
  }
);
// Route2: POST /api/auth/login
router.post(
  '/login',// check the conditions to fill up
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'can not be blank').exists()
  ],
  async (req, res) => {
    const result = validationResult(req); //
    let success = false;
    if (!result.isEmpty()) {
      return res.status(400).json({ success, errors: result.array() });
    }

    const { email, password } = req.body; //extracting email and password from the body

    try {

      let user = await User.findOne({ email }); //finding wheteher the user exists or not
      if (!user) {
        return res.status(400).json({ success, error: "sorry , login with correct currdential" });
      }

      const PasswordCompare = await bcrypt.compare(password, user.password); //comparing password using bcrypt
      if (!PasswordCompare) {
        return res.status(400).json({ success, error: "sorry , login with correct currdential" });
      }

      const data = {
        data: {
          user: user.id
        }
      }
      success = true;
      var authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authtoken });  //send the token to user 
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);
// Route3: POST /api/auth/getuser
router.post('/getuser', fetchuser, //fetchuser is used wheter the token send by user is correct or not
  async (req, res) => {
    try {
      userId = req.user;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }

  });
module.exports = router;


