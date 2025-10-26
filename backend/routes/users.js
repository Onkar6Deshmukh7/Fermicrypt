import express from "express";
import {
  registerUser,
  loginUser,
  updateProgress,
  toggleCanAnswer,
  getUser,
  getAllUsers,
  deleteUser,
  deleteSessionUsers,
  startGameForUser,
  reconnectUser,
  deleteAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/start-game", startGameForUser);       // start game
router.post("/reconnect", reconnectUser);          // reconnect after disconnect
router.patch("/:userId/progress", updateProgress);
router.patch("/:userId/toggle", toggleCanAnswer);
router.get("/:userId", getUser);
router.get("/", getAllUsers);
router.delete("/:userId", deleteUser);
router.delete("/session/:sessionId", deleteSessionUsers);
router.post("/deleteAll", deleteAllUsers); // delete all users

export default router;