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
    origin: process.env.CORS_ORIGIN || "https://cloudscript-one.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Health-check route for Render
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
