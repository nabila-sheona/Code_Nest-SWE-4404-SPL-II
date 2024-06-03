import React, { useRef, useState, useEffect } from "react";
import "./C.css";
import { downloadPDF } from "../utils/pdf";

export default function Strings() {
  const pdfRef = useRef();

  const [highlightedText, setHighlightedText] = useState("");
  const [highlightedRanges, setHighlightedRanges] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const MAX_TEXT_LENGTH = 30;

  const unlockNextLevel = () => {
    window.location.reload();
    window.location.href = "/StringsQuiz";
  };

  useEffect(() => {
    if (location.pathname === "/strings") {
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
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-sky-300 to-white-500 min-h-screen ">
      <div
        className="max-w-screen-lg mx-auto px-4"
        id="pdfContent"
        onClick={handleHighlight}
      >
        <h1 className="text-3xl font-bold mb-8 text-sky-800">
          Working with Strings
        </h1>
        <p>
          In programming, a string is a sequence of characters used to represent
          text. Strings are one of the most commonly used data types in many
          programming languages, including C.
        </p>
        <p>
          In C, strings are represented as arrays of characters terminated by a
          null character <code>'\0'</code>. Here's an example of how to declare
          and initialize a string in C:
        </p>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`
char greeting[] = "Hello, world!";
`}
          </code>
        </pre>
        <p>
          You can also use the <code>printf()</code> function to display strings
          on the screen:
        </p>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`
printf("%s", greeting);
`}
          </code>
        </pre>
        <p>
          C provides several functions for working with strings, such as{" "}
          <code>strlen()</code> to find the length of a string,{" "}
          <code>strcpy()</code> to copy one string to another, and{" "}
          <code>strcat()</code> to concatenate two strings. Here's an example
          using these functions:
        </p>
        <pre className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <code>
            {`
#include <stdio.h>
#include <string.h>

int main() {
    char str1[20] = "Hello";
    char str2[20] = "World";

    printf("Length of str1: %d\\n", strlen(str1));
    printf("Concatenated string: %s\\n", strcat(str1, str2));
    printf("Copied string: %s\\n", strcpy(str2, str1));

    return 0;
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
