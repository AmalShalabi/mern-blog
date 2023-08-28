const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

// Create a new user
router.post("/register", userControllers.createUser);
router.post("/login", userControllers.loginUser);
router.get("/profile", userControllers.getProfile);
router.post("/logout", userControllers.logout);


module.exports = router;
