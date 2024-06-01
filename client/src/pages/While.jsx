import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./C.css";
import { downloadPDF } from "../utils/pdf";

export default function WhileLoop() {
  const pdfRef = useRef();

  const [highlightedText, setHighlightedText] = useState("");
  const [highlightedRanges, setHighlightedRanges] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const MAX_TEXT_LENGTH = 30;

  const unlockNextLevel = () => {
    window.location.href = "/while-loopsQuiz";
  };

  useEffect(() => {
    if (location.pathname === "/while-loops") {
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
          While Loop in C
        </h1>
        <p>
          The <code>while</code> loop in C is a control flow statement that
          executes a block of code repeatedly as long as a specified condition
          is true. It is used when the number of iterations is not known
          beforehand.
        </p>
        <h3 className="text-xl font-semibold mb-2">Syntax</h3>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`while (condition) {
    // statements
}`}
          </code>
        </pre>
        <p className="mb-4">
          - <strong>Condition:</strong> This is the expression to be evaluated.
          If the condition is true, the loop statements execute. If it is false,
          the loop terminates.
        </p>

        <h3 className="text-xl font-semibold mb-2">Example</h3>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`#include <stdio.h>

int main() {
    int count = 1;
    while (count <= 5) {
        printf("Count: %d\\n", count);
        count++;
    }
    return 0;
}`}
          </code>
        </pre>
        <p className="mb-4">
          Output:
          <pre className="bg-gray-100 p-2">
            {`Count: 1
Count: 2
Count: 3
Count: 4
Count: 5`}
          </pre>
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
