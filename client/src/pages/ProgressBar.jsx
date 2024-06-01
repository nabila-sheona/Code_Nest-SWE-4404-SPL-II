import React from "react";

const ProgressBar = ({ progress }) => {
  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: "20px 0",
  };

  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: progress > 50 ? "#4caf50" : "#f44336",
    borderRadius: "inherit",
    textAlign: "right",
    transition: "width 0.2s ease-in",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
