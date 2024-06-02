import React from "react";

const ProgressBar = ({ progress }) => {
  const containerStyles = {
    height: 35, // Increased height
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: "20px 0",
    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.1)",
  };

  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundImage:
      progress > 50
        ? "linear-gradient(to right, #4caf50, #81c784)"
        : "linear-gradient(to right, #f44336, #e57373)",
    borderRadius: "inherit",
    textAlign: "right",
    transition: "width 0.2s ease-in",
    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${progress.toFixed(3)}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
