import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/users.js";         // User routes with controller
import questionRoutes from "./routes/questions.js"; // Question routes with controller

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running and MongoDB connection is active!");
});

// Routes
app.use("/api/users", userRoutes);        // All user-related routes
app.use("/api/questions", questionRoutes); // All question-related routes

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));