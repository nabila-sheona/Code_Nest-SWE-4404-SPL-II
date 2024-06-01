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
  const [currentSet, setCurrentSet] = useState(
    JSON.parse(localStorage.getItem("currentSet")) || 1
  );
  const [timeLeft, setTimeLeft] = useState(
    JSON.parse(localStorage.getItem("timeLeft")) || 120
  ); // 2 minutes timer

  // Auto-refresh on page load only once
  useEffect(() => {
    if (!sessionStorage.getItem("hasRefreshed")) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit(true); // Auto-submit when timer reaches zero
          return 0;
        }
        localStorage.setItem("timeLeft", JSON.stringify(prevTime - 1));
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  const questions = [
    {
      id: 1,
      question:
        'What is the result of the following expression?\n\nint a = 10;\nint b = 20;\nint sum = a + b;\n\nprintf("%d", sum);',
      options: [
        { id: 1, text: "10" },
        { id: 2, text: "20" },
        { id: 3, text: "30" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 3,
    },
    {
      id: 2,
      question:
        'What will be the result of the following code?\n\nint x = 10;\nint y = 20;\nbool isEqual = (x == y);\n\nprintf("%d", isEqual);',
      options: [
        { id: 1, text: "1" },
        { id: 2, text: "0" },
        { id: 3, text: "true" },
        { id: 4, text: "false" },
      ],
      correctOption: 2,
    },
    {
      id: 3,
      question:
        'What will be the output of the following code?\n\nint a = 10;\na += 5;\n\nprintf("%d", a);',
      options: [
        { id: 1, text: "10" },
        { id: 2, text: "5" },
        { id: 3, text: "15" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 3,
    },
    {
      id: 4,
      question:
        "Which of the following operators is used to perform a bitwise AND operation?\n\nint a = 5;\nint b = 3;\nint result = a & b;",
      options: [
        { id: 1, text: "&" },
        { id: 2, text: "|" },
        { id: 3, text: "^" },
        { id: 4, text: "~" },
      ],
      correctOption: 1,
    },
    {
      id: 5,
      question:
        'What will be the result of the following code?\n\nint a = 5;\nint b = 3;\nint orResult = a | b;\n\nprintf("%d", orResult);',
      options: [
        { id: 1, text: "1" },
        { id: 2, text: "3" },
        { id: 3, text: "5" },
        { id: 4, text: "7" },
      ],
      correctOption: 4,
    },
    {
      id: 6,
      question:
        "Which of the following is a relational operator in C?\n\nint x = 10;\nint y = 20;\nbool result = (x < y);",
      options: [
        { id: 1, text: "+" },
        { id: 2, text: "==" },
        { id: 3, text: "<" },
        { id: 4, text: "&" },
      ],
      correctOption: 3,
    },
    {
      id: 7,
      question:
        'What is the result of the following logical operation?\n\nbool a = true;\nbool b = false;\nbool result = a && b;\n\nprintf("%d", result);',
      options: [
        { id: 1, text: "1" },
        { id: 2, text: "0" },
        { id: 3, text: "true" },
        { id: 4, text: "false" },
      ],
      correctOption: 2,
    },
    {
      id: 8,
      question:
        'What will be the result of the following code?\n\nint a = 5;\nint leftShift = a << 1;\n\nprintf("%d", leftShift);',
      options: [
        { id: 1, text: "10" },
        { id: 2, text: "5" },
        { id: 3, text: "2" },
        { id: 4, text: "20" },
      ],
      correctOption: 1,
    },
    {
      id: 9,
      question:
        "Which operator is used for bitwise NOT operation?\n\nint a = 5;\nint result = ~a;",
      options: [
        { id: 1, text: "&" },
        { id: 2, text: "|" },
        { id: 3, text: "^" },
        { id: 4, text: "~" },
      ],
      correctOption: 4,
    },
    {
      id: 10,
      question:
        'What will be the output of the following code?\n\nint a = 5;\na -= 3;\n\nprintf("%d", a);',
      options: [
        { id: 1, text: "8" },
        { id: 2, text: "2" },
        { id: 3, text: "5" },
        { id: 4, text: "3" },
      ],
      correctOption: 2,
    },
    {
      id: 11,
      question:
        'What is the result of the following arithmetic operation?\n\nint a = 20;\nint b = 3;\nint result = a % b;\n\nprintf("%d", result);',
      options: [
        { id: 1, text: "2" },
        { id: 2, text: "6" },
        { id: 3, text: "1" },
        { id: 4, text: "3" },
      ],
      correctOption: 1,
    },
    {
      id: 12,
      question:
        "Which of the following statements is true about the relational operator <= ?\n\nint x = 10;\nint y = 20;\nbool result = (x <= y);",
      options: [
        { id: 1, text: "It checks if x is less than y" },
        { id: 2, text: "It checks if x is greater than or equal to y" },
        { id: 3, text: "It checks if x is less than or equal to y" },
        { id: 4, text: "It checks if x is not equal to y" },
      ],
      correctOption: 3,
    },
    {
      id: 13,
      question:
        'What will be the output of the following code?\n\nint a = 5;\nint notResult = ~a;\n\nprintf("%d", notResult);',
      options: [
        { id: 1, text: "-6" },
        { id: 2, text: "6" },
        { id: 3, text: "-5" },
        { id: 4, text: "5" },
      ],
      correctOption: 1,
    },
    {
      id: 14,
      question:
        'What is the output of the following logical operation?\n\nbool a = true;\nbool notResult = !a;\n\nprintf("%d", notResult);',
      options: [
        { id: 1, text: "1" },
        { id: 2, text: "0" },
        { id: 3, text: "true" },
        { id: 4, text: "false" },
      ],
      correctOption: 2,
    },
    {
      id: 15,
      question:
        'What will be the result of the following code?\n\nint a = 5;\nint b = 3;\nint xorResult = a ^ b;\n\nprintf("%d", xorResult);',
      options: [
        { id: 1, text: "1" },
        { id: 2, text: "6" },
        { id: 3, text: "8" },
        { id: 4, text: "2" },
      ],
      correctOption: 2,
    },
    {
      id: 16,
      question:
        'What will be the result of the following code?\n\nint a = 10;\nint b = 20;\nint quotient = a / b;\n\nprintf("%d", quotient);',
      options: [
        { id: 1, text: "0" },
        { id: 2, text: "2" },
        { id: 3, text: "10" },
        { id: 4, text: "20" },
      ],
      correctOption: 1,
    },
    {
      id: 17,
      question:
        'What will be the result of the following code?\n\nint x = 10;\nint y = 20;\nbool isNotEqual = (x != y);\n\nprintf("%d", isNotEqual);',
      options: [
        { id: 1, text: "1" },
        { id: 2, text: "0" },
        { id: 3, text: "true" },
        { id: 4, text: "false" },
      ],
      correctOption: 1,
    },
    {
      id: 18,
      question:
        'What will be the output of the following code?\n\nint a = 10;\na -= 5;\n\nprintf("%d", a);',
      options: [
        { id: 1, text: "10" },
        { id: 2, text: "5" },
        { id: 3, text: "15" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 2,
    },
    {
      id: 19,
      question:
        'What will be the result of the following code?\n\nint a = 5;\nint rightShift = a >> 1;\n\nprintf("%d", rightShift);',
      options: [
        { id: 1, text: "10" },
        { id: 2, text: "5" },
        { id: 3, text: "2" },
        { id: 4, text: "20" },
      ],
      correctOption: 3,
    },
    {
      id: 20,
      question:
        'What will be the output of the following code?\n\nbool a = true;\nbool b = false;\nbool orResult = a || b;\n\nprintf("%d", orResult);',
      options: [
        { id: 1, text: "1" },
        { id: 2, text: "0" },
        { id: 3, text: "true" },
        { id: 4, text: "false" },
      ],
      correctOption: 1,
    },
  ];
  const questionSets = [
    questions.slice(0, 5),
    questions.slice(5, 10),
    questions.slice(10, 15),
    questions.slice(15, 20),
  ];

  const handleSubmit = async (autoSubmit = false) => {
    if (submitted) return;
    const currentQuestions = questionSets[currentSet - 1];
    if (!autoSubmit) {
      const unansweredQuestions = currentQuestions.filter(
        (q) => !selectedOptions[q.id]
      );
      if (unansweredQuestions.length > 0) {
        alert("Please answer all questions before submitting.");
        return;
      }
    }
    setShowFeedback(true);

    let totalScore = 0;

    currentQuestions.forEach((q) => {
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
      await updateUserLevel();
    }
  };

  const updateUserLevel = async () => {
    try {
      const response = await fetch("/api/update-level", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ increment: 1 }), // Sending the increment value, you might want to adjust this according to your backend logic
      });

      if (!response.ok) {
        throw new Error("Failed to update user level");
      }

      const data = await response.json();
      console.log("User level updated:", data);
    } catch (error) {
      console.error("Error updating user level:", error);
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
    const currentQuestions = questionSets[currentSet - 1];
    const unansweredQuestions = currentQuestions.filter(
      (q) => !selectedOptions[q.id]
    );
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
    localStorage.removeItem("timeLeft");

    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("submitted", JSON.stringify(submitted));
    localStorage.setItem("currentSet", JSON.stringify(currentSet));
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
  }, [selectedOptions, score, submitted, currentSet, timeLeft]);

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1 className="text-3xl font-bold mb-8 text-sky-800">
        Quiz on Variables
      </h1>
      <div className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded-md border border-gray-300">
        <div className="text-red-500 text-lg font-semibold">
          Time left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}
        </div>
      </div>
      {!submitted && (
        <p className="font-semibold rounded-md keyword-box border border-gray-300 p-4 bg-gray-300 mx-9">
          There are 5 questions on VARIABLES. You{" "}
          <span className="underline">
            must answer all the questions in a set before submitting.
          </span>
          Once you answer all the questions in a set, you can refresh the page
          to take the quiz again from the beginning.
          <span className="underline">
            You need 80% points to unlock the next topic.
          </span>
        </p>
      )}
      {!submitted ? (
        <div className="p-8 h-full ">
          <div className="h-full">
            {questionSets[currentSet - 1].map((q, index) => (
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
                onClick={() => handleSubmit(false)}
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
        </div>
      ) : (
        <div className="mt-4 w-full h-full overflow-y-auto">
          <h3 className="text-xl font-bold mb-2">
            Answer Sheet -{" "}
            <span className="text-green-500 font-semibold underline">
              Score: {score}/5
            </span>
          </h3>
          <div className="mb-4" style={{ margin: "20px" }}>
            {questionSets[currentSet - 1].map((q, index) => (
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
          </div>

          {score === 5 && (
            <Link
              to="/conditions"
              className="btn bg-yellow-300 text-black px-4 py-2 rounded-md"
            >
              Go to the Next Level
            </Link>
          )}
          {score >= 3 && nextLevelUnlocked && score < 5 && (
            <button>
              <Link
                to="/conditions"
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
              setCurrentSet((currentSet % 4) + 1); // Alternate between set 1 and set 4
              setTimeLeft(120); // Reset the timer
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
