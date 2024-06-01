import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./HelloWorld.css"; // Import CSS for styling
import { downloadPDF } from "../utils/pdf";

export default function Variables() {
  const pdfRef = useRef();
  const [highlightedText, setHighlightedText] = useState("");
  const [highlightedRanges, setHighlightedRanges] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(false); // State variable to track button visibility
  const location = useLocation();

  useEffect(() => {
    const chatbotContainer = document.getElementById(
      "chatbase-chatbot-container"
    );

    if (location.pathname === "/variables") {
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

      if (chatbotContainer) {
        chatbotContainer.style.display = "block";
      }

      return () => {
        document.body.removeChild(scriptConfig);
        document.body.removeChild(scriptEmbed);

        if (chatbotContainer) {
          chatbotContainer.style.display = "none";
        }
      };
    } else {
      if (chatbotContainer) {
        chatbotContainer.style.display = "none";
      }
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
    //selection.removeAllRanges(); // Clear the selection
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

  const unlockNextLevel = () => {
    window.location.href = "/Quiz";
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      id="pdfContent"
    >
      <h1 className="text-5xl font-bold mb-8 text-sky-800">
        Variables & Types
      </h1>

      <div className="max-w-screen-lg mx-auto px-4" onClick={handleHighlight}>
        <h1 className="text-3xl font-bold mb-8 text-sky-800">Introduction</h1>

        <section>
          <section>
            <h3 className="font-semibold">Character Set</h3>
            <p className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
              The C language uses a character set that includes alphabets,
              letters, and some special characters.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">Alphabets</h3>
            <p className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
              Both uppercase (A-Z) and lowercase (a-z) alphabets are allowed for
              variables and functions.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">Digits</h3>
            <p className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
              Digits from 0 to 9 are part of the valid character set.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">Special Characters</h3>
            <p className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
              A limited set of special characters is allowed, including
              punctuation marks, brackets, mathematical symbols, and control
              characters.
            </p>
            <ul className="rounded-md keyword-box border border-gray-300 p-2 bg-gray-300">
              <li>, &lt; &gt; . _</li>
              <li>( ) ; $ : </li>
              <li>% [ ] # ?</li>
              <li>' &amp; " </li>
              <li>^ ! * / |</li>
              <li>- \ ~ +</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold">White Space Characters</h3>
            <p className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
              These include spaces, newlines, horizontal tabs.
            </p>
          </section>
        </section>

        <h2 className="font-semibold">C Keywords</h2>
        <p>
          Keywords are reserved words with specific meanings to the compiler.
          They define the language's syntax and cannot be used as identifiers
          (variable names, etc.).
        </p>

        <div className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
          <ul>
            <p>
              <p className="font-semibold">auto:</p> Declares automatic
              variables (e.g., auto int var1;)
            </p>
            <p>
              <p className="font-semibold">break:</p> Terminates loops and
              switch statements
            </p>
            <p>
              <p className="font-semibold">case:</p> Marks code blocks within
              switch statements
            </p>
            <p>
              <p className="font-semibold">char:</p> Declares character data
              type
            </p>
          </ul>
        </div>

        <section>
          <h2 className="font-semibold">C Identifiers</h2>
          <p className="rounded-md keyword-box border border-gray-300 p-4 bg-gray-300">
            Identifiers are user-defined names given to variables, functions,
            structures, and other entities in your C code.
          </p>
        </section>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          className="bg-sky-800 text-white px-4 py-2 rounded-md mr-2"
          onClick={downloadPDF}
        >
          Download PDF
        </button>
        {isButtonVisible && (
          <button
            className="bg-sky-800 text-white px-4 py-2 rounded-md"
            onClick={undoHighlight}
          >
            Check Last Highlight and Remove
          </button>
        )}
      </div>

      <p className="mt-4">Highlighted Text: {highlightedText}</p>

      <div className="mt-4 text-center">
        <Link
          to="/variablesquiz"
          className="btn bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Take the quiz to Unlock Next Level
        </Link>
      </div>
    </div>
  );
}
