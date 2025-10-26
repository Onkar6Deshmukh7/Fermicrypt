import User from "../models/User.js";

const sessions = {}; // { sessionId: [ { username, socketId, ready } ] }
const sins = ["greed", "lust", "gluttony", "envy", "wrath", "sloth", "pride"];

export default function(io) {
  io.on("connection", (socket) => {
    console.log("🔌 Client connected:", socket.id);

    socket.on("createGame", async ({ username, sessionId, targetPlayers }) => {
      if (!username || !sessionId) return socket.emit("error_message", { message: "Username and session ID required" });

      const newUser = await User.create({ username, sessionId });
      socket.join(sessionId);
      sessions[sessionId] = [{ username, socketId: socket.id, ready: false, targetPlayers }];
      io.to(sessionId).emit("updatePlayers", sessions[sessionId]);
    });

    socket.on("joinGame", async ({ username, sessionId }) => {
      if (!username || !sessionId) return socket.emit("error_message", { message: "Username and session ID required" });
      if (!sessions[sessionId]) return socket.emit("error_message", { message: "Session not found!" });

      const newUser = await User.create({ username, sessionId });
      socket.join(sessionId);
      sessions[sessionId].push({ username, socketId: socket.id, ready: false, targetPlayers: sessions[sessionId][0].targetPlayers });
      io.to(sessionId).emit("updatePlayers", sessions[sessionId]);
    });

    socket.on("playerReady", ({ sessionId, username }) => {
      if (!sessions[sessionId]) return;
      const player = sessions[sessionId].find(p => p.username === username);
      if (player) player.ready = true;

      io.to(sessionId).emit("updatePlayers", sessions[sessionId]);

      const readyPlayers = sessions[sessionId].filter(p => p.ready).length;
      const targetPlayers = sessions[sessionId][0].targetPlayers;

      if (readyPlayers === targetPlayers) {
        let countdown = 1;
        const interval = setInterval(() => {
          io.to(sessionId).emit("countdown", { seconds: countdown });
          countdown--;
          if (countdown < 0) {
            clearInterval(interval);

            // Assign random sin to each player
            const assignments = sessions[sessionId].map(p => ({
              username: p.username,
              startingSin: sins[Math.floor(Math.random() * sins.length)]
            }));

            io.to(sessionId).emit("gameStart", assignments);
          }
        }, 1000);
      }
    });

    socket.on("disconnect", () => {
      for (const [sessionId, players] of Object.entries(sessions)) {
        const updated = players.filter(p => p.socketId !== socket.id);
        if (updated.length === 0) delete sessions[sessionId];
        else sessions[sessionId] = updated;
        io.to(sessionId).emit("updatePlayers", updated);
      }
    });

    socket.on("unlockSin", async ({ username, sessionId, sin }) => {
      try {
        // Add the sin to the player's unlockedSins array, avoiding duplicates
        await User.updateOne(
          { username, sessionId },
          { $addToSet: { unlockedSins: sin } }
        );

        // Optional: confirm back to client
        socket.emit("sinUnlocked", { username, sin });

      } catch (err) {
        console.error("Error unlocking sin:", err);
      }
    });

  });
}
