import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <h1 className="text-5xl font-bold mb-12 tracking-wide">Fermicrypt</h1>

      <div className="flex gap-6">
        <button
          onClick={() => navigate("/start")}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-semibold transition-all"
        >
          Start Game
        </button>

      </div>
    </div>
  );
}
