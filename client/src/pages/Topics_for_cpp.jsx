import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "./ProgressBar"; // Import the ProgressBar component

export default function Topics_for_cpp() {
  const [topics, setTopics] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [loading, setLoading] = useState(true);

  const predefinedTopics = [
    { name: "Hello, World!", link: "/h_worldcpp", levelRequired: 0 },
    { name: "Variables and Types", link: "/variables_cpp", levelRequired: 1 },
    { name: "Arrays", link: "/arraycpp", levelRequired: 2 },
    { name: "Operators", link: "/operatorscpp", levelRequired: 3 },
    { name: "Conditions", link: "/conditionscpp", levelRequired: 4 },
    { name: "Strings", link: "/stringscpp", levelRequired: 5 },
    { name: "For Loops", link: "/for-loopscpp", levelRequired: 6 },
    { name: "While Loops", link: "/while-loopscpp", levelRequired: 7 },
    { name: "Functions", link: "/functionscpp", levelRequired: 8 },
  ];

  const { currentUser, error } = useSelector((state) => state.user);
  const courseName = "Cpp";

  const fetchUserLevel = async () => {
    try {
      const url = `/api/course/user-level/${encodeURIComponent(courseName)}/${
        currentUser.username
      }`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch user level");
      }
      const data = await response.json();
      setCurrentLevel(data);
    } catch (error) {
      console.error("Error fetching user level:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.username && courseName) {
      fetchUserLevel();
    }
  }, [currentUser, courseName]);

  useEffect(() => {
    const unlockedTopics = predefinedTopics.map((topic) => ({
      ...topic,
      isUnlocked: topic.levelRequired <= currentLevel,
    }));
    setTopics(unlockedTopics);
  }, [currentLevel]);
  const totalLevels = predefinedTopics.length;
  const unlockedLevels = currentLevel + 1; // Assuming level starts at 0
  const progressPercentage = Math.min(
    (unlockedLevels / totalLevels) * 100,
    100
  ); // Calculate the progress percentage

  return (
    <div className="bg-gradient-to-br from-sky-300 to-white-500">
      <div className="p-3 max-w-lg mx-auto min-h-screen">
        <h1 className="text-5xl font-bold text-center my-7 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-green-800">
          Topics for CPP
        </h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <div className="text-center text-xl font-semibold mb-4">
              Current User Level: {currentLevel}
            </div>
            <div className="mb-4">
              <ProgressBar progress={progressPercentage} />
            </div>
            <ul className="list-disc pl-5">
              {topics.map((topic, index) => (
                <li
                  key={index}
                  className={`text-indigo-900 hover:text-gray-500 ${
                    !topic.isUnlocked ? "opacity-50" : ""
                  } flex items-center`}
                >
                  {topic.isUnlocked ? (
                    <Link to={topic.link} className="flex items-center">
                      {index + 1}. {topic.name}{" "}
                      <FontAwesomeIcon icon={faUnlock} className="ml-2" />
                    </Link>
                  ) : (
                    <span className="flex items-center">
                      {index + 1}. {topic.name}{" "}
                      <FontAwesomeIcon icon={faLock} className="ml-2" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
