const QuestionForm = ({
  answer,
  setAnswer,
  onSubmit,
  submitting,
  isCleared,
}) => (
  <form onSubmit={onSubmit} className="flex flex-col mt-4">
    <input
      type="text"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      placeholder="Enter your answer"
      className="w-full p-2 rounded-md text-black mb-3"
      disabled={submitting || isCleared}
    />

    <button
      type="submit"
      disabled={submitting || isCleared}
      className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
    >
      {submitting ? "Checking..." : "Submit"}
    </button>
  </form>
);

export default QuestionForm;
