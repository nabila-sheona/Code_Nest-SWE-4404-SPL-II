import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
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
  const [currentSet, setCurrentSet] = useState(
    JSON.parse(localStorage.getItem("currentSet")) || 1
  );
  const [timeLeft, setTimeLeft] = useState(
    JSON.parse(localStorage.getItem("timeLeft")) || 120
  ); // 2 minutes timer

  const [currentLevel, setCurrentLevel] = useState(0);

  const { currentUser } = useSelector((state) => state.user);
  const courseName = "C Programming";
  const courseTopic = "conditions";
 
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
        'What will be the output of the following code?\n\nint x = 10;\nif (x > 0) {\n    printf("x is positive");\n}',
      options: [
        { id: 1, text: "x is positive" },
        { id: 2, text: "No output" },
        { id: 3, text: "Compilation error" },
        { id: 4, text: "x is not positive" },
      ],
      correctOption: 1,
    },
    {
      id: 2,
      question:
        'What will be the output of the following code?\n\nint x = -10;\nif (x > 0) {\n    printf("x is positive");\n} else {\n    printf("x is not positive");\n}',
      options: [
        { id: 1, text: "x is positive" },
        { id: 2, text: "x is not positive" },
        { id: 3, text: "No output" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 2,
    },
    {
      id: 3,
      question:
        'What will be the output of the following code?\n\nint x = 0;\nif (x > 0) {\n    printf("x is positive");\n} else if (x < 0) {\n    printf("x is negative");\n} else {\n    printf("x is zero");\n}',
      options: [
        { id: 1, text: "x is positive" },
        { id: 2, text: "x is negative" },
        { id: 3, text: "x is zero" },
        { id: 4, text: "No output" },
      ],
      correctOption: 3,
    },
    {
      id: 4,
      question:
        'What will be the output of the following code?\n\nint day = 4;\nswitch (day) {\n    case 1:\n        printf("Monday");\n        break;\n    case 2:\n        printf("Tuesday");\n        break;\n    case 3:\n        printf("Wednesday");\n        break;\n    case 4:\n        printf("Thursday");\n        break;\n    case 5:\n        printf("Friday");\n        break;\n    case 6:\n        printf("Saturday");\n        break;\n    case 7:\n        printf("Sunday");\n        break;\n    default:\n        printf("Invalid day");\n}',
      options: [
        { id: 1, text: "Monday" },
        { id: 2, text: "Invalid day" },
        { id: 3, text: "Thursday" },
        { id: 4, text: "Sunday" },
      ],
      correctOption: 3,
    },
    {
      id: 5,
      question:
        'What will be the output of the following code?\n\nint x = 5;\nint y = 10;\nif (x > 0 && y > 0) {\n    printf("Both x and y are positive");\n}',
      options: [
        { id: 1, text: "No output" },
        { id: 2, text: "Both x and y are positive" },
        { id: 3, text: "Compilation error" },
        { id: 4, text: "x is positive" },
      ],
      correctOption: 2,
    },
    {
      id: 6,
      question:
        'What will be the output of the following code?\n\nint x = 5;\nint y = 10;\nif (x > 0 || y < 0) {\n    printf("At least one of x or y is positive");\n}',
      options: [
        { id: 1, text: "No output" },
        { id: 2, text: "Both x and y are positive" },
        { id: 3, text: "At least one of x or y is positive" },
        { id: 4, text: "x is positive" },
      ],
      correctOption: 3,
    },
    {
      id: 7,
      question:
        'What will be the output of the following code?\n\nint x = -5;\nif (!(x < 0)) {\n    printf("x is not negative");\n} else {\n    printf("x is negative");\n}',
      options: [
        { id: 1, text: "x is negative" },
        { id: 2, text: "x is not negative" },
        { id: 3, text: "No output" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 1,
    },
    {
      id: 8,
      question:
        'What will be the output of the following code?\n\nint x = 5;\nif (x > 10) {\n    printf("x is greater than 10");\n} else {\n    printf("x is not greater than 10");\n}',
      options: [
        { id: 1, text: "x is greater than 10" },
        { id: 2, text: "x is not greater than 10" },
        { id: 3, text: "No output" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 2,
    },
    {
      id: 9,
      question:
        'What will be the output of the following code?\n\nint x = 5;\nif (x == 5) {\n    printf("x is 5");\n} else {\n    printf("x is not 5");\n}',
      options: [
        { id: 1, text: "x is 5" },
        { id: 2, text: "x is not 5" },
        { id: 3, text: "No output" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 1,
    },
    {
      id: 10,
      question:
        'What will be the output of the following code?\n\nint x = 5;\nif (x != 5) {\n    printf("x is not 5");\n} else {\n    printf("x is 5");\n}',
      options: [
        { id: 1, text: "x is not 5" },
        { id: 2, text: "x is 5" },
        { id: 3, text: "No output" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 2,
    },
    {
      id: 11,
      question:
        'What will be the output of the following code?\n\nint day = 7;\nswitch (day) {\n    case 1:\n        printf("Monday");\n        break;\n    case 2:\n        printf("Tuesday");\n        break;\n    case 3:\n        printf("Wednesday");\n        break;\n    case 4:\n        printf("Thursday");\n        break;\n    case 5:\n        printf("Friday");\n        break;\n    case 6:\n        printf("Saturday");\n        break;\n    case 7:\n        printf("Sunday");\n        break;\n    default:\n        printf("Invalid day");\n}',
      options: [
        { id: 1, text: "Invalid day" },
        { id: 2, text: "Sunday" },
        { id: 3, text: "Saturday" },
        { id: 4, text: "Monday" },
      ],
      correctOption: 2,
    },
    {
      id: 12,
      question:
        'What will be the output of the following code?\n\nint x = 10;\nif (x >= 10) {\n    printf("x is 10 or more");\n}',
      options: [
        { id: 1, text: "x is 10 or more" },
        { id: 2, text: "No output" },
        { id: 3, text: "Compilation error" },
        { id: 4, text: "x is less than 10" },
      ],
      correctOption: 1,
    },
    {
      id: 13,
      question:
        'What will be the output of the following code?\n\nint x = 10;\nif (x <= 10) {\n    printf("x is 10 or less");\n}',
      options: [
        { id: 1, text: "x is 10 or less" },
        { id: 2, text: "No output" },
        { id: 3, text: "Compilation error" },
        { id: 4, text: "x is more than 10" },
      ],
      correctOption: 1,
    },
    {
      id: 14,
      question:
        'What will be the output of the following code?\n\nint x = 5;\nint y = 10;\nif (x > 0 && y < 0) {\n    printf("x is positive and y is negative");\n} else {\n    printf("x and y are not both positive and negative");\n}',
      options: [
        { id: 1, text: "x is positive and y is negative" },
        { id: 2, text: "x and y are not both positive and negative" },
        { id: 3, text: "No output" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 2,
    },
    {
      id: 15,
      question:
        'What will be the output of the following code?\n\nint x = 5;\nint y = 10;\nif (x > 0 || y < 0) {\n    printf("x is positive or y is negative");\n}',
      options: [
        { id: 1, text: "x is positive or y is negative" },
        { id: 2, text: "No output" },
        { id: 3, text: "Compilation error" },
        { id: 4, text: "x and y are both positive" },
      ],
      correctOption: 1,
    },
    {
      id: 16,
      question:
        'What will be the output of the following code?\n\nint x = 5;\nint y = 10;\nif (!(x > 0)) {\n    printf("x is not positive");\n} else {\n    printf("x is positive");\n}',
      options: [
        { id: 1, text: "x is positive" },
        { id: 2, text: "x is not positive" },
        { id: 3, text: "No output" },
        { id: 4, text: "Compilation error" },
      ],
      correctOption: 1,
    },
    {
      id: 17,
      question:
        'What will be the output of the following code?\n\nint x = 0;\nif (x > 0) {\n    printf("x is positive");\n} else if (x == 0) {\n    printf("x is zero");\n} else {\n    printf("x is negative");\n}',
      options: [
        { id: 1, text: "x is positive" },
        { id: 2, text: "x is zero" },
        { id: 3, text: "x is negative" },
        { id: 4, text: "No output" },
      ],
      correctOption: 2,
    },
    {
      id: 18,
      question:
        'What will be the output of the following code?\n\nint x = 1;\nswitch (x) {\n    case 1:\n        printf("One");\n        break;\n    case 2:\n        printf("Two");\n        break;\n    default:\n        printf("Other");\n}',
      options: [
        { id: 1, text: "One" },
        { id: 2, text: "Two" },
        { id: 3, text: "Other" },
        { id: 4, text: "No output" },
      ],
      correctOption: 1,
    },
    {
      id: 19,
      question:
        'What will be the output of the following code?\n\nint x = 3;\nswitch (x) {\n    case 1:\n        printf("One");\n        break;\n    case 2:\n        printf("Two");\n        break;\n    default:\n        printf("Other");\n}',
      options: [
        { id: 1, text: "One" },
        { id: 2, text: "Two" },
        { id: 3, text: "Other" },
        { id: 4, text: "No output" },
      ],
      correctOption: 3,
    },
    {
      id: 20,
      question:
        'What will be the output of the following code?\n\nint x = 5;\nif (x > 0 && x < 10) {\n    printf("x is between 0 and 10");\n} else {\n    printf("x is not between 0 and 10");\n}',
      options: [
        { id: 1, text: "x is between 0 and 10" },
        { id: 2, text: "x is not between 0 and 10" },
        { id: 3, text: "No output" },
        { id: 4, text: "Compilation error" },
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
    if (currentLevel < 5) {
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
        window.location.href = "/strings";
        alert("You have successfully moved to next level of the course!");
      } else {
        console.error("Failed to unlock next level");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

 
  const navigateToNextPage = () => {
    window.location.href = "/strings";
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
        Quiz on Conditions
      </h1>
      <div className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded-md border border-gray-300">
        <div className="text-red-500 text-lg font-semibold">
          Time left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}
        </div>
      </div>
      {!submitted && (
        <p className="font-semibold rounded-md keyword-box border border-gray-300 p-4 bg-gray-300 mx-9">
          There are 5 questions on CONDITIONS. You{" "}
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
