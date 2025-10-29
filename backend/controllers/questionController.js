import Question from "../models/Question.js";

// ➕ Add a new question
export const addQuestion = async (req, res) => {
  try {
    const { phaseId, serialNo, content, answer, difficulty } = req.body;

    if (!phaseId || !serialNo || !content?.text || !answer) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const question = new Question({ phaseId, serialNo, content, answer, difficulty });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Get question by phase + serialNo
export const getQuestion = async (req, res) => {
  try {
    console.log("📩 Backend hit for phase:", phaseId);
    const { phaseId, serialNo } = req.params;
    console.log(`Fetching question for phaseId=${phaseId}, serialNo=${serialNo}`);
    const question = await Question.findOne({ phaseId, serialNo: Number(serialNo) });
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get all questions of a phase
export const getQuestionsByPhase = async (req, res) => {
  try {
    const { phaseId } = req.params;
    const questions = await Question.find({ phaseId }).sort({ serialNo: 1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Delete question
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndDelete(id);
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Check answer and update user progress
export const checkAnswer = async (req, res) => {
  try {
    console.log("📩 Received in backend:", req.body);

    const { username, phaseId, serialNo, answer } = req.body;

    if (!phaseId || !answer) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const question = await Question.findOne({
      phaseId: phaseId.toLowerCase(),
      serialNo: Number(serialNo),
    });

    if (!question) {
      console.log("❌ Question not found:", { phaseId, serialNo });
      return res.status(404).json({ error: "Question not found" });
    }

    const isCorrect =
      question.answer.trim().toLowerCase() === answer.trim().toLowerCase();

    // 🔹 Send only a boolean response
    return res.json(isCorrect);
  } catch (err) {
    console.error("❌ Error checking answer:", err);
    res.status(500).json(false);
  }
};
