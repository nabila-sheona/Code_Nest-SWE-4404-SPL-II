import React, { useRef, useState } from "react";
import "./C.css";
import { downloadPDF } from "../utils/pdf";

export default function Conditions() {
  const pdfRef = useRef();

  const [highlightedText, setHighlightedText] = useState("");
  const [highlightedRanges, setHighlightedRanges] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const MAX_TEXT_LENGTH = 30;

  const unlockNextLevel = () => {
    window.location.href = "/ConQuiz";
  };

  const handleHighlight = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const rangeCount = selection.rangeCount;
    const ranges = [];

    for (let i = 0; i < rangeCount; i++) {
      const range = selection.getRangeAt(i);
      ranges.push({
        range,
        color: "yellow",
      });
    }

    setHighlightedRanges([...highlightedRanges, ...ranges]);
    setHighlightedText(selectedText);
    setIsButtonVisible(true);
  };

  const undoHighlight = () => {
    const lastHighlightedRange = highlightedRanges.pop();
    const lastHighlightedText = lastHighlightedRange.range.toString();
    const lastHighlightedColor = lastHighlightedRange.color;

    setHighlightedText(lastHighlightedText);
    setHighlightedRanges([...highlightedRanges]);

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

    document.execCommand("hiliteColor", false, lastHighlightedColor);
  };

  const handleUserTextChange = (e) => {
    const newText = e.target.value.slice(0, MAX_TEXT_LENGTH);
    setUserText(newText);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div
        className="max-w-screen-lg mx-auto px-4"
        id="pdfContent"
        onClick={handleHighlight}
      >
        <h1 className="text-3xl font-bold mb-8 text-sky-800">
          Conditions in C
        </h1>
        <p>
          Conditions in C are used to make decisions in the code. The most
          common conditional statements are <code>if</code>,{" "}
          <code>else if</code>, and <code>else</code>.
        </p>
        <p>
          The <code>if</code> statement executes a block of code if a specified
          condition is true. For example:
        </p>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`
int x = 10;
if (x > 0) {
    printf("x is positive");
}
`}
          </code>
        </pre>
        <p>
          The <code>else</code> statement executes a block of code if the
          condition in the <code>if</code> statement is false. For example:
        </p>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`
int x = -10;
if (x > 0) {
    printf("x is positive");
} else {
    printf("x is not positive");
}
`}
          </code>
        </pre>
        <p>
          The <code>else if</code> statement allows you to check multiple
          conditions. For example:
        </p>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`
int x = 0;
if (x > 0) {
    printf("x is positive");
} else if (x < 0) {
    printf("x is negative");
} else {
    printf("x is zero");
}
`}
          </code>
        </pre>
        <p>
          The <code>switch</code> statement allows you to select one of many
          code blocks to be executed. For example:
        </p>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`
int day = 4;
switch (day) {
    case 1:
        printf("Monday");
        break;
    case 2:
        printf("Tuesday");
        break;
    case 3:
        printf("Wednesday");
        break;
    case 4:
        printf("Thursday");
        break;
    case 5:
        printf("Friday");
        break;
    case 6:
        printf("Saturday");
        break;
    case 7:
        printf("Sunday");
        break;
    default:
        printf("Invalid day");
}
`}
          </code>
        </pre>
        <p>
          Understanding conditions is fundamental for controlling the flow of
          your programs and making decisions based on different criteria. Here's
          a brief overview of logical operators used in conditions:
        </p>
        <ul className="list-disc list-inside">
          <li>
            <code>&&</code> (Logical AND): Returns true if both operands are
            true.
          </li>
          <li>
            <code>||</code> (Logical OR): Returns true if at least one of the
            operands is true.
          </li>
          <li>
            <code>!</code> (Logical NOT): Returns true if the operand is false.
          </li>
        </ul>
        <p>Example of logical operators:</p>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`
int x = 5;
int y = 10;
if (x > 0 && y > 0) {
    printf("Both x and y are positive");
}
if (x > 0 || y < 0) {
    printf("At least one of x or y is positive");
}
if (!(x < 0)) {
    printf("x is not negative");
}
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
        {isButtonVisible && (
          <button
            className="bg-sky-800 text-white px-4 py-2 ml-2 rounded-md"
            onClick={undoHighlight}
          >
            Check Last Highlight and remove
          </button>
        )}
      </div>

      <p className="mt-4">Highlighted Text: {highlightedText}</p>

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
