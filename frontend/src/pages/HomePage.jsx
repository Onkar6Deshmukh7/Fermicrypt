import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import { registerUser } from "../utils/api";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [displayText, setDisplayText] = useState("");
  const title = "Fermicrypt";
  const { setPlayer } = usePlayer();
  const navigate = useNavigate();

  // 🎬 Fixed typewriter effect
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
      const user = await registerUser(username.trim());
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
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 text-center animate-fadeIn">
        <h1 className="text-5xl font-extrabold mb-6 tracking-widest text-cyan-400 drop-shadow-lg">
          {displayText}
          <span className="border-r-4 border-cyan-400 animate-pulse ml-1"></span>
        </h1>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 rounded-md text-black w-64 focus:outline-none focus:ring-4 focus:ring-cyan-400"
        />

        <button
          onClick={handleStart}
          className="mt-6 bg-cyan-500 hover:bg-cyan-400 px-8 py-3 rounded-lg font-semibold text-black transition-transform transform hover:scale-105 shadow-lg"
        >
          Start Game
        </button>
      </div>

      {/* Subtle tagline */}
      <div className="absolute bottom-10 text-cyan-300 text-sm opacity-70 animate-pulse">
        Decode the unknown. Enter the crypt.
      </div>
    </div>
  );
}
