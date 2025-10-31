export default function RulesModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div
        className="relative z-10 max-w-2xl mx-4 p-6 sm:p-8 rounded-2xl bg-black/80 text-white font-press
                   shadow-[0_0_40px_rgba(255,255,255,0.15)] border border-fuchsia-700/50
                   animate-fadeIn text-sm sm:text-base leading-relaxed"
      >
        <h2 className="text-2xl sm:text-3xl mb-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 tracking-wider text-center">
          ⚔️ GAME RULES ⚔️
        </h2>

        <div className="space-y-3 text-center">
          <p>
            Enter a <b>username</b> — that’s all you’ll need for login.
          </p>

          <p>
            The game has <b>3 phases</b>, each with <b>3 questions</b> of increasing difficulty.
            Solving one question of a phase unlocks the next.
          </p>

          <p>
            Questions may appear as <b>text, images, or encrypted clues</b> — using hints from
            <b>languages, codes, or cultural references</b>. Sometimes the question itself has the hint.
          </p>

          <p>
            Answers use <b>lowercase alphabets only</b> — no numbers or symbols.
            They can be <b>names, objects, or iconic phrases</b>, but always as a <b>single word</b>.
          </p>

          <p>
            Use <b>any source</b> for help — logic, google, gpt, collaboration, etc. 
            Stay alert for <b>hidden hints</b> throughout the game.
          </p>

          <p className="text-gray-400 text-sm italic">
            For best immersion, play in <b>fullscreen (F11)</b>.
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500
                       text-black font-semibold hover:scale-110 transition-all duration-300
                       shadow-[0_0_35px_rgba(255,255,255,0.3)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
