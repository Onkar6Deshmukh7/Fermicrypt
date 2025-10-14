// models/Question.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  sin: {
    type: String,
    enum: ["lust","gluttony","greed","sloth","wrath","envy","pride"],
    required: true,
  },
  serialNo: {
    type: Number,
    required: true,
    min: 1,
    max: 3, // 3 questions per sin
  },
  content: {
    text: { type: String, default: "" },
    image: { type: String, default: "" },
    link: { type: String, default: "" },
  },
  answer: {
    type: String,
    required: true,
    match: /^[a-z0-9]+$/, // lowercase alphanumeric
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },
});

export default mongoose.model("Question", questionSchema);