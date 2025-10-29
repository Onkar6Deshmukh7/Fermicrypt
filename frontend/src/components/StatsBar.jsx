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
      className={`w-full flex justify-between items-center px-6 py-3 
        ${isGamePage ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"}
        shadow-md`}
    >
      <span className="font-semibold text-lg">{player.username}</span>
      <span className="text-lg font-bold">Score: {player.score}</span>
    </div>
  );
}
