import { motion } from "framer-motion";

export default function Stats({ playerName, score, credits, unlockedSins }) {
  if (!playerName) return null; // Avoid rendering before data is available

  return (
    <motion.div
      className="w-full px-6 py-3 bg-transparent backdrop-blur-sm text-white flex justify-between items-center border-b border-white/10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Player Name */}
      <div className="flex flex-col items-start">
        <p className="text-sm opacity-70">Player</p>
        <motion.h2
          key={playerName}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-lg font-semibold tracking-wide"
        >
          {playerName}
        </motion.h2>
      </div>

      {/* Score */}
      <div className="flex flex-col items-center">
        <p className="text-sm opacity-70">Score</p>
        <motion.span
          key={score}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-lg font-bold"
        >
          {score ?? 0}
        </motion.span>
      </div>

      {/* Credits */}
      <div className="flex flex-col items-center">
        <p className="text-sm opacity-70">Credits</p>
        <motion.span
          key={credits}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-lg font-bold"
        >
          {credits ?? 0}
        </motion.span>
      </div>

      {/* Unlocked Sins */}
      <div className="flex flex-col items-end">
        <p className="text-sm opacity-70">Unlocked Sins</p>
        <div className="flex gap-2 mt-1 flex-wrap justify-end">
          {unlockedSins && unlockedSins.length > 0 ? (
            unlockedSins.map((sin) => (
              <motion.span
                key={sin}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="px-2 py-1 text-xs rounded-full bg-white/10 border border-white/20"
              >
                {sin}
              </motion.span>
            ))
          ) : (
            <span className="text-xs opacity-60">None</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}