import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./HelloWorld.css";
import { downloadPDF } from "../utils/pdf";
import { useSelector } from 'react-redux';

export default function HelloWorld() {
  const pdfRef = useRef();
  const [highlightedText, setHighlightedText] = useState("");
  const [highlightedRanges, setHighlightedRanges] = useState([]);
  const [userText, setUserText] = useState("Hello, world!");
  const [isButtonVisible, setIsButtonVisible] = useState(false); // State variable to track button visibility
  const MAX_TEXT_LENGTH = 30;
  const location = useLocation();

  const [currentLevel, setCurrentLevel] = useState(0);

  const { currentUser } = useSelector((state) => state.user);
  const courseName = 'C Programming';
  const courseTopic = 'helloworld';

 const fetchUserLevel = async () => {
    try {
        // Corrected to handle spaces in the course name using encodeURIComponent
        const url = `/api/course/user-level/${encodeURIComponent(courseName)}/${currentUser.username}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch user level');
        }
        const data = await response.json();
        // Assuming data directly returns the level
        setCurrentLevel(data);
    } catch (error) {
        console.error('Error fetching user level:', error);
    }
};

useEffect(() => {
    if (currentUser && currentUser.username && courseName) {
        fetchUserLevel();
    }
}, [currentUser, courseName]); // Dependency array includes currentUser and courseName


  const NextLevel = () => {
    //variable the fetchUserLevel and check if level >=1
    window.location.href = "/variables";
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
        window.location.href = "/variables";
        alert("You have successfully moved to next level of the course!");
      } else {
        console.error("Failed to unlock next level");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.username && courseName) {
      fetchUserLevel();
    }
  }, [currentUser, courseName]);

  useEffect(() => {
    if (location.pathname === "/hello-world") {
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

  const handleUserTextChange = (e) => {
    const newText = e.target.value.slice(0, MAX_TEXT_LENGTH);
    setUserText(newText);
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-5xl font-bold mb-8 text-sky-800">Hello, World!</h1>
      <div
        className="max-w-screen-lg mx-auto px-4"
        id="pdfContent"
        onClick={handleHighlight}
      >
        <h1 className="text-3xl font-bold mb-8 text-sky-800">Introduction</h1>

        <p>
          The "Hello, world!" program holds a special place in the realm of
          computer programming. While seemingly trivial, its significance
          extends far beyond its modest output. As one embarks on the journey of
          learning C programming, the creation of this foundational program
          marks a pivotal moment, symbolizing the initiation into a world of
          logic, syntax, and problem-solving.
        </p>
        <p>
          With anticipation and trepidation, the novice programmer opens their
          preferred text editor and begins to transcribe the cryptic symbols
          that constitute the C programming language. With each keystroke, the
          compiler awaits, ready to transform the abstract constructs into
          executable instructions.
        </p>
        <p>
          The lines of code take shape, guided by the principles of structure
          and syntax. With precision, the programmer assembles the components of
          the program, encapsulating the essence of the task at hand. At the
          heart of it all lies the fundamental directive:
        </p>

        <div className="bg-gray-300 p-4 rounded-md mt-8">
          <pre className="text-gray-700">
            <code>
              {`
#include <stdio.h>

int main() {
    printf("${userText}\\n"); // Updated to use userText variable
    return 0;
}
            `}
            </code>
          </pre>
        </div>

        <p className="mt-8">The output comes out to:</p>

        <div className="bg-gray-300 p-4 rounded-md">
          <p className="text-gray-700 font-medium">{userText}</p>
        </div>
        <p className="mt-4 text-center font-semibold font-sans text-blue-900">
          You can customize your own message!
        </p>
      </div>

      <div className="mt-4 ">
        <label htmlFor="userText" className="mr-2 ">
          Customize Message:
        </label>
        <input
          className="bg-gray-500 text-white rounded-lg p-4"
          type="text"
          id="userText"
          value={userText}
          onChange={handleUserTextChange}
        />
        {userText.length >= MAX_TEXT_LENGTH && (
          <label className="text-red-500 ml-2">
            Cannot exceed {MAX_TEXT_LENGTH} characters
          </label>
        )}
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
        { currentLevel < 1 ? (
          
          <button
            className="bg-sky-800 text-white px-4 py-2 rounded-md"
            onClick={unlockNextLevel}
          >
            Unlock Next Level
          </button>
        ):<button
        className="bg-sky-800 text-white px-4 py-2 rounded-md"
        onClick={NextLevel}
      >
         Next Level
      </button> }
      </div>
    </div>
  );
}
