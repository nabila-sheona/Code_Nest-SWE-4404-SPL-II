// src/components/Layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SecondaryHeader from "./SecondaryHeader";

const Layout = () => {
  const location = useLocation();
  const excludeHeaderPaths = ["/sign-in", "/sign-up"];
  const shouldShowSecondaryHeader = excludeHeaderPaths.includes(location.pathname);

  console.log("Current Path:", location.pathname);
  console.log("Show Secondary Header:", shouldShowSecondaryHeader);

  return (
    <div>
      {shouldShowSecondaryHeader ? <SecondaryHeader /> : <Header />}
      <Outlet />
    </div>
  );
};

export default Layout;
