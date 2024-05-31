import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Arrayquiz() {
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
  const [nextLevelUnlocked, setNextLevelUnlocked] = useState(false); // New state for tracking next level unlock

  const questions = [
    {
      id: 1,
      question:
        "Which of the following is a correct way to declare an array in C?",
      options: [
        { id: 1, text: "int arr[];" },
        { id: 2, text: "arr[] int;" },
        { id: 3, text: "array arr[];" },
        { id: 4, text: "int arr[10];" },
      ],
      correctOption: 4,
    },
    {
      id: 2,
      question: "How do you access the third element of an array named 'arr'?",
      options: [
        { id: 1, text: "arr(3);" },
        { id: 2, text: "arr[3];" },
        { id: 3, text: "arr{3};" },
        { id: 4, text: "arr.3;" },
      ],
      correctOption: 2,
    },
    {
      id: 3,
      question:
        "What is the maximum index of the first element in an array in C?",
      options: [
        { id: 1, text: "0" },
        { id: 2, text: "1" },
        { id: 3, text: "-1" },
        { id: 4, text: "None of the above" },
      ],
      correctOption: 1,
    },
    {
      id: 4,
      question:
        "Which of the following is the correct syntax to pass an array as a function argument?",
      options: [
        { id: 1, text: "void func(array a[])" },
        { id: 2, text: "void func(int a[10])" },
        { id: 3, text: "void func(int *a)" },
        { id: 4, text: "All of the above" },
      ],
      correctOption: 4,
    },
    {
      id: 5,
      question:
        "What does the 'sizeof' operator return when used with an array?",
      options: [
        { id: 1, text: "Size of the array in bytes" },
        { id: 2, text: "Number of elements in the array" },
        { id: 3, text: "Address of the first element" },
        { id: 4, text: "None of the above" },
      ],
      correctOption: 1,
    },
  ];

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

    // Check if score is more than 3 to unlock next level
    if (totalScore > 3) {
      setNextLevelUnlocked(true);
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
      <h1 className="text-3xl font-bold mb-8 text-sky-800">Quiz on Array</h1>
      {!submitted && (
        <p className="font-semibold rounded-md keyword-box border border-gray-300 p-4 bg-gray-300 mx-9">
          There are 5 questions on ARRAY.You{" "}
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
            Answer Sheet-{" "}
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
              to="/operators"
              className="btn bg-yellow-300 text-black px-4 py-2 rounded-md"
            >
              Go to the Next Level
            </Link>
          )}
          {score >= 3 && nextLevelUnlocked && score < 5 && (
            <button>
              <Link
                to="/operators"
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
