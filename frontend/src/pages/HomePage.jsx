import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import { registerUser } from "../utils/api";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [displayText, setDisplayText] = useState("");
  const title = "Fermicrypt";
  const { setPlayer } = usePlayer();
  const navigate = useNavigate();

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(title.slice(0, i + 1));
      i++;
      if (i === title.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const handleStart = async () => {
    if (!username.trim()) return alert("Please enter a username!");
    try {
      const user = await registerUser(username.trim(), BACKEND_URL);
      setPlayer(user);
      navigate("/game");
    } catch (err) {
      console.error("Error registering user:", err);
      alert("Error starting game.");
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/homepagebg.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Centered container */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center gap-8 animate-fadeIn">
        <h1 className="text-6xl font-extrabold tracking-widest text-cyan-400 drop-shadow-lg">
          {displayText}
          <span className="border-r-4 border-cyan-400 animate-pulse ml-1"></span>
        </h1>

        <div className="flex flex-col items-center gap-5">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-5 py-3 rounded-md text-black w-72 focus:outline-none focus:ring-4 focus:ring-cyan-400 text-center shadow-md"
          />

          <button
            onClick={handleStart}
            className="bg-cyan-500 hover:bg-cyan-400 px-10 py-3 rounded-lg font-semibold text-black transition-transform transform hover:scale-105 shadow-xl"
          >
            Start Game
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 text-cyan-300 text-sm opacity-70 animate-pulse">
        Decode the unknown. Enter the crypt.
      </div>
    </div>
  );
}
