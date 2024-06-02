import React from 'react';
import { Link } from "react-router-dom";
import './TheEnd.css';

const TheEnd = () => {
  return (
    <div className="the-end">
      <div className="container">
        <h1>Congratulations!</h1>
        <p>You have successfully completed the course.</p>
        <Link to="/home" className="home-button">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default TheEnd;
