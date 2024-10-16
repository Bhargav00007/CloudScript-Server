const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "https://cloudscript-one.vercel.app", // Use environment variable for CORS origin, defaulting to your Vercel frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight requests
    credentials: true, // Allow credentials (cookies, etc.)
    allowedHeaders: ["Content-Type", "Authorization"], // Allow custom headers
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Handle preflight requests (OPTIONS)
app.options("*", cors()); // Enable CORS preflight for all routes

// Start the server if running locally (not required for Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running locally on port ${port}`);
  });
}

// Export the app for Vercel's serverless deployment
module.exports = app;
