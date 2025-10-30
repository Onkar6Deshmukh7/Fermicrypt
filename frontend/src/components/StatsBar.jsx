// StatsBar.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

export default function StatsBar() {
  const { player } = usePlayer();
  const location = useLocation();

  if (!player) return null;

  const isGamePage = location.pathname.includes("/game");

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4
        text-white z-50 select-none`}
      style={{
        background: "transparent",
        pointerEvents: "none", // ensures it never blocks interactions behind it
      }}
    >
      <span
        className="font-semibold text-xl tracking-wide"
        style={{
          textShadow: "0 0 8px rgba(255, 255, 255, 0.4)",
        }}
      >
        {player.username}
      </span>
      <span
        className="text-lg font-bold"
        style={{
          background: "linear-gradient(to right, #60a5fa, #c084fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 8px rgba(96,165,250,0.5)",
        }}
      >
        Score: {player.score}
      </span>
    </div>
  );
}
