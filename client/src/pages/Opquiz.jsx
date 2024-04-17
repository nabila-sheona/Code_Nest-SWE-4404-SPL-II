import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const OperatorsQuizzes = [
  {
    question: "What is the result of 5 + 3?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "8",
  },
  {
    question: "Which operator is used to compare two values?",
    options: ["==", "!=", "<", ">"],
    correctAnswer: "==",
  },
  {
    question: "What is the result of 10 / 3?",
    options: ["3.33", "3", "3.5", "4"],
    correctAnswer: "3",
  },
  {
    question: "What is the result of 8 % 3?",
    options: ["1", "2", "3", "0"],
    correctAnswer: "2",
  },
  {
    question: "What does the '!' operator do?",
    options: ["Negates the value", "Adds two values", "Multiplies two values", "Divides two values"],
    correctAnswer: "Negates the value",
  },
];

export default function OperatorsQuiz() {
  const [selectedOptions, setSelectedOptions] = useState(
    JSON.parse(localStorage.getItem("selectedOptions")) || {}
  );
  const [score, setScore] = useState(
    JSON.parse(localStorage.getItem("score")) || 0
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(
    JSON.parse(localStorage.getItem("submitted")) || false
  );

  const handleOptionSelect = (questionId, optionId) => {
    if (!submitted) {
      setSelectedOptions({
        ...selectedOptions,
        [questionId]: optionId,
      });
    }
  };

  const handleSubmit = () => {
    if (submitted) return;
    const unansweredQuestions = OperatorsQuizzes.filter((q) => !selectedOptions[q.question]);
    if (unansweredQuestions.length > 0) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setShowFeedback(true);

    let totalScore = 0;

    OperatorsQuizzes.forEach((q) => {
      if (selectedOptions[q.question] === q.correctAnswer) {
        totalScore += 1;
      }
    });

    setScore(totalScore);
    localStorage.setItem("score", JSON.stringify(totalScore));

    setSubmitted(true);
    localStorage.setItem("submitted", JSON.stringify(true));
  };

  const getOptionText = (question, optionId) => {
    const option = question.options.find((o) => o.id === optionId);
    return option ? option.text : "";
  };

  const handleRefresh = () => {
    const unansweredQuestions = OperatorsQuizzes.filter((q) => !selectedOptions[q.question]);
    if (unansweredQuestions.length > 0) {
      alert(
        "You can't refresh unless you answer all the questions!",
        "color: red; font-weight: bold;"
      );
      return;
    }
    localStorage.removeItem("selectedOptions");
    localStorage.removeItem("score");
    localStorage.removeItem("submitted");

    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("submitted", JSON.stringify(submitted));
  }, [selectedOptions, score, submitted]);

  return (
    <div className="flex justify-center h-screen items-center flex-col">
      <h1 className="text-3xl font-bold mb-8 text-sky-800">
        Quiz on Operators
      </h1>
      <div className=" p-8 h-full overflow-y-auto style={{ maxHeight: 'calc(100vh - 150px)' }">
        <h2 className="text-xl font-bold mb-4">Quiz</h2>
        {OperatorsQuizzes.map((q, index) => (
          <div key={index} className="mb-4">
            <p className="mb-2 font-semibold">{`${index + 1}. ${
              q.question
            }`}</p>
            <ul>
              {q.options.map((option, idx) => (
                <li key={idx} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleOptionSelect(q.question, option)}
                      className="mr-2"
                      checked={selectedOptions[q.question] === option}
                      disabled={submitted || selectedOptions[q.question]}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={submitted}
          >
            Submit
          </button>

          <button
            onClick={handleRefresh}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Refresh
          </button>
        </div>

        {showFeedback && (
          <div className="mt-4">
            <p className="text-green-500 text-2xl">Score: {score}/5</p>
          </div>
        )}

        {submitted && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Answer Sheet</h3>
            {OperatorsQuizzes.map((q, index) => (
              <div key={index} className="mb-2">
                <p className="mb-1 text-blue-800 font-medium">
                  Question: {`${index + 1}. ${q.question}`}
                </p>
                <p
                  className={`mb-1 ${
                    selectedOptions[q.question] === q.correctAnswer
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Your Answer: {getOptionText(q, selectedOptions[q.question])}
                </p>
                <p>Correct Answer: {getOptionText(q, q.correctAnswer)}</p>
              </div>
            ))}
          </div>
        )}
        {score === 5 && (
          <Link
            to="/next-quiz-page"
            className="btn bg-yellow-300 text-black px-4 py-2 rounded-md"
          >
            Go to the Next Level
          </Link>
        )}
      </div>
    </div>
  );
}
