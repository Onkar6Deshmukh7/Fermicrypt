import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { usePlayer } from "../context/PlayerContext";
import ModeSelection from "../components/ModeSelection";
import WaitingRoom from "../components/WaitingRoom";
import useLobbySocket from "../hooks/useLobbySocket";

export default function Lobby() {
  const socket = useSocket();
  const navigate = useNavigate();
  const { setPlayerData } = usePlayer(); // get context setter

  const [mode, setMode] = useState("");
  const [username, setUsername] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [targetPlayers, setTargetPlayers] = useState(1);

  const { players, countdown, markReady } = useLobbySocket(socket, sessionId, username);

  // Create game
  const handleCreateGame = () => {
    if (!username.trim()) return alert("Enter a username!");
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    setSessionId(id);
    setIsCreator(true);
    setWaiting(true);
    socket.emit("createGame", { username, sessionId: id, targetPlayers });
  };

  // Join game
  const handleJoinGame = () => {
    if (!username.trim() || !sessionId.trim()) return alert("Enter username and session ID!");
    setIsCreator(false);
    setWaiting(true);
    socket.emit("joinGame", { username, sessionId });
  };

  // Redirect to random sin page after countdown
  useEffect(() => {
    if (countdown === 0 && players.length > 0) {
      const sinPages = ["/lust", "/gluttony", "/greed", "/sloth", "/wrath", "/envy", "/pride"];
      const randomPage = sinPages[Math.floor(Math.random() * sinPages.length)];
      const unlockedSin = randomPage.replace("/", ""); // "Lust", "Greed", etc.

      // Set playerData in context including randomly unlocked sin
      setPlayerData((prev) => ({
        ...prev,
        username,
        score: 0,
        credits: 0,
        unlockedSins: [unlockedSin],
      }));

      // Optionally emit to backend to persist in DB
      socket.emit("unlockSin", { sessionId, username, sin: unlockedSin });

      // Navigate to sin page
      navigate(randomPage);
    }
  }, [countdown, players, navigate, username, sessionId, setPlayerData, socket]);

  // Mode selection screen
  if (!mode) return <ModeSelection setMode={setMode} />;

  // Waiting room screen
  if (waiting)
    return (
      <WaitingRoom
        isCreator={isCreator}
        username={username}
        sessionId={sessionId}
        targetPlayers={targetPlayers}
        setTargetPlayers={setTargetPlayers}
        players={players}
        countdown={countdown}
        onReady={markReady}
      />
    );

  // Create / Join UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <h2 className="text-2xl mb-6">{mode === "create" ? "Create Game" : "Join Game"}</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="px-4 py-2 mb-4 rounded-lg text-black focus:outline-none w-64"
      />
      {mode === "join" && (
        <input
          type="text"
          placeholder="Enter session ID"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value.toUpperCase())}
          className="px-4 py-2 mb-4 rounded-lg text-black focus:outline-none w-64"
        />
      )}
      {mode === "create" && (
        <input
          type="number"
          min={2}
          max={10}
          value={targetPlayers}
          onChange={(e) => setTargetPlayers(Number(e.target.value))}
          className="px-4 py-2 mb-4 rounded-lg text-black focus:outline-none w-64"
        />
      )}
      <button
        onClick={mode === "create" ? handleCreateGame : handleJoinGame}
        disabled={waiting}
        className={`px-6 py-2 rounded-xl font-semibold ${
          mode === "create" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
        } ${waiting ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {mode === "create" ? "Create" : "Join"}
      </button>
    </div>
  );
}