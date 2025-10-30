export default function RulesModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-10 max-w-3xl mx-4 p-8 rounded-2xl bg-black/80 text-white font-press
                      shadow-[0_0_40px_rgba(255,255,255,0.15)] border border-fuchsia-700/50
                      animate-fadeIn">
        <h2 className="text-3xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 tracking-wider text-center">
          ⚔️ GAME RULES ⚔️
        </h2>

        <div className="space-y-4 text-lg leading-relaxed text-center">
          <p>
            Once you enter a <b>username</b>, remember it — that is all you’ll need for your next login.
          </p>
          <p>
            The game has <b>3 phases</b> with <b>3 questions each</b> of varying difficulty.
          </p>
          <p>
            Answering the <b>first question</b> unlocks the <b>second phase</b>, and so on.
          </p>
          <p>
            Questions may include <b>text, images, links</b>, or a combination — but every answer is a <b>single alphanumeric word</b>, concatenated if it has multiple words.
          </p>
          <p>
            You may use <b>ANY source</b> for help. Some clues reference external knowledge — observe carefully.
          </p>
          <p>
            Keep your eyes peeled for hidden hints.  
            For best immersion, use <b>fullscreen mode (F11)</b>.
          </p>
        </div>

        <div className="flex justify-center mt-10">
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
