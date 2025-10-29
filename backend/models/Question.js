import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  phaseId: { type: String, required: true },   // Phase1, Phase2, Phase3
  serialNo: { type: Number, required: true }, // 1, 2, 3
  content: {
    text: { type: String, required: true },
    image: { type: String, default: "" },
    link: { type: String, default: "" }
  },
  answer: { type: String, required: true },
  difficulty: { type: String, default: "medium" }
});

export default mongoose.model("Question", questionSchema);