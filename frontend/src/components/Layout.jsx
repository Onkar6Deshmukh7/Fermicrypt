import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import SpaceWarp from "./SpaceWarp";
import Stats from "./Stats";
import { usePlayer } from "../context/PlayerContext";

export default function Layout({ children, warp, setWarp, currentSin }) {
  const navigate = useNavigate();
  const { playerData } = usePlayer(); // <-- get player data from context
  const [showMenu, setShowMenu] = useState(false);

  const sins = [
    { name: "Lust", path: "/lust", color: "bg-pink-500" },
    { name: "Gluttony", path: "/gluttony", color: "bg-yellow-500" },
    { name: "Greed", path: "/greed", color: "bg-green-500" },
    { name: "Sloth", path: "/sloth", color: "bg-blue-500" },
    { name: "Wrath", path: "/wrath", color: "bg-red-500" },
    { name: "Envy", path: "/envy", color: "bg-emerald-500" },
    { name: "Pride", path: "/pride", color: "bg-purple-500" },
  ];

  const fanPositions = [
    { x: 0, y: -120 },
    { x: 90, y: -90 },
    { x: 120, y: 0 },
    { x: 90, y: 90 },
    { x: 0, y: 120 },
    { x: -90, y: 90 },
    { x: -120, y: 0 },
  ];

  // Show stats bar if playerData exists
  const showStats = !!playerData;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Stats bar */}
      {showStats && (
        <div className="fixed top-0 left-0 w-full z-50">
          <Stats
            playerName={playerData.username}
            score={playerData.score}
            credits={playerData.credits}
            unlockedSins={playerData.unlockedSins}
          />
        </div>
      )}

      {/* Warp overlay */}
      <SpaceWarp show={warp} />

      {/* Page content */}
      <div className={`relative transition-all duration-300 ${showMenu ? "blur-3xl pointer-events-none select-none" : ""}`}>
        {children}
      </div>

      {/* Rocket + fan buttons */}
      <div className={`absolute z-30 flex justify-center items-center ${
        showMenu ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" : "bottom-12 right-12"
      }`}>
        {sins.map((sin, idx) => {
          if (sin.name === currentSin) return null;
          const pos = fanPositions[idx];
          return (
            <motion.button
              key={sin.name}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={showMenu ? { x: pos.x, y: pos.y, opacity: 1 } : { x: 0, y: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className={`absolute px-5 py-2 rounded-full ${sin.color} text-white shadow-lg hover:scale-110 whitespace-nowrap`}
              onClick={() => {
                setWarp(true);
                setShowMenu(false);
                setTimeout(() => {
                  navigate(sin.path);
                  setWarp(false);
                }, 800);
              }}
            >
              {sin.name}
            </motion.button>
          );
        })}

        <button
          className="p-5 bg-transparent border-2 border-white/60 rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] transition-all animate-pulse flex items-center justify-center text-white text-2xl z-40"
          onClick={() => setShowMenu(!showMenu)}
          title="Switch Sin"
        >
          <FaRocket size={28} />
        </button>
      </div>
    </div>
  );
}
