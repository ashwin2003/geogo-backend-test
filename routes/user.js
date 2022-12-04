const express = require("express");
const joi = require("joi");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

const app = express();

// Register a New User.
app.post("/register", async (req, res) => {
  const checkUserInputs = joi.object({
    full_name: joi.string().min(3).max(30).required(),
    phone_number: joi.number(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    role: joi.string(),
  });

  const { full_name, phone_number, email, password, role } = req.body;

  if (!full_name || !phone_number || !email || !password)
    return res.status(500).send("Enter All details.");

  const emailExist = await User.findOne({ email: email });

  if (emailExist) return res.status(500).send("Email already exists.");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    full_name,
    phone_number,
    email,
    password: hashedPassword,
  });

  try {
    const validInputs = await checkUserInputs.validateAsync(req.body);
    const add = await newUser.save();
    return res.status(200).send("User created. Now you can login.");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login a User.
app.post("/login", async (req, res) => {
  const validateInputs = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(500).send("Enter email and password.");

  const user = await User.findOne({ email });

  if (!user) return res.status(500).send(`No user found with email ${email} .`);

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return res.status(500).send("Invalid password!");

  try {
    const validate = validateInputs.validateAsync({ email, password });

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);

    return res
      .status(200)
      .send(JSON.stringify({ name: user.full_name, token }));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// Get My Profile
app.get("/me", verifyToken, async (req, res) => {
  const user = req.user;
  return res.status(200).send(user);
});

module.exports = app;
