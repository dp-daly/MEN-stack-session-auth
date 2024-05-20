//Make environment available to the app
const dotenv = require("dotenv");
dotenv.config();

//Import express and create an instance of express
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

//This allows a port to be added to the .env a future date without changes needing to be made to the source code
//Can also write const port = process.env.PORT || 3000
const port = process.env.PORT ? process.env.PORT : 3000;

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
});

app.use(express.urlencoded({extended: false}));