import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Cpp() {
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);
  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    const checkRegistration = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(`/api/course/check-registration/${currentUser.username}`);
          setIsRegistered(response.data.isRegistered);
        } catch (error) {
          setError(error.response?.data?.message || 'Failed to check registration.');
        }
      }
    };

    checkRegistration();
  }, [currentUser]);

  const registerCourse = async () => {
    const courseData = {
      courseName: 'Cpp',
      username: currentUser ? currentUser.username : 'Guest',
      level: 0,
      hasStarted: true,
    };

    try {
      await axios.post('/api/course/register-course', courseData, {
        withCredentials: true,
      });
      alert('You have successfully started the course!');
      setIsRegistered(true);
      setError('');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error registering course. Please try again later.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-20 lg:px-32 xl:px-48">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
        C++
      </h1>


      {isRegistered &&

        <Link to="/topics" style={{
          backgroundColor: "#007BFF",
          border: "none",
          color: "white",
          padding: "24px 48px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "28px",
          borderRadius: "12px",
          cursor: "pointer",
        }} className="btn">
          Check topics
        </Link>}

      <Link onClick={registerCourse} style={{
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
      }} className="btn">
        Enter Course
      </Link>
      {error && <p className="text-red-700">{error}</p>}
     

      {isRegistered &&
        <Link to="/topics" style={{
          backgroundColor: "#007BFF",
          border: "none",
          color: "white",
          padding: "24px 48px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "28px",
          borderRadius: "12px",
          cursor: "pointer",
        }} className="btn">
          Check topics
        </Link>}
        



     
    </div>
  );
}
