import { useState } from "react";
import { checkAnswer } from "../utils/api";
import axios from "axios";
import { usePlayer } from "../context/PlayerContext";

export default function AnswerBox({ username, phaseId, serialNo, onSubmit }) {
  const { setPlayer } = usePlayer();
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  if (!answer.trim()) return;
  setLoading(true);
  setMessage("");

  try {
    const isCorrect = await checkAnswer(username, phaseId, serialNo, answer.trim());

    if (isCorrect) {
      console.log("✅ Correct answer!");
      setMessage("✅ Correct answer!");
      onSubmit(true);

      // fetch current user data
      const userRes = await axios.get(`http://localhost:5000/api/users/${username}`);
      const user = userRes.data;
      const doorName = phaseId.replace("phase", "door");

      // find the door being answered
      const updatedPhases = user.unlockedPhases.map((phase) => {
        if (phase.doorName === doorName) {
          return { ...phase, currentQuestion: phase.currentQuestion + 1 };
        }
        return phase;
      });

      // calculate score increment (10, 20, 30)
      const scoreAdd = serialNo * 10;
      const newScore = (user.score || 0) + scoreAdd;

      // unlock next door rule
      if (doorName === "door1" && serialNo === 1) {
        const door2 = updatedPhases.find((d) => d.doorName === "door2");
        if (door2 && door2.currentQuestion === 0) door2.currentQuestion = 1;
      } else if (doorName === "door2" && serialNo === 1) {
        const door3 = updatedPhases.find((d) => d.doorName === "door3");
        if (door3 && door3.currentQuestion === 0) door3.currentQuestion = 1;
      }

      // update user in backend
      await axios.put(`http://localhost:5000/api/users/${username}`, {
        score: newScore,
        unlockedPhases: updatedPhases,
      });

      console.log("🔓 Updated phases:", updatedPhases);

      // ✅ immediately fetch and update player context
      const updatedUser = await axios.get(`http://localhost:5000/api/users/${username}`);
      setPlayer(updatedUser.data);
    } else {
      console.log("❌ Incorrect answer!");
      setMessage("❌ Incorrect answer!");
      onSubmit(false);
    }
  } catch (err) {
    console.error("⚠️ Error in handleSubmit:", err);
    setMessage("⚠️ Something went wrong");
  }

  setLoading(false);
  setAnswer("");
};

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter your answer..."
        className="w-64 px-3 py-2 mb-4 text-black rounded"
        disabled={loading}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded ${
          loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        {loading ? "Checking..." : "Submit"}
      </button>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}
