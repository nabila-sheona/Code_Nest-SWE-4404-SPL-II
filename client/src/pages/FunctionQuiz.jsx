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
  const [nextLevelUnlocked, setNextLevelUnlocked] = useState(false);
  const [currentSet, setCurrentSet] = useState(
    JSON.parse(localStorage.getItem("currentSet")) || 1
  );
  const [timeLeft, setTimeLeft] = useState(
    JSON.parse(localStorage.getItem("timeLeft")) || 120
  ); // 2 minutes timer
  const [currentLevel, setCurrentLevel] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const courseName = "C Programming";
  const courseTopic = "functions";

  const fetchUserLevel = async () => {
    try {
      const url = `/api/course/user-level/${encodeURIComponent(courseName)}/${
        currentUser.username
      }`;
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
        "Which of the following is NOT a valid return type for a function in C?",
      options: [
        { id: 1, text: "void" },
        { id: 2, text: "int" },
        { id: 3, text: "float" },
        { id: 4, text: "string" },
      ],
      correctOption: 4,
    },
    {
      id: 2,
      question: "Which keyword is used to return a value from a function in C?",
      options: [
        { id: 1, text: "return" },
        { id: 2, text: "yield" },
        { id: 3, text: "giveback" },
        { id: 4, text: "output" },
      ],
      correctOption: 1,
    },
    {
      id: 3,
      question:
        "Which of the following is the correct syntax for a function declaration in C?",
      options: [
        { id: 1, text: "functionName(returnType);" },
        { id: 2, text: "returnType functionName();" },
        { id: 3, text: "functionName returnType();" },
        { id: 4, text: "returnType functionName(params)" },
      ],
      correctOption: 2,
    },
    {
      id: 4,
      question:
        'What is the output of the following function call: printf("%d", sum(2, 3)); if the sum function is defined as int sum(int a, int b) { return a + b; }?',
      options: [
        { id: 1, text: "5" },
        { id: 2, text: "2" },
        { id: 3, text: "3" },
        { id: 4, text: "Error" },
      ],
      correctOption: 1,
    },
    {
      id: 5,
      question: "Which of the following is true about functions in C?",
      options: [
        { id: 1, text: "Functions cannot return arrays" },
        { id: 2, text: "Functions can return multiple values" },
        { id: 3, text: "Functions can have default parameters" },
        { id: 4, text: "Functions cannot be recursive" },
      ],
      correctOption: 1,
    },
    {
      id: 6,
      question:
        "Which of the following is the correct way to define a function in C that takes two integer parameters and returns an integer?",
      options: [
        { id: 1, text: "int function(int a, int b) { return a + b; }" },
        { id: 2, text: "int function(a, b) { return a + b; }" },
        { id: 3, text: "function(int a, int b) { return a + b; }" },
        { id: 4, text: "function(int a, int b) -> int { return a + b; }" },
      ],
      correctOption: 1,
    },
    {
      id: 7,
      question:
        "What is the default return type of a function if not specified in C?",
      options: [
        { id: 1, text: "void" },
        { id: 2, text: "int" },
        { id: 3, text: "float" },
        { id: 4, text: "char" },
      ],
      correctOption: 2,
    },
    {
      id: 8,
      question: "What does the term 'function prototype' mean in C?",
      options: [
        { id: 1, text: "A function that is used to create objects" },
        { id: 2, text: "A function that returns a pointer" },
        {
          id: 3,
          text: "A declaration of a function that specifies the function's name, return type, and parameters",
        },
        { id: 4, text: "A function that is used only once" },
      ],
      correctOption: 3,
    },
    {
      id: 9,
      question: "Which of the following is a correct function prototype in C?",
      options: [
        { id: 1, text: "void function(int a);" },
        { id: 2, text: "function void(int a);" },
        { id: 3, text: "void function(a int);" },
        { id: 4, text: "int function void(int a);" },
      ],
      correctOption: 1,
    },
    {
      id: 10,
      question: "Which of the following is NOT a valid function name in C?",
      options: [
        { id: 1, text: "main" },
        { id: 2, text: "func_1" },
        { id: 3, text: "1func" },
        { id: 4, text: "_func" },
      ],
      correctOption: 3,
    },
    {
      id: 11,
      question:
        'What will be the output of the following code: void func() { static int x = 0; x++; printf("%d", x); } int main() { func(); func(); }',
      options: [
        { id: 1, text: "1 1" },
        { id: 2, text: "1 2" },
        { id: 3, text: "2 2" },
        { id: 4, text: "0 1" },
      ],
      correctOption: 2,
    },
    {
      id: 12,
      question:
        "Which of the following is a correct statement about function overloading in C?",
      options: [
        { id: 1, text: "C supports function overloading" },
        { id: 2, text: "C does not support function overloading" },
        {
          id: 3,
          text: "Function overloading is the same as function overriding",
        },
        { id: 4, text: "Function overloading is supported in C++ only" },
      ],
      correctOption: 2,
    },
    {
      id: 13,
      question: "What is the purpose of the return statement in a function?",
      options: [
        { id: 1, text: "To return a value to the calling function" },
        { id: 2, text: "To end the function execution" },
        { id: 3, text: "To pass control back to the calling function" },
        { id: 4, text: "All of the above" },
      ],
      correctOption: 4,
    },
    {
      id: 14,
      question:
        "What will happen if a function with a void return type has a return statement with a value?",
      options: [
        { id: 1, text: "Compilation error" },
        { id: 2, text: "Runtime error" },
        { id: 3, text: "No error" },
        { id: 4, text: "Undefined behavior" },
      ],
      correctOption: 1,
    },
    {
      id: 15,
      question:
        "What is the scope of a variable declared inside a function in C?",
      options: [
        { id: 1, text: "Global scope" },
        { id: 2, text: "Local scope" },
        { id: 3, text: "Block scope" },
        { id: 4, text: "File scope" },
      ],
      correctOption: 2,
    },
    {
      id: 16,
      question: "Which of the following is true about inline functions in C?",
      options: [
        { id: 1, text: "They are defined using the keyword inline" },
        { id: 2, text: "They are faster than normal functions" },
        { id: 3, text: "They reduce the overhead of function calls" },
        { id: 4, text: "All of the above" },
      ],
      correctOption: 4,
    },
    {
      id: 17,
      question:
        'What will be the output of the following code: int func(int a) { if(a <= 1) return 1; return a * func(a - 1); } int main() { printf("%d", func(3)); }',
      options: [
        { id: 1, text: "1" },
        { id: 2, text: "3" },
        { id: 3, text: "6" },
        { id: 4, text: "Error" },
      ],
      correctOption: 3,
    },
    {
      id: 18,
      question:
        'What is the output of the following code: int sum(int a, int b) { return a + b; } int main() { int result = sum(5, 3); printf("%d", result); }',
      options: [
        { id: 1, text: "8" },
        { id: 2, text: "5" },
        { id: 3, text: "3" },
        { id: 4, text: "Error" },
      ],
      correctOption: 1,
    },
    {
      id: 19,
      question:
        'What will be the output of the following code: void func() { printf("Hello, World!"); } int main() { func(); }',
      options: [
        { id: 1, text: "Hello, World!" },
        { id: 2, text: "Hello" },
        { id: 3, text: "World" },
        { id: 4, text: "Error" },
      ],
      correctOption: 1,
    },
    {
      id: 20,
      question: "Which of the following is not a valid function declaration?",
      options: [
        { id: 1, text: "void func();" },
        { id: 2, text: "int func();" },
        { id: 3, text: "float func();" },
        { id: 4, text: "void func(int);" },
      ],
      correctOption: 4,
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

  const handleLevelUpdate = async () => {
    if (currentLevel < 9) {
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
        //window.location.href = "/theend";
        alert("You have successfully completed the course!");
      } else {
        console.error("Failed to unlock next level");
      }
    } catch (error) {
      console.error("Error:", error);
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
  const navigateToNextPage = () => {
    //window.location.href = "/theend";

    alert("You have successfully moved to next level of the course!");
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
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-white-500 min-h-screen ">
      <h1 className="text-3xl font-bold mb-8 text-sky-800">
        Quiz on Functions
      </h1>
      <div className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded-md border border-gray-300">
        <div className="text-red-500 text-lg font-semibold">
          Time left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}
        </div>
      </div>
      {!submitted && (
        <p className="font-semibold rounded-md keyword-box border border-gray-300 p-4 bg-gray-300 mx-9">
          There are 5 questions on Functions. You{" "}
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
            <button
              onClick={handleLevelUpdate}
              className="btn bg-yellow-300 text-black px-4 py-2 rounded-md"
            >
              Course Complete
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
