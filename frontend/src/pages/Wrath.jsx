import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Wrath() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950 to-black">
        <motion.div
          className="absolute w-[150vw] h-[150vh] bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.3)_0%,transparent_70%)]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        />
      </div>

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-400 rounded-full opacity-60"
          initial={{
            x: Math.random() * window.innerWidth - window.innerWidth / 2,
            y: Math.random() * window.innerHeight - window.innerHeight / 2,
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 8 + Math.random() * 8,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="relative z-10 w-44 h-44 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.9)_0%,rgba(255,50,0,0.2)_70%,transparent_100%)] shadow-[0_0_120px_#ff0000]"
        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-20 text-center mt-10"
      >
        <h1 className="text-6xl md:text-8xl font-extrabold text-red-500 drop-shadow-[0_0_40px_#ff0000] mb-4">
          Wrath
        </h1>
        <p className="text-lg md:text-2xl text-red-200 max-w-lg mx-auto drop-shadow-md">
          Burning rage — unbridled fire consuming all reason, until nothing remains but ash.
        </p>
      </motion.div>

      <motion.div
        className="flex gap-4 justify-center z-20 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <button
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold shadow-lg transition"
          onClick={() => navigate("/sloth")}
        >
          Next Sin →
        </button>
        <button
          className="px-6 py-3 bg-gray-800 hover:bg-gray-900 rounded-lg font-semibold shadow-lg transition"
          onClick={() => navigate("/pride")}
        >
          Back
        </button>
      </motion.div>
    </div>
  );
}
