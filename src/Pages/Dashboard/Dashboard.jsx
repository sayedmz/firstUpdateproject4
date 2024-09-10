import React from "react";
import TopBar from "../../Components/Dashboard/TopBar";
import SideBar from "../../Components/Dashboard/SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="position-relative dashboard ">
      <TopBar />
      <div className="d-flex gap-1" style={{ marginTop: "70px" }}>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
