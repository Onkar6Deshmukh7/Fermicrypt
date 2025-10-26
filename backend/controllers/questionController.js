import Question from "../models/Question.js";

// 1️⃣ Add a new question
export const addQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 2️⃣ Fetch question by sin + serialNo
export const getQuestions = async (req, res) => {
  try {
    console.log("Received query:", req.query);
    let { sin, serialNo } = req.query;

    // Fix duplicated array issue
    if (Array.isArray(sin)) sin = sin[0];
    if (Array.isArray(serialNo)) serialNo = serialNo[0];

    console.log("Processed query:", { sin, serialNo });

    // If both sin and serialNo are provided → return one question
    if (sin && serialNo) {
      const question = await Question.findOne({ sin, serialNo });
      if (!question) return res.status(404).json({ error: "Question not found" });
      return res.json(question);
    }

    // If only sin provided → return all questions of that sin
    if (sin) {
      const questions = await Question.find({ sin }).sort({ serialNo: 1 });
      return res.json(questions);
    }

    // If no filters → return all questions
    const allQuestions = await Question.find().sort({ sin: 1, serialNo: 1 });
    res.json(allQuestions);
  } catch (err) {
    console.error("Error in getQuestions:", err);
    res.status(500).json({ error: err.message });
  }
};

// 3️⃣ Update a question by sin + serialNo
export const updateQuestion = async (req, res) => {
  try {
    const { sin, serialNo, ...updateData } = req.body;

    if (!sin || !serialNo)
      return res.status(400).json({ error: "sin and serialNo required" });

    const updatedQuestion = await Question.findOneAndUpdate(
      { sin, serialNo },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedQuestion)
      return res.status(404).json({ error: "Question not found" });

    res.json({ message: "Question updated successfully", question: updatedQuestion });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4️⃣ Delete a question by sin + serialNo
export const deleteQuestion = async (req, res) => {
  try {
    const { sin, serialNo } = req.query;

    if (!sin || !serialNo)
      return res.status(400).json({ error: "sin and serialNo required" });

    const deletedQuestion = await Question.findOneAndDelete({ sin, serialNo });

    if (!deletedQuestion)
      return res.status(404).json({ error: "Question not found" });

    res.json({ message: "Question deleted successfully", question: deletedQuestion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5️⃣ Check answer
export const checkAnswer = async (req, res) => {
  try {
    const { sin, serialNo, answer } = req.body;

    if (!sin || !serialNo || !answer)
      return res.status(400).json({ error: "sin, serialNo and answer required" });

    const question = await Question.findOne({ sin, serialNo });
    if (!question) return res.status(404).json({ error: "Question not found" });

    const isCorrect = question.answer === answer.toLowerCase();
    res.json({ correct: isCorrect, correctAnswer: question.answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
