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
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes timer
  const [currentLevel, setCurrentLevel] = useState(0);

  const { currentUser } = useSelector((state) => state.user);
  const courseName = "C Programming";
  const courseTopic = "arrays";

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
      question: "Which of the following correctly declares an array in C?",
      options: [
        { id: 1, text: "int array[10];" },
        { id: 2, text: "array{10};" },
        { id: 3, text: "int array;" },
        { id: 4, text: "array int[10];" },
      ],
      correctOption: 1,
    },
    {
      id: 2,
      question: "How do you initialize all elements of an array to zero?",
      options: [
        { id: 1, text: "int array[10] = {0};" },
        { id: 2, text: "int array[10] = 0;" },
        { id: 3, text: "int array = {0};" },
        { id: 4, text: "array[10] = {0};" },
      ],
      correctOption: 1,
    },
    {
      id: 3,
      question: "Which of the following accesses the last element of an array?",
      options: [
        { id: 1, text: "array[last];" },
        { id: 2, text: "array[9];" },
        { id: 3, text: "array[10];" },
        { id: 4, text: "array[0];" },
      ],
      correctOption: 2,
    },
    {
      id: 4,
      question: "How do you pass an array to a function in C?",
      options: [
        { id: 1, text: "func(array);" },
        { id: 2, text: "func(&array);" },
        { id: 3, text: "func(*array);" },
        { id: 4, text: "func(array[]);" },
      ],
      correctOption: 1,
    },
    {
      id: 5,
      question: "What is the index of the first element in an array?",
      options: [
        { id: 1, text: "1" },
        { id: 2, text: "0" },
        { id: 3, text: "-1" },
        { id: 4, text: "2" },
      ],
      correctOption: 2,
    },
    {
      id: 6,
      question:
        "Which of the following correctly declares a multi-dimensional array?",
      options: [
        { id: 1, text: "int array[5][5];" },
        { id: 2, text: "int array[5,5];" },
        { id: 3, text: "array int[5][5];" },
        { id: 4, text: "int array{5}{5};" },
      ],
      correctOption: 1,
    },
    {
      id: 7,
      question:
        "How do you access the element in the 3rd row and 2nd column of a 2D array?",
      options: [
        { id: 1, text: "array[2][1];" },
        { id: 2, text: "array[3][2];" },
        { id: 3, text: "array[1][2];" },
        { id: 4, text: "array[2][3];" },
      ],
      correctOption: 1,
    },
    {
      id: 8,
      question:
        "Which of the following is a valid way to initialize a 2D array?",
      options: [
        { id: 1, text: "int array[2][2] = {{1, 2}, {3, 4}};" },
        { id: 2, text: "int array[2][2] = [1, 2, 3, 4];" },
        { id: 3, text: "int array[2][2] = {1, 2, 3, 4};" },
        { id: 4, text: "int array[2][2] = {{1, 2}, {3, 4},};" },
      ],
      correctOption: 1,
    },
    {
      id: 9,
      question: "Which of the following is not a valid array operation?",
      options: [
        { id: 1, text: "array[1] = 10;" },
        { id: 2, text: "array[2] = array[1] + 1;" },
        { id: 3, text: "array[3] = ++array[2];" },
        { id: 4, text: "array = array + 1;" },
      ],
      correctOption: 4,
    },
    {
      id: 10,
      question: "How do you find the length of an array in C?",
      options: [
        { id: 1, text: "sizeof(array);" },
        { id: 2, text: "sizeof(array)/sizeof(array[0]);" },
        { id: 3, text: "length(array);" },
        { id: 4, text: "array.length;" },
      ],
      correctOption: 2,
    },
    {
      id: 11,
      question:
        "Which of the following statements is correct about arrays in C?",
      options: [
        {
          id: 1,
          text: "Array elements are stored in contiguous memory locations.",
        },
        { id: 2, text: "Array elements can have different data types." },
        { id: 3, text: "The size of an array must be declared at runtime." },
        {
          id: 4,
          text: "You cannot initialize an array at the time of declaration.",
        },
      ],
      correctOption: 1,
    },
    {
      id: 12,
      question: "How do you dynamically allocate memory for an array in C?",
      options: [
        { id: 1, text: "int* array = malloc(10 * sizeof(int));" },
        { id: 2, text: "int array[10] = malloc(10 * sizeof(int));" },
        { id: 3, text: "int* array = malloc(10);" },
        { id: 4, text: "int* array = malloc(10 * int);" },
      ],
      correctOption: 1,
    },
    {
      id: 13,
      question:
        "How do you free dynamically allocated memory for an array in C?",
      options: [
        { id: 1, text: "delete(array);" },
        { id: 2, text: "free(array);" },
        { id: 3, text: "clear(array);" },
        { id: 4, text: "remove(array);" },
      ],
      correctOption: 2,
    },
    {
      id: 14,
      question: "What will happen if you access an array out of bounds in C?",
      options: [
        { id: 1, text: "It will result in a compile-time error." },
        { id: 2, text: "It will return a default value." },
        { id: 3, text: "It may result in undefined behavior." },
        { id: 4, text: "It will raise an exception." },
      ],
      correctOption: 3,
    },
    {
      id: 15,
      question:
        "Which of the following correctly assigns a value to an array element?",
      options: [
        { id: 1, text: "array[3] = 10;" },
        { id: 2, text: "array(3) = 10;" },
        { id: 3, text: "array[3] == 10;" },
        { id: 4, text: "array = 10[3];" },
      ],
      correctOption: 1,
    },
    {
      id: 16,
      question: "Which of the following is true about arrays in C?",
      options: [
        { id: 1, text: "Arrays can be resized after declaration." },
        { id: 2, text: "Arrays start with index 1." },
        { id: 3, text: "Arrays can store multiple data types." },
        { id: 4, text: "Arrays have fixed size." },
      ],
      correctOption: 4,
    },
    {
      id: 17,
      question: "How do you copy the contents of one array to another in C?",
      options: [
        { id: 1, text: "array2 = array1;" },
        { id: 2, text: "memcpy(array2, array1, sizeof(array1));" },
        { id: 3, text: "copy(array2, array1);" },
        { id: 4, text: "array2 = array1.copy();" },
      ],
      correctOption: 2,
    },
    {
      id: 18,
      question:
        'What is the output of the following code?\nint array[5] = {1, 2, 3, 4, 5};\nprintf("%d", array[2]);',
      options: [
        { id: 1, text: "1" },
        { id: 2, text: "2" },
        { id: 3, text: "3" },
        { id: 4, text: "4" },
      ],
      correctOption: 3,
    },
    {
      id: 19,
      question: "What is the correct way to declare a pointer to an array?",
      options: [
        { id: 1, text: "int* array;" },
        { id: 2, text: "int array*;" },
        { id: 3, text: "int* array[10];" },
        { id: 4, text: "int (*array)[10];" },
      ],
      correctOption: 4,
    },
    {
      id: 20,
      question:
        "Which of the following will correctly print all elements of an array?",
      options: [
        {
          id: 1,
          text: 'for (int i = 0; i < 10; i++) { printf("%d", array[i]); }',
        },
        {
          id: 2,
          text: 'for (int i = 0; i <= 10; i++) { printf("%d", array[i]); }',
        },
        {
          id: 3,
          text: 'for (int i = 1; i < 10; i++) { printf("%d", array[i]); }',
        },
        {
          id: 4,
          text: 'for (int i = 1; i <= 10; i++) { printf("%d", array[i]); }',
        },
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
        window.location.href = "/Operators";
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
    window.location.href = "/Operators";
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
      <h1 className="text-3xl font-bold mb-8 text-sky-800">Quiz on Arrays</h1>
      <div className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded-md border border-gray-300">
        <div className="text-red-500 text-lg font-semibold">
          Time left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}
        </div>
      </div>
      {!submitted && (
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
