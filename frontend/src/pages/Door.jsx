import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import axios from "axios";
import AnswerBox from "../components/AnswerBox";
import StatsBar from "../components/StatsBar";

export default function Door() {
  const { phaseId } = useParams(); // "door1", "door2", "door3"
  const { player, setPlayer } = usePlayer();
  const [question, setQuestion] = useState(null);
  const [levelConquered, setLevelConquered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const apiPhase = phaseId?.replace("door", "phase");
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  // 🎨 Door display titles
  const doorTitles = {
    door1: "Neural Gate",
    door2: "Quantum Threshold",
    door3: "Entropy Vault",
  };

  // 🖼️ Background images
  const doorImages = {
    door1: "/images/neuralgate.jpeg",
    door2: "/images/quantumthreshold.jpeg",
    door3: "/images/entropyvault.jpeg",
  };

  useEffect(() => {
    if (!player || !apiPhase) return;

    const currentDoor = player.unlockedPhases?.find(
      (d) => d.doorName === phaseId
    );
    const currentQNo = currentDoor?.currentQuestion ?? 0;

    if (currentQNo === 0) {
      setIsLocked(true);
      return;
    }

    if (currentQNo > 3) {
      setLevelConquered(true);
      return;
    }

    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/questions/${apiPhase}`);
        const q = res.data.find((q) => q.serialNo === currentQNo);
        setQuestion(q);
      } catch (err) {
        console.error("Error fetching question:", err);
      }
    };

    fetchQuestion();
  }, [apiPhase, player, phaseId]);

  const handleCorrectAnswer = async () => {
    const currentDoorIndex = player.unlockedPhases.findIndex(
      (d) => d.doorName === phaseId
    );
    if (currentDoorIndex === -1) return;

    const updatedPhases = [...player.unlockedPhases];
    const nextQ = updatedPhases[currentDoorIndex].currentQuestion + 1;
    updatedPhases[currentDoorIndex] = {
      ...updatedPhases[currentDoorIndex],
      currentQuestion: nextQ,
    };

    try {
      await axios.put(`${API_BASE}/api/users/${player.username}`, {
        unlockedPhases: updatedPhases,
      });

      const res = await axios.get(`${API_BASE}/api/users/${player.username}`);
      setPlayer(res.data);

      if (nextQ > 3) {
        setLevelConquered(true);
        setQuestion(null);
      }
    } catch (err) {
      console.error("Failed to update player progress:", err);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col text-white overflow-hidden"
      style={{
        backgroundImage: `url(${doorImages[phaseId]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ✅ Overlay and StatsBar */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <StatsBar />

      {/* 🧠 Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 p-6 text-center">
        <h2
          className="text-5xl font-extrabold mb-6 tracking-widest drop-shadow-lg animate-fadeIn"
          style={{
            textShadow: "0 0 25px rgba(147, 197, 253, 0.9)",
          }}
        >
          {doorTitles[phaseId]}
        </h2>

{isLocked ? (
  <p className="text-red-400 text-lg font-semibold animate-fadeIn">
    🔒 This door is not unlocked yet.
  </p>
) : levelConquered ? (
  <p className="text-green-400 text-xl mb-6 font-semibold animate-bounce">
    🎉 Door Cleared!
  </p>
) : question ? (
  <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700/70 rounded-3xl p-10 shadow-[0_0_25px_rgba(0,0,0,0.5)] w-full max-w-2xl animate-fadeIn transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,0,0,0.6)]">
    
    {/* 🧩 Question Text */}
    {question.content?.text && (
      <p className="text-lg mb-6 text-gray-100 leading-relaxed tracking-wide">
        {question.content.text}
      </p>
    )}

    {/* 🖼️ Question Image */}
    {question.content?.image && (
      <img
        src={question.content.image}
        alt="Question"
        className="w-full max-h-80 object-contain rounded-xl mb-6 shadow-lg border border-gray-700/70"
      />
    )}

    {/* 🔗 Question Link */}
    {question.content?.link && (
      <a
        href={question.content.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-indigo-400 hover:text-indigo-300 underline mb-6 transition-colors"
      >
        🔗 View Reference
      </a>
    )}

    {/* 🧠 Answer Box */}
    <div className="mt-4">
      <AnswerBox
        username={player.username}
        phaseId={apiPhase}
        serialNo={question.serialNo}
        onSubmit={handleCorrectAnswer}
      />
    </div>
  </div>
) : (
  <p className="text-gray-300 mb-6 animate-pulse">Loading question...</p>
)}



        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/game")}
          className="mt-10 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          ← Back to Atrium
        </button>
      </div>
    </div>
  );
}
