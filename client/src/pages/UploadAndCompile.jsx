import React, { useState } from "react";
import axios from "axios";
import "./UploadAndCompile.css";

const questions = [
  {
    id: 1,
    question: 'Write a C program to print "Hello, World!" on the screen.',
    expectedOutput: "Hello, World!",
  },
  {
    id: 2,
    question: "Write a C program to print the sum of 5 and 10.",
    expectedOutput: "15",
  },
  {
    id: 3,
    question:
      "Write a C program to check whether 7 is even or odd.Print even/odd",
    expectedOutput: "odd",
  },
  {
    id: 4,
    question: "Write a C program to find the factorial of 5.",
    expectedOutput: "120",
  },
  {
    id: 5,
    question: "Write a C program to find the largest among 3, 7, and 5.",
    expectedOutput: "7",
  },
  {
    id: 6,
    question:
      "Write a C program to check whether the year 2024 is a leap year or not.Print yes/no",
    expectedOutput: "yes",
  },
  {
    id: 7,
    question: "Write a C program to find the reverse of the number 12345.",
    expectedOutput: "54321",
  },
  {
    id: 8,
    question:
      "Write a C program to check whether the number 121 is a palindrome or not.Print yes/no",
    expectedOutput: "yes",
  },
  {
    id: 9,
    question:
      "Write a C program to generate Fibonacci series up to 5 terms.Write comma-separated",
    expectedOutput: "0, 1, 1, 2, 3\n",
  },
  {
    id: 10,
    question: "Write a C program to find the GCD of 56 and 98.",
    expectedOutput: "14",
  },
  {
    id: 11,
    question:
      "Write a C program to check whether 29 is a prime number or not.Print yes/no",
    expectedOutput: "yes",
  },
  {
    id: 12,
    question:
      "Write a C program to print all prime numbers between 10 and 20.Write space separated.",
    expectedOutput: "11 13 17 19",
  },
  {
    id: 13,
    question:
      "Write a C program to calculate the sum of natural numbers up to 10.",
    expectedOutput: "55",
  },
  {
    id: 14,
    question: "Write a C program to find the factorial of 6.",
    expectedOutput: "720",
  },
  {
    id: 15,
    question:
      "Write a C program to print the ASCII value of the character 'A'.",
    expectedOutput: "65",
  },
  {
    id: 16,
    question:
      "Write a C program to find the sum of digits of the number 12345.",
    expectedOutput: "15",
  },
  {
    id: 17,
    question: "Write a C program to reverse the string 'hello'.",
    expectedOutput: "olleh",
  },
  {
    id: 18,
    question:
      "Write a C program to check whether the string 'madam' is a palindrome or not.Print yes/no",
    expectedOutput: "yes",
  },
  {
    id: 19,
    question:
      "Write a C program to concatenate the strings 'Hello, ' and 'World!'.",
    expectedOutput: "Hello, World!",
  },
];

function UploadAndCompile() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [result, setResult] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleQuestionChange = (event) => {
    const questionId = Number(event.target.value);
    const question = questions.find((q) => q.id === questionId);
    setSelectedQuestion(question);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/compile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setOutput(response.data.output);

      const expectedOutput = selectedQuestion.expectedOutput;

      if (response.data.output.trim() === expectedOutput.trim()) {
        setResult("Correct");
      } else {
        setResult("Wrong");
      }
    } catch (error) {
      console.error(
        "Error uploading and compiling file:",
        error.response ? error.response.data : error.message
      );
      setOutput(
        `Error compiling the code: ${
          error.response ? error.response.data.details : error.message
        }`
      );
      setResult("Wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload">
      <div className="container">
        <h1>Upload and Compile C Code</h1>
        <div className="sections">
          <div className="info">
            <h3 className="font-bold">Question:</h3>
            <p>Choose from the drop down menu</p>
            <select onChange={handleQuestionChange} value={selectedQuestion.id}>
              {questions.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.question}
                </option>
              ))}
            </select>
            <label htmlFor="file">Select C File</label>
            <input type="file" accept=".c" onChange={handleFileChange} />
            <button onClick={handleSubmit}>
              {uploading ? "Uploading..." : "Compile"}
            </button>
            {output && (
              <div className="output">
                <h2>Output:</h2>
                <pre>{output}</pre>
                <h2>Result:</h2>
                <p>{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadAndCompile;
