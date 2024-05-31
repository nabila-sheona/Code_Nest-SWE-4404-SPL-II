import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Quiz() {
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
  const [nextLevelUnlocked, setNextLevelUnlocked] = useState(false);

  const questions = [
    {
      id: 1,
      question:
        "Which of the following is NOT a valid uppercase alphabet in the C language?",
      options: [
        { id: 1, text: "W" },
        { id: 2, text: "P" },
        { id: 3, text: "O" },
        { id: 4, text: "q" },
      ],
      correctOption: 4,
    },
    {
      id: 2,
      question:
        "Which of the following special characters is NOT allowed in C identifiers?",
      options: [
        { id: 1, text: "_" },
        { id: 2, text: "$" },
        { id: 3, text: "&" },
        { id: 4, text: "+" },
      ],
      correctOption: 4,
    },
    {
      id: 3,
      question:
        "Which character set does C accept for both variables and functions?",
      options: [
        { id: 1, text: "Uppercase letters only" },
        { id: 2, text: " Lowercase letters only" },
        { id: 3, text: "Both uppercase and lowercase letters" },
        { id: 4, text: " Special characters only" },
      ],
      correctOption: 3,
    },
    {
      id: 4,
      question: "What is the character set for digits in the C language?",
      options: [
        { id: 1, text: "0-8" },
        { id: 2, text: "1-9" },
        { id: 3, text: "0-9" },
        { id: 4, text: "1-8" },
      ],
      correctOption: 3,
    },
    {
      id: 5,
      question: "Which of the following is a C keyword?",
      options: [
        { id: 1, text: "Print" },
        { id: 2, text: "For" },
        { id: 3, text: "Var" },
        { id: 4, text: "Begin" },
      ],
      correctOption: 2,
    },
  ];

  const handleSubmit = () => {
    if (submitted) return;
    const unansweredQuestions = questions.filter((q) => !selectedOptions[q.id]);
    if (unansweredQuestions.length > 0) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setShowFeedback(true);

    let totalScore = 0;

    questions.forEach((q) => {
      if (selectedOptions[q.id] === q.correctOption) {
        totalScore += 1;
      }
    });

    setScore(totalScore);
    localStorage.setItem("score", JSON.stringify(totalScore));

    setSubmitted(true);
    localStorage.setItem("submitted", JSON.stringify(true));

    if (totalScore > 3) {
      setNextLevelUnlocked(true);
    }
  };

  const handleOptionSelect = (questionId, optionId) => {
    if (!submitted) {
      setSelectedOptions({
        ...selectedOptions,
        [questionId]: optionId,
      });
    }
  };

  const getOptionText = (question, optionId) => {
    const option = question.options.find((o) => o.id === optionId);
    return option ? option.text : "";
  };

  const handleRefresh = () => {
    const unansweredQuestions = questions.filter((q) => !selectedOptions[q.id]);
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
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold mb-8 text-sky-800">
        Quiz on Variables
      </h1>
      {!submitted && (
        <p className="font-semibold rounded-md keyword-box border border-gray-300 p-4 bg-gray-300 mx-9">
          There are 5 questions on VARIABLES.You{" "}
          <span className="underline">
            must answer all the questions before submitting
          </span>
          .Once you answer all the questions you can refresh the page to take
          the quiz again from the beginning.
          <span className="underline">
            You need 80% points for unlocking the next topic.
          </span>
        </p>
      )}
      {!submitted ? (
        <div className=" p-8 h-full overflow-y-auto style={{ maxHeight: 'calc(100vh - 150px)' }">
          {/* <h2 className="text-xl font-bold mb-4">Quiz</h2> */}
          {questions.map((q, index) => (
            <div key={q.id} className="mb-4">
              <p className="mb-2 font-semibold">{`${index + 1}. ${
                q.question
              }`}</p>
              <ul>
                {q.options.map((option) => (
                  <li key={option.id} className="mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={option.id}
                        onChange={() => handleOptionSelect(q.id, option.id)}
                        className="mr-2"
                        checked={selectedOptions[q.id] === option.id}
                      />
                      {option.text}
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
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">
            Answer Sheet -{" "}
            <span className="text-green-500 font-semibold underline">
              Score: {score}/5
            </span>
          </h3>
          {questions.map((q, index) => (
            <div key={q.id} className="mb-2">
              <p className="mb-1 text-blue-800 font-medium">
                Question: {`${index + 1}. ${q.question}`}
              </p>
              <p
                className={`mb-1 ${
                  selectedOptions[q.id] === q.correctOption
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Your Answer: {getOptionText(q, selectedOptions[q.id])}
              </p>
              <p>Correct Answer: {getOptionText(q, q.correctOption)}</p>
            </div>
          ))}
          {score === 5 && (
            <Link
              to="/array"
              className="btn bg-yellow-300 text-black px-4 py-2 rounded-md"
            >
              Go to the Next Level
            </Link>
          )}
          {score >= 3 && nextLevelUnlocked && score < 5 && (
            <button>
              <Link
                to="/array"
                className="btn bg-yellow-300 text-black px-4 py-2 rounded-md"
              >
                Go to the Next Level
              </Link>
            </button>
          )}
          <button
            onClick={() => {
              setSubmitted(false);
              setShowFeedback(false);
              setScore(0);
              setSelectedOptions({});
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Take Quiz Again
          </button>
        </div>
      )}
    </div>
  );
}
