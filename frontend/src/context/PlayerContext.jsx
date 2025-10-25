import { createContext, useContext, useState } from "react";

const PlayerContext = createContext(null);
export const usePlayer = () => useContext(PlayerContext);

export function PlayerProvider({ children }) {
  const [playerData, setPlayerData] = useState({
    username: "",
    score: 0,
    credits: 0,
    unlockedSins: [],
  });

  return (
    <PlayerContext.Provider value={{ playerData, setPlayerData }}>
      {children}
    </PlayerContext.Provider>
  );
}