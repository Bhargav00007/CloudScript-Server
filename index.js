const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
require("dotenv").config();

connectToMongo();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "https://cloudscript-one.vercel.app", // Replace with your Vercel frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the HTTP methods you need
    credentials: true, // Allow cookies and other credentials to be sent
  })
);

// Middleware for JSON
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Export the app module for Vercel
module.exports = app;
