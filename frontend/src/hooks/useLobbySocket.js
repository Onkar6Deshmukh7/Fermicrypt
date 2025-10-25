import { useEffect, useState } from "react";

export default function useLobbySocket(socket, sessionId, username) {
  const [players, setPlayers] = useState([]);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("updatePlayers", (playerList) => {
      setPlayers(playerList);
    });

    socket.on("countdown", ({ seconds }) => {
      setCountdown(seconds);
    });

    socket.on("error_message", (err) => alert(err.message));

    return () => {
      socket.off("updatePlayers");
      socket.off("countdown");
      socket.off("error_message");
    };
  }, [socket]);

  const markReady = () => {
    if (socket && sessionId && username) {
      socket.emit("playerReady", { sessionId, username });
    }
  };

  return { players, countdown, markReady };
}
