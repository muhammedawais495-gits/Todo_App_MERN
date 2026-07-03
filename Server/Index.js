
// Import express - a web framework to build the server
const express = require("express");
// Import mongoose - a library to connect and work with MongoDB database
const mongoose = require("mongoose");
// Import cors - allows requests from different websites/domains
const cors = require("cors");
// Import dns - for managing domain name system
const dns = require("dns");
// Import the todo routes - contains all the API endpoints for todos
const todoRoutes = require("./routes/todoRoutes");
// Load environment variables from .env file (like passwords, API keys, etc.)
require("dotenv").config();

// Set up Google's DNS servers for more reliable internet connection
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Create an express application
const app = express();
// Enable CORS - allows requests from frontend on different port/domain
app.use(cors());
// Parse incoming JSON data from requests
app.use(express.json());
// Set up routes for todo API - all todo endpoints start with /api/todos
app.use("/api/todos", todoRoutes);

// Get MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Check if MongoDB connection string exists
if (!MONGODB_URI) {
  // Show error if connection string is missing
  console.error("MONGODB_URI is missing. Add it to the .env file.");
  // Stop the server if we can't connect to database
  process.exit(1);
}

// Try to connect to MongoDB database
mongoose
  .connect(MONGODB_URI, {
    // Wait up to 30 seconds to select a server
    serverSelectionTimeoutMS: 30000,
    // Wait up to 45 seconds for socket operations
    socketTimeoutMS: 45000,
  })
  // If connection successful, show message
  .then(() => console.log("MongoDB connected!"))
  // If connection fails, show error and stop the server
  .catch((err) => {
    console.error("Connection error:", err.message);
    process.exit(1);
  });

// Start the server on port 3001 and listen for incoming requests
app.listen(3001, () => {
  // Show message when server successfully starts
  console.log("server is running");
});