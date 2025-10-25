import { motion } from "framer-motion";

export default function SpaceWarp({ show }) {
  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Star streaks */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[100vh] bg-white/70"
          style={{
            left: `${Math.random() * 100}vw`,
            top: "-100vh",
          }}
          animate={{ y: "200vh", opacity: [1, 0] }}
          transition={{ duration: 0.8 + Math.random(), repeat: 0, ease: "linear" }}
        />
      ))}
    </motion.div>
  );
}
