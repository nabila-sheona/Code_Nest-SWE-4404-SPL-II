import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./C.css";
import { downloadPDF } from "../utils/pdf";

export default function ForLoop() {
  const pdfRef = useRef();

  const [highlightedText, setHighlightedText] = useState("");
  const [highlightedRanges, setHighlightedRanges] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const MAX_TEXT_LENGTH = 30;

  const unlockNextLevel = () => {
    window.location.href = "/for-loopsQuiz";
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
        <h1 className="text-3xl font-bold mb-8 text-sky-800">For Loop in C</h1>
        <p>
          The <code>for</code> loop in C is a control flow statement that allows
          code to be executed repeatedly based on a given Boolean condition. The{" "}
          <code>for</code> loop is useful when you know beforehand how many
          times you want to execute a statement or a block of statements.
        </p>
        <h3 className="text-xl font-semibold mb-2">Syntax</h3>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`for (initialization; condition; increment/decrement) {
    // statements
}`}
          </code>
        </pre>
        <p className="mb-4">
          - <strong>Initialization:</strong> This step is executed first and
          only once. It allows you to declare and initialize any loop control
          variables.
          <br />- <strong>Condition:</strong> This is the second step that is
          evaluated before each iteration of the loop. If the condition is true,
          the loop statements execute. If it is false, the loop terminates.
          <br />- <strong>Increment/Decrement:</strong> This is executed after
          the body of the loop and updates the loop control variable.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Example 1: Simple For Loop
        </h3>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`#include <stdio.h>

int main() {
    for (int i = 0; i < 5; i++) {
        printf("Value of i: %d\\n", i);
    }
    return 0;
}`}
          </code>
        </pre>
        <p className="mb-4">
          Output:
          <pre className="bg-gray-100 p-2">
            {`Value of i: 0
Value of i: 1
Value of i: 2
Value of i: 3
Value of i: 4`}
          </pre>
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Example 2: Nested For Loop
        </h3>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`#include <stdio.h>

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            printf("(%d, %d)\\n", i, j);
        }
    }
    return 0;
}`}
          </code>
        </pre>
        <p className="mb-4">
          Output:
          <pre className="bg-gray-100 p-2">
            {`(1, 1)
(1, 2)
(1, 3)
(2, 1)
(2, 2)
(2, 3)
(3, 1)
(3, 2)
(3, 3)`}
          </pre>
        </p>

        <p className="font-semibold rounded-md keyword-box border border-gray-300 p-4 bg-gray-300 mb-4">
          {" "}
        </p>
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
