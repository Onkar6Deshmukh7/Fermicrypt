const QuestionCard = ({ question, currentIndex, total, message }) => {
  if (!question) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-4">{question.content?.text}</h2>

      {question.content?.image && (
        <img
          src={question.content.image}
          alt="Question"
          className="rounded-lg mb-4 w-full object-cover"
        />
      )}

      {question.content?.link && (
        <a
          href={question.content.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline mb-4 block"
        >
          Reference Link
        </a>
      )}

      <p className="text-gray-400 italic mb-4">
        Difficulty: {question.difficulty}
      </p>

      <p className="text-sm text-gray-300 mb-2">
        Question {currentIndex + 1} of {total}
      </p>

      {message && <p className="mt-3 text-lg">{message}</p>}
    </div>
  );
};

export default QuestionCard;
