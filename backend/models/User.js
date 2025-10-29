import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  score: { type: Number, required: true },

  // Array of unlocked doors (each with its current question)
  unlockedPhases: [
    {
      doorName: { type: String, required: true },
      currentQuestion: { type: Number, required: true },
    },
  ],

  totalScore: { type: Number, required: true },
});

export default mongoose.model("User", userSchema);
