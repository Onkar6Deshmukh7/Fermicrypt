import { useState } from "react";
import { checkAnswer } from "../utils/api";
import axios from "axios";
import { usePlayer } from "../context/PlayerContext";

export default function AnswerBox({ username, phaseId, serialNo, onSubmit }) {
  const { setPlayer } = usePlayer();
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

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

        // hide message after 1.5s
        setTimeout(() => setMessage(""), 1500);

        // fetch current user data
        const userRes = await axios.get(`${backendURL}/api/users/${username}`);
        const user = userRes.data;
        const doorName = phaseId.replace("phase", "door");

        const updatedPhases = user.unlockedPhases.map((phase) => {
          if (phase.doorName === doorName) {
            return { ...phase, currentQuestion: phase.currentQuestion + 1 };
          }
          return phase;
        });

        const scoreAdd = serialNo * 10;
        const newScore = (user.score || 0) + scoreAdd;

        if (doorName === "door1" && serialNo === 1) {
          const door2 = updatedPhases.find((d) => d.doorName === "door2");
          if (door2 && door2.currentQuestion === 0) door2.currentQuestion = 1;
        } else if (doorName === "door2" && serialNo === 1) {
          const door3 = updatedPhases.find((d) => d.doorName === "door3");
          if (door3 && door3.currentQuestion === 0) door3.currentQuestion = 1;
        }

        await axios.put(`${backendURL}/api/users/${username}`, {
          score: newScore,
          unlockedPhases: updatedPhases,
        });

        const updatedUser = await axios.get(`${backendURL}/api/users/${username}`);
        setPlayer(updatedUser.data);
      } else {
        console.log("❌ Incorrect answer!");
        setMessage("❌ Incorrect answer!");
        // hide message after 1.5s
        setTimeout(() => setMessage(""), 1500);
      }
    } catch (err) {
      console.error("⚠️ Error in handleSubmit:", err);
      setMessage("⚠️ Something went wrong");
      setTimeout(() => setMessage(""), 2000);
    }

    setLoading(false);
    setAnswer("");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter your answer..."
        className="w-72 px-4 py-3 text-center text-white placeholder-gray-400 bg-gray-900/60 border border-indigo-500/40 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
        disabled={loading}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
          loading
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-105"
        }`}
      >
        {loading ? "Checking..." : "Submit"}
      </button>

      {message && (
        <p
          className={`mt-2 text-base font-medium transition-opacity duration-500 ${
            message.includes("✅")
              ? "text-green-400"
              : message.includes("❌")
              ? "text-red-400"
              : "text-yellow-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
