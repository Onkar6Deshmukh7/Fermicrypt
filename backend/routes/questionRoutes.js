import express from "express";
import {
  addQuestion,
  getQuestion,
  getQuestionsByPhase,
  deleteQuestion,
  checkAnswer, // ✅ Import this
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/add", addQuestion);          // ➕ Add question
router.post("/check", checkAnswer);        // ✅ Check answer (should be above dynamic routes)

router.get("/:phaseId/:serialNo", getQuestion);  // 🔍 Get one question
router.get("/:phaseId", getQuestionsByPhase);    // 📋 Get all questions of a phase
router.delete("/:id", deleteQuestion);           // 🗑️ Delete question
                      // ✅ New route for checking answers

export default router;