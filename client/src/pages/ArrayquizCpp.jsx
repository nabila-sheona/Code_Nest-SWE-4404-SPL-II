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
  const courseName = "C Programming";
  const courseTopic = "arrays";

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
        "Which of the following is the correct way to declare an array in C++?",
      options: [
        { id: 1, text: "int array[10];" },
        { id: 2, text: "int array;" },
        { id: 3, text: "array[10] int;" },
        { id: 4, text: "array int[10];" },
      ],
      correctOption: 1,
    },
    {
      id: 2,
      question: "What is the index of the first element in an array in C++?",
      options: [
        { id: 1, text: "1" },
        { id: 2, text: "0" },
        { id: 3, text: "-1" },
        { id: 4, text: "Depends on the array size" },
      ],
      correctOption: 2,
    },
    {
      id: 3,
      question: "How do you access the 5th element in an array named 'arr'?",
      options: [
        { id: 1, text: "arr[5]" },
        { id: 2, text: "arr[4]" },
        { id: 3, text: "arr(5)" },
        { id: 4, text: "arr{5}" },
      ],
      correctOption: 2,
    },
    {
      id: 4,
      question:
        "Which of the following correctly initializes an array of 5 integers to 0?",
      options: [
        { id: 1, text: "int array[5] = {0};" },
        { id: 2, text: "int array[5] = 0;" },
        { id: 3, text: "int array[5] = {0,0,0,0,0};" },
        { id: 4, text: "int array = {0};" },
      ],
      correctOption: 1,
    },
    {
      id: 5,
      question:
        'What is the output of the following code?\n\nint arr[3] = {1, 2, 3};\nprintf("%d", arr[1]);',
      options: [
        { id: 1, text: "1" },
        { id: 2, text: "2" },
        { id: 3, text: "3" },
        { id: 4, text: "Garbage value" },
      ],
      correctOption: 2,
    },
    {
      id: 6,
      question: "How do you determine the size of an array in C++?",
      options: [
        { id: 1, text: "sizeof(array)" },
        { id: 2, text: "length(array)" },
        { id: 3, text: "array.size()" },
        { id: 4, text: "size(array)" },
      ],
      correctOption: 1,
    },
    {
      id: 7,
      question: "What will happen if you access an array out of its bounds?",
      options: [
        { id: 1, text: "Compile-time error" },
        { id: 2, text: "Runtime error" },
        { id: 3, text: "Undefined behavior" },
        { id: 4, text: "Nothing" },
      ],
      correctOption: 3,
    },
    {
      id: 8,
      question:
        "Which of the following is the correct way to declare a multidimensional array?",
      options: [
        { id: 1, text: "int array[10][10];" },
        { id: 2, text: "int array[10,10];" },
        { id: 3, text: "array[10][10] int;" },
        { id: 4, text: "array int[10,10];" },
      ],
      correctOption: 1,
    },
    {
      id: 9,
      question:
        'What is the output of the following code?\n\nint arr[] = {10, 20, 30};\nprintf("%d", arr[2]);',
      options: [
        { id: 1, text: "10" },
        { id: 2, text: "20" },
        { id: 3, text: "30" },
        { id: 4, text: "Garbage value" },
      ],
      correctOption: 3,
    },
    {
      id: 10,
      question: "How do you initialize an array in C++ with specific values?",
      options: [
        { id: 1, text: "int array[3] = {1, 2, 3};" },
        { id: 2, text: "int array = {1, 2, 3};" },
        { id: 3, text: "array[3] int = {1, 2, 3};" },
        { id: 4, text: "array int = {1, 2, 3};" },
      ],
      correctOption: 1,
    },
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
    if (currentLevel < 3) {
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

       
        window.location.href = "/operatorscpp";
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
    window.location.href = "/operatorscpp";
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
      <h1 className="text-3xl font-bold mb-8 text-sky-800">Quiz on Arrays</h1>
      {!submitted && !timeExpired && (
        <div className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded-md border border-gray-300">
          <div className="text-red-500 text-lg font-semibold">
            Time left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}
          </div>
        </div>
      )}
      {!submitted && !timeExpired && (
        <p className="font-semibold rounded-md keyword-box border border-gray-300 p-4 bg-gray-300 mx-9">
          There are 5 questions on ARRAYS. You{" "}
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



