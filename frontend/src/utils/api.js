// -----------------------------
// ✅ USER APIs
// -----------------------------
export const registerUser = async (username) => {
  try {
    const res = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    return await res.json();
  } catch (err) {
    console.error("❌ Registration error:", err);
    throw err;
  }
};

export const getUser = async (username) => {
  try {
    const res = await fetch(`http://localhost:5000/api/users/${username}`);
    return await res.json();
  } catch (err) {
    console.error("❌ Fetch user error:", err);
    throw err;
  }
};

// -----------------------------
// ✅ QUESTION APIs
// -----------------------------
export const fetchQuestionsByPhase = async (phaseId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/questions/${phaseId}`);
    return await res.json();
  } catch (err) {
    console.error("❌ Fetch questions error:", err);
    throw err;
  }
};

export const checkAnswer = async (username, phaseId, serialNo, answer) => {
  try {
    const res = await fetch("http://localhost:5000/api/questions/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, phaseId, serialNo, answer }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      console.error("❌ checkAnswer failed:", data);
      return { isCorrect: false };
    }
    
    console.log("✅ checkAnswer success:", data);
    return data;
  } catch (err) {
    console.error("❌ Error in checkAnswer:", err);
    return { isCorrect: false };
  }
};


// -----------------------------
// ✅ SCORE Update
// -----------------------------
import axios from "axios";

export const updateScore = async (username, updateData = {}) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/users/${username}`,
      updateData
    );

    console.log("✅ updateScore success:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ updateScore error:", err.response?.data || err.message);
    throw err;
  }
};
