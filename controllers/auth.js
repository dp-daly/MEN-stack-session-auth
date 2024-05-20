const express = require("express");
const router = express.Router();


//no longer app.get - "app" refers to server.js because it's our entry point
//address will be localhost:3000/auth/sign-up
//If you said /auth here again, there would be a clash, because it's defined when app.use("/auth", authController) was called in server.js
router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});

module.exports = router;

