const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_PASS = "Night$Mare";


// Route : 1 // 
// Create a User [ POST ] : "/api/auth". Doesn't Req Autherization

router.post('/createuser', [
  body('name', 'Enter a valid name').notEmpty().isLength({ min: 4 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 6 characters').isLength({ min: 6 })

], async (req, res) => {

  // If any error occurs send bad request //
  let success = false
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  // Check wheather the user already existed or not //

  try {
    let user = await Users.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ success, errors: "User already exists" });
    }

    // Bcrypt Password //

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // If user is new !! //

    user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_PASS);
    console.log(authtoken);
    success = true;
    res.json({success})

    // Catch If there is any error

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error Occured");
  }
})


// Route : 2 // 
// Create a User [ POST ] : "/api/auth". Doesn't Req Autherization

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Wrong Password').exists(),

], async (req, res) => {
  let success = false
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password.")
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).send("Invalid email or password.")
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_PASS);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error Occured");
  }

});

// Route : 3 // 
// User Login [ POST ] : "/api/auth".  Req Login

router.post('/getuser', fetchuser , async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  try {

    const userId = req.user.id;
    let user = await Users.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error Occured");
  }
})

module.exports = router