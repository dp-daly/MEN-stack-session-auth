const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//Import model
const User = require("../models/user.js");


//no longer app.get - "app" refers to server.js because it's our entry point
//address will be localhost:3000/auth/sign-up
//If you said /auth here again, there would be a clash, because it's defined when app.use("/auth", authController) was called in server.js
router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});

//These details match the html form
router.post("/sign-up", async (req, res) => {
    //your code here
    //user will send us the username, pword and pword confirmation
    // - check if username is unique/already taken
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.send("Username already taken.");
    }

    // - check if the pword and pword confirmation are the same
    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Passwords do not match.");
    }

    // - do any pword validation (e.g. you must have a special character, and so on)
    //! Regex test - allows tests on strings
    const hasUpperCase = /[A-Z]/.test(req.body.password);
    if (!hasUpperCase) {
        return res.send("Password must contain at least one uppercase letter.");
    }

    if (req.body.password.length < 8) {
        return res.send("Password must be at least 8 characters long.")
    }
});

module.exports = router;

