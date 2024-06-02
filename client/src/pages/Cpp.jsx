import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Cpp() {
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // Default to false to check registration
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const checkRegistration = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(
            `/api/course/check-registration/${currentUser.username}`
          );
          setIsRegistered(response.data.isRegistered);
        } catch (error) {
          setError(
            error.response?.data?.message || "Failed to check registration."
          );
        }
      }
    };

    checkRegistration();
  }, [currentUser]);

  const registerCourse = async () => {
    const courseData = {
      courseName: "Cpp",
      username: currentUser ? currentUser.username : "Guest",
      level: 0,
      hasStarted: true,
    };

    try {
      await axios.post("/api/course/register-course", courseData, {
        withCredentials: true,
      });
      alert("You have successfully started the course!");
      setIsRegistered(true);
      setError("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error registering course. Please try again later.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-sky-200 to-white-450 min-h-screen ">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">C++</h1>
      <p className="text-xl mb-8">
        C++ is a powerful general-purpose programming language. It can be used
        to create small programs or large applications. This course will guide
        you through the basics of C++ and its applications.
      </p>
      <p className="text-xl mb-8">
        The course is designed to introduce you to the essential concepts of C++
        programming including syntax, data structures, and algorithms. By the
        end of this course, you will have a strong foundation in C++ and be able
        to build your own applications.
      </p>

      {!isRegistered && (
        <Link
          onClick={registerCourse}
          to="/topics_for_cpp"
          style={{
            backgroundColor: "#007BFF", // Blue shade
            border: "none",
            color: "white",
            padding: "24px 48px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "28px",
            borderRadius: "12px",
            cursor: "pointer",
          }}
          className="btn"
        >
          Enter Course
        </Link>
      )}

      {isRegistered && (
        <Link
          to="/topics_for_cpp"
          style={{
            backgroundColor: "#007BFF", // Blue shade
            border: "none",
            color: "white",
            padding: "24px 48px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "28px",
            borderRadius: "12px",
            cursor: "pointer",
          }}
          className="btn"
        >
          Continue Course
        </Link>
      )}

      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
}
