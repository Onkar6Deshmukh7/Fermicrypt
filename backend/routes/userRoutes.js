import express from "express";
import { createUser, getUser, updateUser, getAllUsers, deleteUser, deleteAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);          // Create new user
router.get("/:username", getUser);     // Get user by username
router.put("/:username", updateUser);  // Update lastGame or totalScore
router.get("/", getAllUsers);          // Get all users
router.delete("/:username", deleteUser);  // delete single user
router.delete("/", deleteAllUsers);     // delete all users

export default router;