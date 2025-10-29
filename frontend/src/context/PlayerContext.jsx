import { createContext, useContext, useState, useEffect } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(() => {
    // ✅ Load from localStorage if available
    const saved = localStorage.getItem("player");
    return saved ? JSON.parse(saved) : null;
  });

  // ✅ Auto-save player to localStorage whenever it changes
  useEffect(() => {
    if (player) {
      localStorage.setItem("player", JSON.stringify(player));
    } else {
      localStorage.removeItem("player");
    }
  }, [player]);

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
  