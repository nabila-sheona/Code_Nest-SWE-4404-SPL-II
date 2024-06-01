import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const [ setNextLevelUnlocked] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);

  const { currentUser } = useSelector((state) => state.user);
  const courseName = "C Programming";
  const courseTopic = "whileloops";

  const fetchUserLevel = async () => {
    try {
      const url = `/api/course/user-level/${encodeURIComponent(courseName)}/${currentUser.username}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch user level");
      }
      const data = await response.json();
      setCurrentLevel(data);
    } catch (error) {
      console.error("Error fetching user level:", error);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.username && courseName) {
      fetchUserLevel();
    }
  }, [currentUser, courseName]);

  
  const [currentSet, setCurrentSet] = useState(
    JSON.parse(localStorage.getItem("currentSet")) || 1
  );
  const [timeLeft, setTimeLeft] = useState(
    JSON.parse(localStorage.getItem("timeLeft")) || 120
  ); // 2 minutes timer

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
        "What is the correct syntax of a while loop in C?\n\nOptions:\n1. while (condition) { // statements }\n2. while condition { // statements }\n3. while condition: // statements\n4. while (condition): // statements",
      options: [
        { id: 1, text: "while (condition) { // statements }" },
        { id: 2, text: "while condition { // statements }" },
        { id: 3, text: "while condition: // statements" },
        { id: 4, text: "while (condition): // statements" },
      ],
      correctOption: 1,
    },
    {
      id: 2,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 1;\n    while (count <= 5) {\n        printf("Count: %d\\n", count);\n        count++;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5" },
        { id: 2, text: "Count: 1\nCount: 2\nCount: 3\nCount: 4" },
        {
          id: 3,
          text: "Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5\nCount: 6",
        },
        { id: 4, text: "No output" },
      ],
      correctOption: 1,
    },
    {
      id: 3,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 1;\n    while (count < 3) {\n        printf("Count: %d\\n", count);\n        count++;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 1\nCount: 2" },
        { id: 2, text: "Count: 1\nCount: 2\nCount: 3" },
        { id: 3, text: "Count: 0\nCount: 1\nCount: 2" },
        { id: 4, text: "No output" },
      ],
      correctOption: 1,
    },
    {
      id: 4,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 5;\n    while (count > 0) {\n        printf("Count: %d\\n", count);\n        count--;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 5\nCount: 4\nCount: 3\nCount: 2\nCount: 1" },
        {
          id: 2,
          text: "Count: 5\nCount: 4\nCount: 3\nCount: 2\nCount: 1\nCount: 0",
        },
        { id: 3, text: "Count: 4\nCount: 3\nCount: 2\nCount: 1\nCount: 0" },
        { id: 4, text: "No output" },
      ],
      correctOption: 1,
    },
    {
      id: 5,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 1;\n    while (count < 1) {\n        printf("Count: %d\\n", count);\n        count++;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 1" },
        { id: 2, text: "Count: 1\nCount: 2" },
        { id: 3, text: "Count: 1\nCount: 2\nCount: 3" },
        { id: 4, text: "No output" },
      ],
      correctOption: 4,
    },
    {
      id: 6,
      question:
        'What is the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 5;\n    while (count <= 5 && count > 0) {\n        printf("Count: %d\\n", count);\n        count--;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 5\nCount: 4\nCount: 3\nCount: 2\nCount: 1" },
        {
          id: 2,
          text: "Count: 5\nCount: 4\nCount: 3\nCount: 2\nCount: 1\nCount: 0",
        },
        { id: 3, text: "Count: 4\nCount: 3\nCount: 2\nCount: 1\nCount: 0" },
        { id: 4, text: "No output" },
      ],
      correctOption: 1,
    },
    {
      id: 7,
      question:
        'What is the condition that causes the while loop to terminate in the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 1;\n    while (count <= 5) {\n        printf("Count: %d\\n", count);\n        count++;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "count == 5" },
        { id: 2, text: "count < 5" },
        { id: 3, text: "count > 5" },
        { id: 4, text: "count <= 5" },
      ],
      correctOption: 3,
    },
    {
      id: 8,
      question:
        "Which of the following is true about the while loop?\n\nOptions:\n1. The initialization must be done before the loop starts\n2. The condition is checked after each iteration\n3. The increment/decrement is done at the end of the loop body\n4. It is used when the number of iterations is known beforehand",
      options: [
        {
          id: 1,
          text: "The initialization must be done before the loop starts",
        },
        { id: 2, text: "The condition is checked after each iteration" },
        {
          id: 3,
          text: "The increment/decrement is done at the end of the loop body",
        },
        {
          id: 4,
          text: "It is used when the number of iterations is known beforehand",
        },
      ],
      correctOption: 1,
    },
    {
      id: 9,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 5;\n    while (count >= 1) {\n        printf("Count: %d\\n", count);\n        count--;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 5\nCount: 4\nCount: 3\nCount: 2\nCount: 1" },
        {
          id: 2,
          text: "Count: 5\nCount: 4\nCount: 3\nCount: 2\nCount: 1\nCount: 0",
        },
        { id: 3, text: "Count: 4\nCount: 3\nCount: 2\nCount: 1\nCount: 0" },
        { id: 4, text: "No output" },
      ],
      correctOption: 1,
    },
    {
      id: 10,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 3;\n    while (count > 0) {\n        printf("Count: %d\\n", count);\n        count--;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 3\nCount: 2\nCount: 1" },
        { id: 2, text: "Count: 3\nCount: 2\nCount: 1\nCount: 0" },
        { id: 3, text: "Count: 2\nCount: 1\nCount: 0" },
        { id: 4, text: "No output" },
      ],
      correctOption: 1,
    },
    {
      id: 11,
      question:
        'What is the correct syntax for a while loop that runs as long as variable "a" is less than 10?\n\nOptions:\n1. while (a < 10) { // statements }\n2. while a < 10 { // statements }\n3. while (a < 10): // statements\n4. while (a < 10); { // statements }',
      options: [
        { id: 1, text: "while (a < 10) { // statements }" },
        { id: 2, text: "while a < 10 { // statements }" },
        { id: 3, text: "while (a < 10): // statements" },
        { id: 4, text: "while (a < 10); { // statements }" },
      ],
      correctOption: 1,
    },
    {
      id: 12,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 1;\n    while (count < 1) {\n        printf("Count: %d\\n", count);\n        count++;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 1" },
        { id: 2, text: "Count: 1\nCount: 2" },
        { id: 3, text: "Count: 1\nCount: 2\nCount: 3" },
        { id: 4, text: "No output" },
      ],
      correctOption: 4,
    },
    {
      id: 13,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 2;\n    while (count <= 4) {\n        printf("Count: %d\\n", count);\n        count++;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 2\nCount: 3\nCount: 4" },
        { id: 2, text: "Count: 2\nCount: 3\nCount: 4\nCount: 5" },
        { id: 3, text: "Count: 1\nCount: 2\nCount: 3\nCount: 4" },
        { id: 4, text: "No output" },
      ],
      correctOption: 1,
    },
    {
      id: 14,
      question:
        'What is the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 5;\n    while (count > 5) {\n        printf("Count: %d\\n", count);\n        count--;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 5\nCount: 4\nCount: 3\nCount: 2\nCount: 1" },
        {
          id: 2,
          text: "Count: 5\nCount: 4\nCount: 3\nCount: 2\nCount: 1\nCount: 0",
        },
        { id: 3, text: "Count: 4\nCount: 3\nCount: 2\nCount: 1\nCount: 0" },
        { id: 4, text: "No output" },
      ],
      correctOption: 4,
    },
    {
      id: 15,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 1;\n    while (count <= 3) {\n        printf("Count: %d\\n", count);\n        count++;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 1\nCount: 2\nCount: 3" },
        { id: 2, text: "Count: 1\nCount: 2\nCount: 3\nCount: 4" },
        { id: 3, text: "Count: 0\nCount: 1\nCount: 2\nCount: 3" },
        { id: 4, text: "No output" },
      ],
      correctOption: 1,
    },
    {
      id: 16,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 4;\n    while (count > 0) {\n        printf("Count: %d\\n", count);\n        count--;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 4\nCount: 3\nCount: 2\nCount: 1" },
        { id: 2, text: "Count: 4\nCount: 3\nCount: 2\nCount: 1\nCount: 0" },
        { id: 3, text: "Count: 3\nCount: 2\nCount: 1\nCount: 0" },
        { id: 4, text: "No output" },
      ],
      correctOption: 1,
    },
    {
      id: 17,
      question:
        'What is the condition that causes the while loop to terminate in the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 3;\n    while (count > 0) {\n        printf("Count: %d\\n", count);\n        count--;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "count == 0" },
        { id: 2, text: "count < 0" },
        { id: 3, text: "count > 0" },
        { id: 4, text: "count <= 0" },
      ],
      correctOption: 4,
    },
    {
      id: 18,
      question:
        'What is the correct syntax for a while loop that runs as long as variable "a" is greater than 0?\n\nOptions:\n1. while (a > 0) { // statements }\n2. while a > 0 { // statements }\n3. while (a > 0): // statements\n4. while (a > 0); { // statements }',
      options: [
        { id: 1, text: "while (a > 0) { // statements }" },
        { id: 2, text: "while a > 0 { // statements }" },
        { id: 3, text: "while (a > 0): // statements" },
        { id: 4, text: "while (a > 0); { // statements }" },
      ],
      correctOption: 1,
    },
    {
      id: 19,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 2;\n    while (count <= 4) {\n        printf("Count: %d\\n", count);\n        count++;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 2\nCount: 3\nCount: 4" },
        { id: 2, text: "Count: 2\nCount: 3\nCount: 4\nCount: 5" },
        { id: 3, text: "Count: 1\nCount: 2\nCount: 3\nCount: 4" },
        { id: 4, text: "No output" },
      ],
      correctOption: 1,
    },
    {
      id: 20,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    int count = 1;\n    while (count <= 3) {\n        printf("Count: %d\\n", count);\n        count++;\n    }\n    return 0;\n}',
      options: [
        { id: 1, text: "Count: 1\nCount: 2\nCount: 3" },
        { id: 2, text: "Count: 1\nCount: 2\nCount: 3\nCount: 4" },
        { id: 3, text: "Count: 0\nCount: 1\nCount: 2\nCount: 3" },
        { id: 4, text: "No output" },
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
      
    }
  };

  const handleLevelUpdate = async () => {
    if (currentLevel < 8) {
      await unlockNextLevel();
    } else {
      navigateToNextPage();
    }
  };

  const unlockNextLevel = async () => {
    try {
      const response = await fetch(`/api/course/unlock-next-level`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseName,
          courseTopic,
          username: currentUser.username,
        }),
      });

      const data = await response.json();
      if (data.success) {
        window.location.href = "/functions";
        alert("You have successfully moved to next level of the course!");
      } else {
        console.error("Failed to unlock next level");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  const navigateToNextPage = () => {
    window.location.href = "/functions";
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
        Quiz on While Loops
      </h1>
      <div className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded-md border border-gray-300">
        <div className="text-red-500 text-lg font-semibold">
          Time left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}
        </div>
      </div>
      {!submitted && (
        <p className="font-semibold rounded-md keyword-box border border-gray-300 p-4 bg-gray-300 mx-9">
          There are 5 questions on WHILE LOOPS. You{" "}
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

          {score >= 4 && (
            <button onClick={handleLevelUpdate} className="btn bg-yellow-300 text-black px-4 py-2 rounded-md">
              Unlock Next Level
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
