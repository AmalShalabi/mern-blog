const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

//Register a new user
const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

//loginUser
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const userDocument = await User.findOne({ username });
  // Checks to see if user is in database
  if (!userDocument) {
    // return res.json({status: 'error', error: 'Invalid username'})
    return res.status(400).json({ error: "Invalid username" });
  }
  // Compares the password input by the user to the hashed password in the database
  const passOk = await bcrypt.compare(password, userDocument.password);
  if (passOk) {
    jwt.sign(
      { username, id: userDocument._id },
      process.env.JWT_KEY,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDocument._id,
          username,
        });
      }
    );
  } else {
    res.status(400).json("wrong credentials");
  }
};


const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "JWT token missing" });
  }
  jwt.verify(token, process.env.JWT_KEY, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ error: "Invalid JWT token" });
    }
    res.json(info);
  });
};


const logout = (req, res) => {
  res.cookie("token", "").json("ok");
};



module.exports = { createUser, loginUser,getProfile,logout };
