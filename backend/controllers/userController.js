import User from "../models/User.js";

// Register user
export const registerUser = async (req, res) => {
  try {
    const { username, password, sessionId } = req.body;

    if (!username || !password || !sessionId) {
      return res.status(400).json({ error: "username, password, and sessionId are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "Username already exists" });

    const newUser = new User({ username, password, sessionId });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(404).json({ message: "Invalid credentials" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update progress
export const updateProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { score, credits, completedQuestion, currentSin } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (score !== undefined) user.score = score;
    if (credits !== undefined) user.credits = credits;
    if (currentSin) user.currentSin = currentSin;
    if (completedQuestion) user.completedQuestions.push(completedQuestion);

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete all users of a session
export const deleteSessionUsers = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const result = await User.deleteMany({ sessionId });
    res.json({ message: `Users for session ${sessionId} deleted`, deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle canAnswer
export const toggleCanAnswer = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.canAnswer = !user.canAnswer;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user info
export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("completedQuestions.questionId");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all users (optionally, filter by sessionId via query param)
export const getAllUsers = async (req, res) => {
  try {
    const { sessionId } = req.query;
    const filter = sessionId ? { sessionId } : {};
    const users = await User.find(filter).sort({ score: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};