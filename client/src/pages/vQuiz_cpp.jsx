import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Quiz() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [nextLevelUnlocked, setNextLevelUnlocked] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes timer
  const [timeExpired, setTimeExpired] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const courseName = "Cpp";
  const courseTopic = "variablescpp";

  const [currentLevel, setCurrentLevel] = useState(0);

 
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
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleTimeExpired(); // Handle timer expiration
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  useEffect(() => {
    if (!initialized) {
      resetQuiz();
      setInitialized(true);
    }
  }, [initialized]);
  const questions = [
    {
      id: 1,
      question:
        "Which of the following is NOT a valid uppercase alphabet in the C++ language?",
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
        "Which of the following special characters is NOT allowed in C++ identifiers?",
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
        "Which character set does C++ accept for both variables and functions?",
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
      question: "What is the character set for digits in the C++ language?",
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
      question: "Which of the following is a C++ keyword?",
      options: [
        { id: 1, text: "Print" },
        { id: 2, text: "For" },
        { id: 3, text: "Var" },
        { id: 4, text: "Begin" },
      ],
      correctOption: 2,
    },
    {
      id: 6,
      question: "Which of the following is NOT a valid variable name in C++?",
      options: [
        { id: 1, text: "variable1" },
        { id: 2, text: "1variable" },
        { id: 3, text: "_variable" },
        { id: 4, text: "variable_" },
      ],
      correctOption: 2,
    },
    {
      id: 7,
      question: "Which of the following is used to define a constant in C++?",
      options: [
        { id: 1, text: "#define" },
        { id: 2, text: "constant" },
        { id: 3, text: "final" },
        { id: 4, text: "const" },
      ],
      correctOption: 1,
    },
    {
      id: 8,
      question:
        "Which of the following is not a storage class specifier in C++?",
      options: [
        { id: 1, text: "auto" },
        { id: 2, text: "register" },
        { id: 3, text: "static" },
        { id: 4, text: "public" },
      ],
      correctOption: 4,
    },
    {
      id: 9,
      question: "Which of the following is a loop control statement in C++?",
      options: [
        { id: 1, text: "if" },
        { id: 2, text: "while" },
        { id: 3, text: "switch" },
        { id: 4, text: "goto" },
      ],
      correctOption: 2,
    },
    {
      id: 10,
      question: "Which of the following is used for comments in C++?",
      options: [
        { id: 1, text: "// Comment" },
        { id: 2, text: "/* Comment */" },
        { id: 3, text: "Both 1 and 2" },
        { id: 4, text: "# Comment" },
      ],
      correctOption: 3,
    },
    {
      id: 11,
      question:
        "Which of the following is not a valid floating point constant?",
      options: [
        { id: 1, text: "3.14" },
        { id: 2, text: ".3e12" },
        { id: 3, text: "314e" },
        { id: 4, text: "3.1E+12" },
      ],
      correctOption: 3,
    },
    {
      id: 12,
      question: "Which of the following is not a valid integer constant?",
      options: [
        { id: 1, text: "0" },
        { id: 2, text: "123" },
        { id: 3, text: "0123" },
        { id: 4, text: "123.0" },
      ],
      correctOption: 4,
    },
    {
      id: 13,
      question: "Which of the following is not a valid escape sequence?",
      options: [
        { id: 1, text: "\\n" },
        { id: 2, text: "\\t" },
        { id: 3, text: "\\a" },
        { id: 4, text: "\\e" },
      ],
      correctOption: 4,
    },
    {
      id: 14,
      question: "Which of the following is not a valid character constant?",
      options: [
        { id: 1, text: "'a'" },
        { id: 2, text: "'\\n'" },
        { id: 3, text: "'\\x41'" },
        { id: 4, text: '"a"' },
      ],
      correctOption: 4,
    },
    {
      id: 15,
      question: "Which of the following is not a valid string literal?",
      options: [
        { id: 1, text: '"Hello"' },
        { id: 2, text: '"Hello, World"' },
        { id: 3, text: "'Hello'" },
        { id: 4, text: '""' },
      ],
      correctOption: 3,
    },
    {
      id: 16,
      question: "Which of the following is not a valid comment?",
      options: [
        { id: 1, text: "/* Comment */" },
        { id: 2, text: "// Comment" },
        { id: 3, text: "/* Comment" },
        { id: 4, text: "// Comment */" },
      ],
      correctOption: 3,
    },
    {
      id: 17,
      question: "Which of the following is not a valid preprocessor directive?",
      options: [
        { id: 1, text: "#define" },
        { id: 2, text: "#include" },
        { id: 3, text: "#ifdef" },
        { id: 4, text: "#pragma" },
      ],
      correctOption: 4,
    },
    {
      id: 18,
      question: "Which of the following is not a valid storage class?",
      options: [
        { id: 1, text: "auto" },
        { id: 2, text: "register" },
        { id: 3, text: "static" },
        { id: 4, text: "constant" },
      ],
      correctOption: 4,
    },
    {
      id: 19,
      question: "Which of the following is not a valid loop control statement?",
      options: [
        { id: 1, text: "for" },
        { id: 2, text: "while" },
        { id: 3, text: "do-while" },
        { id: 4, text: "until" },
      ],
      correctOption: 4,
    },
    {
      id: 20,
      question: "Which of the following is not a valid function?",
      options: [
        { id: 1, text: "printf" },
        { id: 2, text: "scanf" },
        { id: 3, text: "main" },
        { id: 4, text: "return" },
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

    let totalScore = 0;

    currentQuestions.forEach((q) => {
      if (selectedOptions[q.id] && selectedOptions[q.id] === q.correctOption) {
        totalScore += 1;
      }
    });

    setScore(totalScore);
    setSubmitted(true);
    setShowFeedback(true);

    if (totalScore > 3) {
      setNextLevelUnlocked(true);
      await updateUserLevel();
    }
  };

  const handleLevelUpdate = async () => {
    if (currentLevel < 2) {
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
        setSubmitted(false);
        setShowFeedback(false);
         setScore(0);
         setSelectedOptions({});
         
         setTimeLeft(120);

       
        window.location.href = "/arraycpp";
        alert("You have successfully moved to next level of the course!");
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
    setTimeLeft(120); // Reset the timer
    window.location.href = "/arraycpp";
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

  const handleTimeExpired = () => {
    setTimeExpired(true);
    resetQuiz();
  };

  const resetQuiz = () => {
    setSelectedOptions({});
    setScore(0);
    setSubmitted(false);
    setShowFeedback(false);
    setNextLevelUnlocked(false);
    setCurrentSet((currentSet % 4) + 1); // Alternate between sets
    setTimeLeft(120); // Reset the timer
    setTimeExpired(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-white-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-sky-800">Quiz on variables</h1>
      {!submitted && !timeExpired && (
        <div className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded-md border border-gray-300">
          <div className="text-red-500 text-lg font-semibold">
            Time left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}
          </div>
        </div>
      )}
      {!submitted && !timeExpired && (
        <p className="font-semibold rounded-md keyword-box border border-gray-300 p-4 bg-gray-300 mx-9">
          There are 5 questions on variables. You{" "}
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
      {timeExpired && (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-red-500 font-semibold mb-4">
            Time's up! Please take the quiz again.
          </p>
          <button
            onClick={resetQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start Again
          </button>
        </div>
      )}
      {!submitted && !timeExpired ? (
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
            </div>
            {showFeedback && (
              <div className="mt-4">
                <p className="text-green-500 text-2xl">Score: {score}/5</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
      {submitted && !timeExpired && (
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
              Unlock Next Level
            </button>
          )}

          <button
            onClick={() => {
              resetQuiz();
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
