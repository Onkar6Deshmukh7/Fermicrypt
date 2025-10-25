import mongoose from "mongoose";

const completedQuestionSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  sin: { type: String, required: true },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
  answeredAt: { type: Date, default: Date.now },
  pointsEarned: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    default: 0,
  },
  credits: {
    type: Number,
    default: 0,
  },
  unlockedSins: {
    type: [String],
    default: [],
  },
  currentSin: {
    type: String,
    default: "",
  },
  completedQuestions: {
    type: [completedQuestionSchema],
    default: [],
  },
  sessionId: {
    type: String,
    required: true, // must be provided during registration
  },
  connected: {
    type: Boolean,
    default: true,
  },
  canAnswer: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;