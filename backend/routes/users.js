import express from "express";
import {
  registerUser,
  loginUser,
  updateProgress,
  toggleCanAnswer,
  getUser,
  getAllUsers,
  deleteUser,
  deleteSessionUsers
} from "../controllers/userController.js";

const router = express.Router();

// Register a new temporary user
router.post("/register", registerUser);

// Login with username/password
router.post("/login", loginUser);

// Update progress (score, credits, completedQuestions, currentSin)
router.put("/progress/:userId", updateProgress);

// Toggle canAnswer (used when session ends or player is paused)
router.put("/toggle/:userId", toggleCanAnswer);

// Get user info
router.get("/:userId", getUser);

// ✅ New route to get all users
router.get("/", getAllUsers);

// Delete a user
router.delete("/:userId", deleteUser);

// Delete sessionUsers
router.delete("/session/:sessionId", deleteSessionUsers);


export default router;