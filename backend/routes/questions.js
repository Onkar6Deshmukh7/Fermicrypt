import express from "express";
import {
  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  checkAnswer,
} from "../controllers/questionController.js";

const router = express.Router();

// Add a new question
router.post("/add", addQuestion);

// Fetch all questions
router.get("/", getQuestions);

// Update a question by sin + serialNo
router.put("/", updateQuestion);

// Delete a question by sin + serialNo
router.delete("/", deleteQuestion);

// Check answer
router.post("/check", checkAnswer);

export default router;