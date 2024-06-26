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
  const courseTopic = "strings";

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
        'How do you declare and initialize a string in C?\n\nOptions:\n1. int greeting = "Hello, world!";\n2. char greeting[] = "Hello, world!";\n3. string greeting = "Hello, world!";\n4. char greeting = "Hello, world!";',
      options: [
        { id: 1, text: 'int greeting = "Hello, world!";' },
        { id: 2, text: 'char greeting[] = "Hello, world!";' },
        { id: 3, text: 'string greeting = "Hello, world!";' },
        { id: 4, text: 'char greeting = "Hello, world!";' },
      ],
      correctOption: 2,
    },
    {
      id: 2,
      question:
        'How do you print a string in C?\n\nOptions:\n1. printf("%d", greeting);\n2. printf("%s", greeting);\n3. printf("%c", greeting);\n4. printf("%f", greeting);',
      options: [
        { id: 1, text: 'printf("%d", greeting);' },
        { id: 2, text: 'printf("%s", greeting);' },
        { id: 3, text: 'printf("%c", greeting);' },
        { id: 4, text: 'printf("%f", greeting);' },
      ],
      correctOption: 2,
    },
    {
      id: 3,
      question:
        "Which function is used to find the length of a string in C?\n\nOptions:\n1. strlen()\n2. strcpy()\n3. strcat()\n4. strlength()",
      options: [
        { id: 1, text: "strlen()" },
        { id: 2, text: "strcpy()" },
        { id: 3, text: "strcat()" },
        { id: 4, text: "strlength()" },
      ],
      correctOption: 1,
    },
    {
      id: 4,
      question:
        "Which function is used to copy one string to another in C?\n\nOptions:\n1. strlen()\n2. strcpy()\n3. strcat()\n4. strcopy()",
      options: [
        { id: 1, text: "strlen()" },
        { id: 2, text: "strcpy()" },
        { id: 3, text: "strcat()" },
        { id: 4, text: "strcopy()" },
      ],
      correctOption: 2,
    },
    {
      id: 5,
      question:
        "Which function is used to concatenate two strings in C?\n\nOptions:\n1. strlen()\n2. strcpy()\n3. strcat()\n4. strconcat()",
      options: [
        { id: 1, text: "strlen()" },
        { id: 2, text: "strcpy()" },
        { id: 3, text: "strcat()" },
        { id: 4, text: "strconcat()" },
      ],
      correctOption: 3,
    },
    {
      id: 6,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str1[20] = "Hello";\n    char str2[20] = "World";\n\n    printf("Length of str1: %d\\n", strlen(str1));\n    printf("Concatenated string: %s\\n", strcat(str1, str2));\n    printf("Copied string: %s\\n", strcpy(str2, str1));\n\n    return 0;\n}',
      options: [
        {
          id: 1,
          text: "Length of str1: 5\nConcatenated string: HelloWorld\nCopied string: HelloWorld",
        },
        {
          id: 2,
          text: "Length of str1: 5\nConcatenated string: Hello World\nCopied string: Hello World",
        },
        {
          id: 3,
          text: "Length of str1: 5\nConcatenated string: HelloWorld\nCopied string: WorldHello",
        },
        {
          id: 4,
          text: "Length of str1: 5\nConcatenated string: Hello World\nCopied string: World Hello",
        },
      ],
      correctOption: 1,
    },
    {
      id: 7,
      question:
        "Which character is used to terminate a string in C?\n\nOptions:\n1. \\n\n2. \\t\n3. \\0\n4. \\b",
      options: [
        { id: 1, text: "\\n" },
        { id: 2, text: "\\t" },
        { id: 3, text: "\\0" },
        { id: 4, text: "\\b" },
      ],
      correctOption: 3,
    },
    {
      id: 8,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str1[20] = "C programming";\n    printf("Length of str1: %d\\n", strlen(str1));\n    return 0;\n}',
      options: [
        { id: 1, text: "Length of str1: 13" },
        { id: 2, text: "Length of str1: 12" },
        { id: 3, text: "Length of str1: 14" },
        { id: 4, text: "Length of str1: 11" },
      ],
      correctOption: 1,
    },
    {
      id: 9,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str1[20] = "Hello";\n    char str2[20] = "World";\n    strcat(str1, str2);\n    printf("%s\\n", str1);\n    return 0;\n}',
      options: [
        { id: 1, text: "Hello World" },
        { id: 2, text: "HelloWorld" },
        { id: 3, text: "WorldHello" },
        { id: 4, text: "Hello" },
      ],
      correctOption: 2,
    },
    {
      id: 10,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str1[20] = "Hello";\n    char str2[20];\n    strcpy(str2, str1);\n    printf("%s\\n", str2);\n    return 0;\n}',
      options: [
        { id: 1, text: "Hello" },
        { id: 2, text: "HelloHello" },
        { id: 3, text: "World" },
        { id: 4, text: "No output" },
      ],
      correctOption: 1,
    },
    {
      id: 11,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n\nint main() {\n    char str[] = "Hello, world!";\n    printf("%c\\n", str[7]);\n    return 0;\n}',
      options: [
        { id: 1, text: "w" },
        { id: 2, text: "o" },
        { id: 3, text: "l" },
        { id: 4, text: "d" },
      ],
      correctOption: 1,
    },
    {
      id: 12,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str1[20] = "Hello";\n    char str2[20] = "World";\n    printf("%d\\n", strcmp(str1, str2));\n    return 0;\n}',
      options: [
        { id: 1, text: "0" },
        { id: 2, text: "-1" },
        { id: 3, text: "1" },
        { id: 4, text: "No output" },
      ],
      correctOption: 2,
    },
    {
      id: 13,
      question:
        "Which function is used to compare two strings in C?\n\nOptions:\n1. strlen()\n2. strcmp()\n3. strcpy()\n4. strcompare()",
      options: [
        { id: 1, text: "strlen()" },
        { id: 2, text: "strcmp()" },
        { id: 3, text: "strcpy()" },
        { id: 4, text: "strcompare()" },
      ],
      correctOption: 2,
    },
    {
      id: 14,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str1[20] = "Hello";\n    char str2[20] = "Hello";\n    printf("%d\\n", strcmp(str1, str2));\n    return 0;\n}',
      options: [
        { id: 1, text: "0" },
        { id: 2, text: "-1" },
        { id: 3, text: "1" },
        { id: 4, text: "No output" },
      ],
      correctOption: 1,
    },
    {
      id: 15,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str1[20] = "Hello";\n    char str2[20] = "World";\n    strcpy(str1, str2);\n    printf("%s\\n", str1);\n    return 0;\n}',
      options: [
        { id: 1, text: "World" },
        { id: 2, text: "Hello" },
        { id: 3, text: "HelloWorld" },
        { id: 4, text: "WorldHello" },
      ],
      correctOption: 1,
    },
    {
      id: 16,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str1[20] = "Hello";\n    char str2[20] = "World";\n    strcat(str1, " ");\n    strcat(str1, str2);\n    printf("%s\\n", str1);\n    return 0;\n}',
      options: [
        { id: 1, text: "Hello World" },
        { id: 2, text: "HelloWorld" },
        { id: 3, text: "World Hello" },
        { id: 4, text: "Hello " },
      ],
      correctOption: 1,
    },
    {
      id: 17,
      question:
        'What will be the output of the following code?\n\n#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str1[20] = "Hello";\n    char str2[20];\n    strncpy(str2, str1, 3);\n    str2[3] = \'\\0\';\n    printf("%s\\n", str2);\n    return 0;\n}',
      options: [
        { id: 1, text: "Hel" },
        { id: 2, text: "Hello" },
        { id: 3, text: "Hel\0lo" },
        { id: 4, text: "He" },
      ],
      correctOption: 1,
    },
    {
      id: 18,
      question:
        "Which function is used to copy a specified number of characters from one string to another in C?\n\nOptions:\n1. strncpy()\n2. strcpy()\n3. strncopy()\n4. strcopy()",
      options: [
        { id: 1, text: "strncpy()" },
        { id: 2, text: "strcpy()" },
        { id: 3, text: "strncopy()" },
        { id: 4, text: "strcopy()" },
      ],
      correctOption: 1,
    },
    {
      id: 19,
      question:
        "Which function is used to find the first occurrence of a character in a string in C?\n\nOptions:\n1. strchr()\n2. strstr()\n3. strchar()\n4. strsearch()",
      options: [
        { id: 1, text: "strchr()" },
        { id: 2, text: "strstr()" },
        { id: 3, text: "strchar()" },
        { id: 4, text: "strsearch()" },
      ],
      correctOption: 1,
    },
    {
      id: 20,
      question:
        "Which function is used to find the first occurrence of a substring in a string in C?\n\nOptions:\n1. strchr()\n2. strstr()\n3. strsub()\n4. strfind()",
      options: [
        { id: 1, text: "strchr()" },
        { id: 2, text: "strstr()" },
        { id: 3, text: "strsub()" },
        { id: 4, text: "strfind()" },
      ],
      correctOption: 2,
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
    if (currentLevel < 6) {
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

       
        window.location.href = "/for-loops";
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
    window.location.href = "/for-loops";
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
      <h1 className="text-3xl font-bold mb-8 text-sky-800">Quiz on Strings</h1>
      {!submitted && !timeExpired && (
        <div className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded-md border border-gray-300">
          <div className="text-red-500 text-lg font-semibold">
            Time left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}
          </div>
        </div>
      )}
      {!submitted && !timeExpired && (
        <p className="font-semibold rounded-md keyword-box border border-gray-300 p-4 bg-gray-300 mx-9">
          There are 5 questions on strings. You{" "}
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
