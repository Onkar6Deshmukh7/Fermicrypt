import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/users`);
        // Sort by score descending
        const sorted = res.data.sort((a, b) => b.score - a.score);
        setPlayers(sorted);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 3000); // updates every 3s
    return () => clearInterval(interval);
  }, [API_BASE]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">🏆 Leaderboard</h1>

      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Player</th>
              <th className="py-3 px-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr
                key={player.username}
                className="border-t border-gray-700 hover:bg-gray-700"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{player.username}</td>
                <td className="py-3 px-4">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate("/game")}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium"
      >
        ← Back to Game
      </button>
    </div>
  );
}
