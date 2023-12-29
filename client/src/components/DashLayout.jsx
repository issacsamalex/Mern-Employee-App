import { Outlet } from "react-router-dom";
import React from "react";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="dash-container">
        <Outlet />
      </div>
    </>
  );
};

export default DashLayout;
