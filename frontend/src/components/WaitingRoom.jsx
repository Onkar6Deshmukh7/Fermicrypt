export default function WaitingRoom({
  isCreator,
  username,
  sessionId,
  targetPlayers,
  setTargetPlayers,
  players,
  countdown,
  onReady
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <h2 className="text-2xl font-semibold mb-3">Waiting for players to join...</h2>
      <p className="text-blue-400 font-mono mb-6">Session ID: {sessionId}</p>

      {isCreator && (
        <div className="mb-6">
          <label className="mr-2">Wait for</label>
          <input
            type="number"
            min="2"
            max="10"
            value={targetPlayers}
            onChange={(e) => setTargetPlayers(Number(e.target.value))}
            className="text-black rounded px-2 w-16 text-center"
          />
          <span className="ml-2">players</span>
        </div>
      )}

      <h3 className="text-xl mb-2">👥 Current Players:</h3>
      {players.length === 0 ? (
        <p className="text-gray-400">Only you so far...</p>
      ) : (
        <ul className="space-y-1 mb-4">
          {players.map((p, i) => (
            <li key={i} className="text-lg text-blue-300">
              {p.username} {p.ready && "✅"}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onReady}
        className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-xl font-semibold"
      >
        Ready
      </button>

      {countdown !== null && (
        <div className="text-3xl font-bold text-yellow-400 animate-pulse">
          Game starting in... {countdown}
        </div>
      )}
    </div>
  );
}