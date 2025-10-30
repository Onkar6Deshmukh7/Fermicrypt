import User from "../models/User.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // check if user already exists
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json(existingUser); // return existing user directly
    }

    // initialize with all 3 doors, only door1 has question 1 unlocked
    const newUser = await User.create({
      username,
      score: 0,
      totalScore: 0,
      unlockedPhases: [
        { doorName: "door1", currentQuestion: 1 },
        { doorName: "door2", currentQuestion: 0 },
        { doorName: "door3", currentQuestion: 0 },
      ],
      lastGame: null,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get user by username
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user's totalScore or lastGame
export const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const updates = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ Handle unlockedPhases smartly
    if (updates.unlockedPhase && Array.isArray(updates.unlockedPhase)) {
      for (const phase of updates.unlockedPhases) {
        const existing = user.unlockedPhases.find(
          (p) => p.doorName === phase.doorName
        );
        if (existing) {
          // update the currentQuestion for existing door
          existing.currentQuestion = phase.currentQuestion;
        } else {
          // add as a new unlocked door
          user.unlockedPhases.push(phase);
        }
      }
      delete updates.unlockedPhases; // prevent duplication in next step
    }

    // ✅ Apply remaining updates (like score, totalScore, etc.)
    Object.entries(updates).forEach(([key, value]) => {
      user[key] = value;
    });

    await user.save();
    res.json(user);
  } catch (error) {
    console.error("❌ updateUser error:", error);
    res.status(500).json({ error: error.message });
  }
};



// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a single user by username
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: `User '${req.params.username}' deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete all users
export const deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.json({ message: `${result.deletedCount} user(s) deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};