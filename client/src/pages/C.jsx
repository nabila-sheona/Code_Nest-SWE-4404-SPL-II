import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function C() {
  const [completedLevels, setCompletedLevels] = useState([]);
  const [courseStarted, setCourseStarted] = useState(false);

  useEffect(() => {
    // Fetch data from backend server to check if the user is enrolled
    fetch("/api/isEnrolled?userId=123") // Replace '123' with the actual user ID
      .then((response) => response.json())
      .then((data) => {
        setCourseStarted(data.isEnrolled);
      })
      .catch((error) => {
        console.error("Error fetching enrollment status:", error);
      });
  }, []);

  const startLearning = () => {
    fetch("/api/startLearning", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: "123" }), // Replace '123' with the actual user ID
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCourseStarted(true);
          setCompletedLevels([]);
        }
      })
      .catch((error) => {
        console.error("Error starting learning:", error);
      });
  };
  const isLevelUnlocked = (levelPath) => {
    const levelIndex = levels.findIndex((l) => l.path === levelPath);
    return (
      levelIndex === 0 || completedLevels.includes(levels[levelIndex - 1].path)
    );
  };

  const completeLevel = (levelPath) => {
    if (!completedLevels.includes(levelPath)) {
      setCompletedLevels([...completedLevels, levelPath]);
    }
  };

  const levels = [
    { path: "/hello-world", title: "Hello World" },
    { path: "/variables", title: "Variables and Data Types" },
    { path: "/arrays", title: "Array" },
    { path: "/multidimensional-arrays", title: "Operators" },
    { path: "/conditions", title: "Flow Control" },
    { path: "/strings", title: "Functions" },
    { path: "/for-loops", title: "Arrays" },
    { path: "/while-loops", title: "Pointers" },
    { path: "/LearnC/function", title: "Structures" },
    { path: "/LearnC/static", title: "File I/O" },
  ];

  if (!courseStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="max-w-screen-lg mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-sky-800">WELCOME!</h1>
          <p>Welcome to the Code_Nest free interactive C tutorial.</p>
          <p>
            Whether you are an experienced programmer or not, this website is
            intended for everyone who wishes to learn the C programming
            language.
          </p>
          <p>
            There is no need to download anything - Just click on the chapter
            you wish to begin from, and follow the instructions. Good luck!
          </p>
          <p>
            Code_Nest is still under construction - If you wish to contribute
            tutorials, please click on Contributing Tutorials down below.
          </p>
          <div
            className="max-w-2xl px-4"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <Link
              to="/c-foreword"
              style={{
                backgroundColor: "#007BFF", // Blue shade
                border: "none",
                color: "white",
                padding: "20px 40px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "24px",
                borderRadius: "12px",
                cursor: "pointer",
              }}
              className="btn"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="max-w-screen-lg mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-sky-800">
          Learn the Basics
        </h1>
        <div className="max-w-2xl px-4">
          <div className="flex flex-col gap-4">
            {/* List of topics */}
            <ul className="list-disc list-inside">
              {levels.map((level, index) => (
                <li key={index}>
                  {isLevelUnlocked(level.path) ? (
                    <Link
                      to={level.path}
                      className="btn"
                      onClick={() => completeLevel(level.path)}
                    >
                      {level.title}
                    </Link>
                  ) : (
                    <span className="btn-disabled">{level.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
