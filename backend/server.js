import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Routes
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

dotenv.config();

const app = express();

// -------------------------------
// Middleware
// -------------------------------
app.use(cors());
app.use(express.json());

// -------------------------------
// MongoDB Connection
// -------------------------------
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fermicrypt";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// -------------------------------
// API Routes
// -------------------------------
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

// -------------------------------
// Start Server
// -------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
