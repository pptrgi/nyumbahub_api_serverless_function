const mongoose = require("mongoose");
require("dotenv").config();
const connectToDb = require("../config/dbConnect");
const cookieParser = require("cookie-parser");
const cors = require("cors");

connectToDb();

const express = require("express");
const app = express();
const serverless = require("serverless-http");
const corsOptions = require("../config/corsOptions");

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const router = require("../routes/routes");

// database connection
mongoose.connection.once("open", () => {
  console.log("Connected to the database");
});
app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
