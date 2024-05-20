//Make environment available to the app
const dotenv = require("dotenv");
dotenv.config();

//Import express and create an instance of express
const express = require("express");
const app = express();

const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

//Import the auth controller from the auth.js file
const authController = require("./controllers/auth.js")

//This allows a port to be added to the .env a future date without changes needing to be made to the source code
//Can also write const port = process.env.PORT || 3000
const port = process.env.PORT ? process.env.PORT : 3000;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
});

//Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({extended: false}));

//Middleware for using HTTP verbs such as PUT or DELETE in places where the client doesn't support it
app.use(methodOverride("_method"));

//Middleware for logging HTTP requests
app.use(morgan("dev"));

//Use express session for auth
app.use(
    session({
        secret: process.env.SESSION_SECRET, 
        resave: false,
        saveUninitialized: true,
})
);

//Use the auth controller for any requests that start with /auth (auth endpoint)
app.use("/auth", authController);

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs", {
        user: req.session.user,
    });
});

//Listen for incoming requests
app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`)
});