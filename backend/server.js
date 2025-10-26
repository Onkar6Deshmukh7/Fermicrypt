import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import gameSockets from "./sockets/gameSockets.js";

import questionRoutes from "./routes/questions.js"; // import the question routes
import userRoutes from "./routes/users.js"; 

dotenv.config();
const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: FRONTEND_URL, methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection failed:", err));

// Register the question routes under /api/questions
app.use("/api/questions", questionRoutes);

app.use("/api/users", userRoutes); // <- make sure the prefix matches

// HTTP server + Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: FRONTEND_URL, methods: ["GET", "POST"], credentials: true },
});

// Socket events
gameSockets(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));