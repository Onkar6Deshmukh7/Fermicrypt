import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Lust() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-white">
      {/* Background gradient and vortex */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-pink-900 to-black">
        <motion.div
          className="absolute w-[150vw] h-[150vh] bg-[radial-gradient(circle_at_center,rgba(255,77,255,0.3)_0%,transparent_70%)]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-60"
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

      {/* Central glowing orb */}
      <motion.div
        className="relative z-10 w-44 h-44 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,77,255,0.9)_0%,rgba(255,50,200,0.2)_70%,transparent_100%)] shadow-[0_0_120px_#ff77ff]"
        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Title and description */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-20 text-center mt-10"
      >
        <h1 className="text-6xl md:text-8xl font-extrabold text-pink-500 drop-shadow-[0_0_40px_#ff77ff] mb-4">
          Lust
        </h1>
        <p className="text-lg md:text-2xl text-pink-200 max-w-lg mx-auto drop-shadow-md">
          Temptation, desire, and passion — enter the first domain of Fermicrypt.
        </p>
      </motion.div>

      {/* Navigation buttons */}
      <motion.div
        className="flex gap-4 justify-center z-20 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <button
          className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold shadow-lg transition"
          onClick={() => navigate("/gluttony")}
        >
          Next Sin →
        </button>
        <button
          className="px-6 py-3 bg-gray-800 hover:bg-gray-900 rounded-lg font-semibold shadow-lg transition"
          onClick={() => navigate("/")}
        >
          Back Home
        </button>
      </motion.div>
    </div>
  );
}
