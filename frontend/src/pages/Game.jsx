import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import StatsBar from "../components/StatsBar";
import RulesModal from "../components/Rules"; // 👈 Import your modal

// 🌐 Load backend URL from .env
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Game() {
  const { player } = usePlayer();
  const navigate = useNavigate();
  const [showRules, setShowRules] = useState(false); // 👈 modal state

  const handleDoorClick = (doorName) => {
    const hasDoor = player?.unlockedPhases?.some(
      (phase) => phase.doorName === doorName
    );
    if (hasDoor) navigate(`/door/${doorName}`);
    else console.log("LOCKED");
  };

  const doorLabels = {
    door1: { label: "Neural Gate", image: "/images/neuralgate.jpeg" },
    door2: { label: "Quantum Threshold", image: "/images/quantumthreshold.jpeg" },
    door3: { label: "Entropy Vault", image: "/images/entropyvault.jpeg" },
  };

  return (
    <div
      className="h-screen flex flex-col bg-cover bg-center text-white relative overflow-hidden"
      style={{ backgroundImage: "url('/images/homepagebg.jpeg')" }}
    >
      {/* Overlay layers */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-purple-700/20 blur-[160px] rounded-full -translate-x-1/3 -translate-y-1/3 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-fuchsia-600/20 blur-[180px] rounded-full translate-x-1/3 translate-y-1/3 animate-pulse" />

      <StatsBar />

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 relative z-10">
        <h1 className="text-5xl font-extrabold mb-16 tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 drop-shadow-[0_0_25px_rgba(255,0,255,0.4)] animate-pulse">
          SELECT YOUR GATEWAY
        </h1>

        <div className="flex space-x-12">
          {Object.entries(doorLabels).map(([doorName, { label, image }]) => (
            <button
              key={doorName}
              onClick={() => handleDoorClick(doorName)}
              className="group relative w-52 h-52 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)]
              hover:scale-110 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-500"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-all duration-500"
                style={{ backgroundImage: `url('${image}')` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-500"></div>
              <span className="relative z-10 text-xl font-semibold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {label}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/leaderboard")}
          className="mt-16 px-10 py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500
          hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 shadow-[0_0_25px_rgba(255,215,0,0.4)]
          hover:shadow-[0_0_45px_rgba(255,255,150,0.7)]"
        >
          🏆 View Leaderboard
        </button>
      </div>

      {/* 👇 Fixed Rules button */}
      <button
        onClick={() => setShowRules(true)}
        className="fixed bottom-6 left-6 px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-pink-500
                   text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)]
                   hover:scale-110 transition-all duration-300 z-50"
      >
        Rules
      </button>

      {/* 👇 Modal */}
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </div>
  );
}
