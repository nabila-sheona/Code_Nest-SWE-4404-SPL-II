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
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes timer

  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit(true); // Auto-submit when timer reaches zero
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!submitted) {
        const confirmationMessage =
          "You can't refresh the page before finishing the quiz!";
        e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
        return confirmationMessage; // Gecko, WebKit, Chrome <34
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.removeItem("timeLeft"); // Clear the timer when the component unmounts
    };
  }, [submitted]);

  const questions = [
    {
      id: 1,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    for (int i = 0; i < 5; i++) {\n        printf("Value of i: %d\\n", i);\n    }\n    return 0;\n}',
      options: [
        {
          id: 1,
          text: "Value of i: 0\nValue of i: 1\nValue of i: 2\nValue of i: 3\nValue of i: 4",
        },
        {
          id: 2,
          text: "Value of i: 1\nValue of i: 2\nValue of i: 3\nValue of i: 4\nValue of i: 5",
        },
        {
          id: 3,
          text: "Value of i: 5\nValue of i: 4\nValue of i: 3\nValue of i: 2\nValue of i: 1",
        },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 1,
    },
    {
      id: 2,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        for (int j = 1; j <= 3; j++) {\n            printf("(%d, %d)\\n", i, j);\n        }\n    }\n    return 0;\n}',
      options: [
        {
          id: 1,
          text: "(1, 1)\n(1, 2)\n(1, 3)\n(2, 1)\n(2, 2)\n(2, 3)\n(3, 1)\n(3, 2)\n(3, 3)",
        },
        {
          id: 2,
          text: "(1, 1)\n(2, 1)\n(3, 1)\n(1, 2)\n(2, 2)\n(3, 2)\n(1, 3)\n(2, 3)\n(3, 3)",
        },
        {
          id: 3,
          text: "(3, 3)\n(2, 2)\n(1, 1)\n(3, 2)\n(2, 1)\n(1, 3)\n(2, 3)\n(3, 1)\n(1, 2)",
        },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 1,
    },
    {
      id: 3,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    for (int i = 0; i < 5; i+=2) {\n        printf("Value of i: %d\\n", i);\n    }\n    return 0;\n}',
      options: [
        {
          id: 1,
          text: "Value of i: 0\nValue of i: 1\nValue of i: 2\nValue of i: 3\nValue of i: 4",
        },
        { id: 2, text: "Value of i: 0\nValue of i: 2\nValue of i: 4" },
        { id: 3, text: "Value of i: 0\nValue of i: 3" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 2,
    },
    {
      id: 4,
      question:
        'What is the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    for (int i = 5; i > 0; i--) {\n        printf("Value of i: %d\\n", i);\n    }\n    return 0;\n}',
      options: [
        {
          id: 1,
          text: "Value of i: 5\nValue of i: 4\nValue of i: 3\nValue of i: 2\nValue of i: 1",
        },
        {
          id: 2,
          text: "Value of i: 1\nValue of i: 2\nValue of i: 3\nValue of i: 4\nValue of i: 5",
        },
        {
          id: 3,
          text: "Value of i: 5\nValue of i: 4\nValue of i: 3\nValue of i: 2",
        },
        {
          id: 4,
          text: "Value of i: 4\nValue of i: 3\nValue of i: 2\nValue of i: 1",
        },
      ],
      correctOption: 1,
    },
    {
      id: 5,
      question:
        "What is the correct syntax for a for loop in C?\n\nOptions:\n1. for (initialization; condition; increment/decrement) {}\n2. for (initialization; condition) {}\n3. for (condition; initialization; increment/decrement) {}\n4. for (initialization; increment/decrement; condition) {}",
      options: [
        {
          id: 1,
          text: "for (initialization; condition; increment/decrement) {}",
        },
        { id: 2, text: "for (initialization; condition) {}" },
        {
          id: 3,
          text: "for (condition; initialization; increment/decrement) {}",
        },
        {
          id: 4,
          text: "for (initialization; increment/decrement; condition) {}",
        },
      ],
      correctOption: 1,
    },
    {
      id: 6,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int i;\n    for (i = 0; i < 3; i++) {\n        printf("Value of i inside loop: %d\\n", i);\n    }\n    printf("Value of i outside loop: %d\\n", i);\n    return 0;\n}',
      options: [
        {
          id: 1,
          text: "Value of i inside loop: 0\nValue of i inside loop: 1\nValue of i inside loop: 2\nValue of i outside loop: 3",
        },
        {
          id: 2,
          text: "Value of i inside loop: 0\nValue of i inside loop: 1\nValue of i inside loop: 2\nValue of i outside loop: 2",
        },
        {
          id: 3,
          text: "Value of i inside loop: 1\nValue of i inside loop: 2\nValue of i inside loop: 3\nValue of i outside loop: 4",
        },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 1,
    },
    {
      id: 7,
      question:
        "Which of the following is not a valid for loop in C?\n\nOptions:\n1. for (int i = 0; i < 10; i++) {}\n2. for (i = 0; i < 10; i++) {}\n3. for (int i = 0; i < 10; i+=2) {}\n4. for (int i = 0; i++) {}",
      options: [
        { id: 1, text: "for (int i = 0; i < 10; i++) {}" },
        { id: 2, text: "for (i = 0; i < 10; i++) {}" },
        { id: 3, text: "for (int i = 0; i < 10; i+=2) {}" },
        { id: 4, text: "for (int i = 0; i++) {}" },
      ],
      correctOption: 4,
    },
    {
      id: 8,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    for (int i = 0; i < 10; i++) {\n        if (i == 5) break;\n        printf("Value of i: %d\\n", i);\n    }\n    return 0;\n}',
      options: [
        {
          id: 1,
          text: "Value of i: 0\nValue of i: 1\nValue of i: 2\nValue of i: 3\nValue of i: 4",
        },
        {
          id: 2,
          text: "Value of i: 0\nValue of i: 1\nValue of i: 2\nValue of i: 3\nValue of i: 4\nValue of i: 5",
        },
        {
          id: 3,
          text: "Value of i: 0\nValue of i: 1\nValue of i: 2\nValue of i: 3\nValue of i: 4\nValue of i: 6\nValue of i: 7\nValue of i: 8\nValue of i: 9",
        },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 1,
    },
    {
      id: 9,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    for (int i = 0; i < 10; i++) {\n        if (i % 2 == 0) continue;\n        printf("Value of i: %d\\n", i);\n    }\n    return 0;\n}',
      options: [
        {
          id: 1,
          text: "Value of i: 0\nValue of i: 2\nValue of i: 4\nValue of i: 6\nValue of i: 8",
        },
        {
          id: 2,
          text: "Value of i: 1\nValue of i: 3\nValue of i: 5\nValue of i: 7\nValue of i: 9",
        },
        {
          id: 3,
          text: "Value of i: 0\nValue of i: 1\nValue of i: 2\nValue of i: 3\nValue of i: 4\nValue of i: 5\nValue of i: 6\nValue of i: 7\nValue of i: 8\nValue of i: 9",
        },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 2,
    },
    {
      id: 10,
      question:
        "Which of the following is true about the for loop?\n\nOptions:\n1. The initialization, condition, and increment/decrement are all optional\n2. The initialization must always be present\n3. The condition must always be present\n4. The increment/decrement must always be present",
      options: [
        {
          id: 1,
          text: "The initialization, condition, and increment/decrement are all optional",
        },
        { id: 2, text: "The initialization must always be present" },
        { id: 3, text: "The condition must always be present" },
        { id: 4, text: "The increment/decrement must always be present" },
      ],
      correctOption: 1,
    },
    {
      id: 11,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    for (int i = 0, j = 0; i < 5 && j < 3; i++, j++) {\n        printf("i: %d, j: %d\\n", i, j);\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "i: 0, j: 0\ni: 1, j: 1\ni: 2, j: 2" },
        {
          id: 2,
          text: "i: 0, j: 0\ni: 1, j: 1\ni: 2, j: 2\ni: 3, j: 3\ni: 4, j: 4",
        },
        { id: 3, text: "i: 0, j: 0\ni: 1, j: 1" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 1,
    },
    {
      id: 12,
      question:
        "What is the difference between a for loop and a while loop in C?\n\nOptions:\n1. A for loop is used for a known number of iterations, while a while loop is used for an unknown number of iterations\n2. A while loop is used for a known number of iterations, while a for loop is used for an unknown number of iterations\n3. There is no difference\n4. A for loop is used for infinite loops, while a while loop is used for finite loops",
      options: [
        {
          id: 1,
          text: "A for loop is used for a known number of iterations, while a while loop is used for an unknown number of iterations",
        },
        {
          id: 2,
          text: "A while loop is used for a known number of iterations, while a for loop is used for an unknown number of iterations",
        },
        { id: 3, text: "There is no difference" },
        {
          id: 4,
          text: "A for loop is used for infinite loops, while a while loop is used for finite loops",
        },
      ],
      correctOption: 1,
    },
    {
      id: 13,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    for (int i = 0; i < 5; i++) {\n        printf("Value of i: %d\\n", i);\n        i++;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Value of i: 0\nValue of i: 2\nValue of i: 4" },
        {
          id: 2,
          text: "Value of i: 0\nValue of i: 1\nValue of i: 2\nValue of i: 3\nValue of i: 4",
        },
        { id: 3, text: "Value of i: 0\nValue of i: 3" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 1,
    },
    {
      id: 14,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    for (int i = 0; i < 5; i-- ) {\n        printf("Value of i: %d\\n", i);\n    }\n    return 0;\n}',
      options: [
        {
          id: 1,
          text: "Value of i: 0\nValue of i: -1\nValue of i: -2\nValue of i: -3\nValue of i: -4",
        },
        {
          id: 2,
          text: "Value of i: 0\nValue of i: 1\nValue of i: 2\nValue of i: 3\nValue of i: 4",
        },
        { id: 3, text: "Infinite loop" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 3,
    },
    {
      id: 15,
      question:
        "Which of the following can be used to terminate a for loop in C?\n\nOptions:\n1. break\n2. continue\n3. goto\n4. All of the above",
      options: [
        { id: 1, text: "break" },
        { id: 2, text: "continue" },
        { id: 3, text: "goto" },
        { id: 4, text: "All of the above" },
      ],
      correctOption: 4,
    },
    {
      id: 16,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        for (int j = 1; j <= 3; j++) {\n            if (i == j) break;\n            printf("(%d, %d)\\n", i, j);\n        }\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "(1, 1)\n(2, 2)\n(3, 3)" },
        {
          id: 2,
          text: "(1, 1)\n(1, 2)\n(1, 3)\n(2, 1)\n(2, 2)\n(2, 3)\n(3, 1)\n(3, 2)\n(3, 3)",
        },
        { id: 3, text: "(1, 1)\n(1, 2)\n(2, 1)\n(2, 2)\n(3, 1)\n(3, 2)" },
        { id: 4, text: "(1, 2)\n(1, 3)\n(2, 1)\n(3, 1)\n(3, 2)" },
      ],
      correctOption: 4,
    },
    {
      id: 17,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    for (int i = 0; i < 5; i++) {\n        printf("arr[%d] = %d\\n", i, arr[i]);\n    }\n    return 0;\n}',
      options: [
        {
          id: 1,
          text: "arr[0] = 1\narr[1] = 2\narr[2] = 3\narr[3] = 4\narr[4] = 5",
        },
        {
          id: 2,
          text: "arr[0] = 0\narr[1] = 1\narr[2] = 2\narr[3] = 3\narr[4] = 4",
        },
        {
          id: 3,
          text: "arr[0] = 5\narr[1] = 4\narr[2] = 3\narr[3] = 2\narr[4] = 1",
        },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 1,
    },
    {
      id: 18,
      question:
        "Which of the following is true about the increment/decrement expression in a for loop?\n\nOptions:\n1. It is executed after the condition is checked\n2. It is executed before the condition is checked\n3. It is executed only once\n4. It is optional and can be omitted",
      options: [
        { id: 1, text: "It is executed after the condition is checked" },
        { id: 2, text: "It is executed before the condition is checked" },
        { id: 3, text: "It is executed only once" },
        { id: 4, text: "It is optional and can be omitted" },
      ],
      correctOption: 1,
    },
    {
      id: 19,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int sum = 0;\n    for (int i = 1; i <= 5; i++) {\n        sum += i;\n    }\n    printf("Sum = %d\\n", sum);\n    return 0;\n}',
      options: [
        { id: 1, text: "Sum = 5" },
        { id: 2, text: "Sum = 10" },
        { id: 3, text: "Sum = 15" },
        { id: 4, text: "Sum = 20" },
      ],
      correctOption: 3,
    },
    {
      id: 20,
      question:
        "Which of the following is not a valid use of the for loop?\n\nOptions:\n1. To iterate over an array\n2. To execute a block of code a specific number of times\n3. To check a condition at the end of each iteration\n4. To initialize variables before the loop starts",
      options: [
        { id: 1, text: "To iterate over an array" },
        {
          id: 2,
          text: "To execute a block of code a specific number of times",
        },
        { id: 3, text: "To check a condition at the end of each iteration" },
        { id: 4, text: "To initialize variables before the loop starts" },
      ],
      correctOption: 3,
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
        Quiz on For Loops
      </h1>
      <div className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded-md border border-gray-300">
        <div className="text-red-500 text-lg font-semibold">
          Time left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}
        </div>
      </div>
      {!submitted && (
        <p className="font-semibold rounded-md keyword-box border border-gray-300 p-4 bg-gray-300 mx-9">
          There are 20 questions on FOR LOOPS divided into 4 sets of 5 questions
          each. You{" "}
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
              to="/while-loops"
              className="btn bg-yellow-300 text-black px-4 py-2 rounded-md"
            >
              Go to the Next Level
            </Link>
          )}
          {score >= 3 && nextLevelUnlocked && score < 5 && (
            <button>
              <Link
                to="/while-loops"
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
