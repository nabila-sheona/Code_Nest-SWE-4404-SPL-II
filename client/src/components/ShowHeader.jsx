import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowHeader = ({ children }) => {
  const location = useLocation();
  const [ShowHeader, setShowHeader] = useState(false);

  useEffect(() => {
    if (location.pathname === "/sign-in" || "/" || "/sign-up") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location]);

  return <div>{ShowHeader && children}</div>;
};

export default ShowHeader;
