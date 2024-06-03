import React, { useRef, useState, useEffect } from "react";
import { downloadPDF } from "../utils/pdf";

export default function Operators() {
  const [highlightedText, setHighlightedText] = useState("");
  const [highlightedRanges, setHighlightedRanges] = useState([]);
  const [userText, setUserText] = useState("Hello, world!");
  const [isButtonVisible, setIsButtonVisible] = useState(false); // State variable to track button visibility
  const MAX_TEXT_LENGTH = 30;

  const pdfRef = useRef();
  useEffect(() => {
    if (location.pathname === "/operators") {
      const scriptConfig = document.createElement("script");
      scriptConfig.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "28nNGKdoeW0eGCRMw54kM",
        domain: "www.chatbase.co"
      };
    `;
      document.body.appendChild(scriptConfig);

      const scriptEmbed = document.createElement("script");
      scriptEmbed.src = "https://www.chatbase.co/embed.min.js";
      scriptEmbed.setAttribute("chatbotId", "28nNGKdoeW0eGCRMw54kM");
      scriptEmbed.setAttribute("domain", "www.chatbase.co");
      scriptEmbed.defer = true;
      document.body.appendChild(scriptEmbed);

      return () => {
        document.body.removeChild(scriptConfig);
        document.body.removeChild(scriptEmbed);
      };
    }
  }, [location.pathname]);

  const handleHighlight = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const rangeCount = selection.rangeCount;
    const ranges = [];

    for (let i = 0; i < rangeCount; i++) {
      const range = selection.getRangeAt(i);
      ranges.push({
        range,
        color: "yellow", // Set the default highlight color here
      });
    }

    setHighlightedRanges([...highlightedRanges, ...ranges]);
    setHighlightedText(selectedText);
    setIsButtonVisible(true); // Show the button when text is highlighted
  };

  const undoHighlight = () => {
    const lastHighlightedRange = highlightedRanges.pop();
    const lastHighlightedText = lastHighlightedRange.range.toString();
    const lastHighlightedColor = lastHighlightedRange.color;

    setHighlightedText(lastHighlightedText);
    setHighlightedRanges([...highlightedRanges]); // Update the highlightedRanges state without the last highlight

    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(
      lastHighlightedRange.range.startContainer,
      lastHighlightedRange.range.startOffset
    );
    range.setEnd(
      lastHighlightedRange.range.endContainer,
      lastHighlightedRange.range.endOffset
    );
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand("hiliteColor", false, lastHighlightedColor); // Apply highlight color
  };

  const handleUserTextChange = (e) => {
    const newText = e.target.value.slice(0, MAX_TEXT_LENGTH);
    setUserText(newText);
  };

  const unlockNextLevel = () => {
    window.location.reload();
    
    window.location.href = "/Opquiz";
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-sky-300 to-white-500 min-h-screen ">
      <div
        className="max-w-screen-lg mx-auto px-4"
        id="pdfContent"
        onClick={handleHighlight}
      >
        <h1 className="text-3xl font-bold mb-8 text-sky-800">Operators in C</h1>
        <p>
          Operators in C are symbols that are used to perform operations on
          operands. C provides a rich set of operators categorized into various
          types such as arithmetic, relational, logical, assignment, and bitwise
          operators.
        </p>
        <p>Here are some common operators used in C programming:</p>
        <ul className="list-disc pl-6">
          <li>
            Arithmetic Operators: <code>+, -, *, /, %</code>
          </li>
          <li>
            Relational Operators: <code>==, !=, {"<, >, <=, >="}</code>
          </li>
          <li>
            Logical Operators: <code>{"&&, ||, !"}</code>
          </li>
          <li>
            Assignment Operators: <code>=, +=, -=, *=, /=, %=</code>
          </li>
          <li>
            Bitwise Operators: <code>&, |, ^, ~, {"<<, >>"}</code>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 text-sky-700">
          Arithmetic Operators
        </h2>
        <p>
          Arithmetic operators are used to perform mathematical operations such
          as addition, subtraction, multiplication, division, and modulus.
        </p>
        <pre className="bg-gray-200 p-4 rounded-md">
          <code>
            {`
int a = 10;
int b = 20;
int sum = a + b; // sum is 30
int difference = a - b; // difference is -10
int product = a * b; // product is 200
int quotient = a / b; // quotient is 0
int remainder = a % b; // remainder is 10
            `}
          </code>
        </pre>

        <h2 className="text-2xl font-bold mt-8 text-sky-700">
          Relational Operators
        </h2>
        <p>
          Relational operators are used to compare two values. They return a
          boolean result (true or false).
        </p>
        <pre className="bg-gray-200 p-4 rounded-md">
          <code>
            {`
int x = 10;
int y = 20;
bool isEqual = (x == y); // isEqual is false
bool isNotEqual = (x != y); // isNotEqual is true
bool isLess = (x < y); // isLess is true
bool isGreater = (x > y); // isGreater is false
bool isLessOrEqual = (x <= y); // isLessOrEqual is true
bool isGreaterOrEqual = (x >= y); // isGreaterOrEqual is false
            `}
          </code>
        </pre>

        <h2 className="text-2xl font-bold mt-8 text-sky-700">
          Logical Operators
        </h2>
        <p>
          Logical operators are used to combine multiple boolean expressions.
        </p>
        <pre className="bg-gray-200 p-4 rounded-md">
          <code>
            {`
bool a = true;
bool b = false;
bool andResult = a && b; // andResult is false
bool orResult = a || b; // orResult is true
bool notResult = !a; // notResult is false
            `}
          </code>
        </pre>

        <h2 className="text-2xl font-bold mt-8 text-sky-700">
          Assignment Operators
        </h2>
        <p>
          Assignment operators are used to assign values to variables. They also
          provide shorthand for common operations.
        </p>
        <pre className="bg-gray-200 p-4 rounded-md">
          <code>
            {`
int a = 10;
a += 5; // a is now 15
a -= 3; // a is now 12
a *= 2; // a is now 24
a /= 4; // a is now 6
a %= 3; // a is now 0
            `}
          </code>
        </pre>

        <h2 className="text-2xl font-bold mt-8 text-sky-700">
          Bitwise Operators
        </h2>
        <p>
          Bitwise operators are used to perform bit-level operations on data.
          These operators work on the binary representation of the operands.
        </p>
        <pre className="bg-gray-200 p-4 rounded-md">
          <code>
            {`
int a = 5; // binary: 0101
int b = 3; // binary: 0011
int andResult = a & b; // andResult is 1 (binary: 0001)
int orResult = a | b; // orResult is 7 (binary: 0111)
int xorResult = a ^ b; // xorResult is 6 (binary: 0110)
int notResult = ~a; // notResult is -6 (binary: ...1010)
int leftShift = a << 1; // leftShift is 10 (binary: 1010)
int rightShift = a >> 1; // rightShift is 2 (binary: 0010)
            `}
          </code>
        </pre>
      </div>

      <div className="mt-4">
        <button
          className="bg-sky-800 text-white px-4 py-2 rounded-md"
          onClick={downloadPDF}
        >
          Download PDF
        </button>
        {isButtonVisible && ( // Render the button only when text is highlighted
          <button
            className="bg-sky-800 text-white px-4 py-2 ml-2 rounded-md"
            onClick={undoHighlight}
          >
            Check Last Highlight and remove
          </button>
        )}
      </div>

      <p className="mt-4">Highlighted Text: {highlightedText}</p>

      {/* Unlock Next Level button */}
      <div className="mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={unlockNextLevel}
        >
          Take the quiz to Unlock Next Level
        </button>
      </div>
    </div>
  );
}
