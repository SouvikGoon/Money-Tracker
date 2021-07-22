const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

/*------------------------------------User Registration Route-----------------------------------------------*/

//validation of user data for registration
const validationSchemaRegistration = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

//register
router.post("/register", async (req, res) => {
  //validate user data
  const { error } = validationSchemaRegistration.validate(req.body);
  if (error) {
    return res.status(400).json({ joierror: error });
  }

  //if user already exists
  const existsUser = await User.findOne({ email: req.body.email });
  if (existsUser) {
    return res.status(200).json({ message: "User already exists!" });
  }

  //if valid user data and user doesn't exist already
  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //add user to db
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const addedUser = await newUser.save();
    res.status(201).json({
      success: true,
      userDetails: { username: addedUser.name, useremail: addedUser.email },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/*------------------------------------ User Login Route ---------------------------------------------------*/

//validation of user Data for Login
const validationSchemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

//login
router.post("/login", async (req, res) => {
  //validate user data
  const { error } = validationSchemaLogin.validate(req.body);
  if (error) {
    return res.status(400).json({ joierror: error });
  }

  //check if user exists or not
  const existsUser = await User.findOne({ email: req.body.email });
  if (!existsUser) {
    return res.status(400).json({ message: "User doesn't exist!" });
  }

  //check if password is correct
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    existsUser.password
  );
  if (!isValidPassword) {
    res.status(400).json({ message: "Password incorrect!" });
  }

  //create a token if all above validation succeeds and return success message along with token
  const token = jwt.sign({ user_id: existsUser._id }, process.env.TOKEN_SECRET);
  res
    .header("auth-token", token)
    .status(200)
    .json({ message: "Login success", auth_token: token });
});

module.exports = router;
