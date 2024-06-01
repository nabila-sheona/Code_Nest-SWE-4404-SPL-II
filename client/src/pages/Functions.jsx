import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./C.css";
import { downloadPDF } from "../utils/pdf";

export default function Functions() {
  const pdfRef = useRef();

  const [highlightedText, setHighlightedText] = useState("");
  const [highlightedRanges, setHighlightedRanges] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const MAX_TEXT_LENGTH = 30;

  const unlockNextLevel = () => {
    window.location.href = "/functionsQuiz";
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
        <h1 className="text-3xl font-bold mb-8 text-sky-800">Functions in C</h1>
        <p>
          Functions in C are a way to encapsulate a piece of code that performs
          a specific task. A function typically takes some input, processes it,
          and returns a result. Functions help in organizing and managing code,
          making it reusable and easier to debug.
        </p>
        <h3 className="text-xl font-semibold mb-2">Syntax</h3>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`returnType functionName(parameter1, parameter2, ...) {
    // Function body
}`}
          </code>
        </pre>
        <p className="mb-4">
          - <strong>returnType:</strong> The data type of the value the function
          returns. Use <code>void</code> if the function does not return a
          value.
          <br />- <strong>functionName:</strong> The name of the function.
          <br />- <strong>parameters:</strong> A list of parameters the function
          accepts. Separate multiple parameters with commas.
        </p>

        <h3 className="text-xl font-semibold mb-2">Example</h3>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`#include <stdio.h>

// Function declaration
int add(int a, int b);

int main() {
    int sum;
    sum = add(5, 3); // Function call
    printf("Sum: %d\\n", sum);
    return 0;
}

// Function definition
int add(int a, int b) {
    return a + b;
}`}
          </code>
        </pre>
        <p className="mb-4">
          Output:
          <pre className="bg-gray-100 p-2">{`Sum: 8`}</pre>
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
