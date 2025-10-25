export default function ModeSelection({ setMode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-10">Fermicrypt</h1>
      <div className="flex gap-6">
        <button
          onClick={() => setMode("create")}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
        >
          Create Game
        </button>
        <button
          onClick={() => setMode("join")}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-xl font-semibold"
        >
          Join Game
        </button>
      </div>
    </div>
  );
}
