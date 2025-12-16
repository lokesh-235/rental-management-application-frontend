import React from "react";
import "./sidebar.css";
import { logOut } from "../../../apis/apis";

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) {

  let handleLogout = () => {
    
    sessionStorage.clear();
    window.location.href = "/login";
  
  }

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h3>Dashboard</h3>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          ✕
        </button>
      </div>

      <ul className="sidebar-menu">
        <li
          className={activeTab === "recommended" ? "active" : ""}
          onClick={() => setActiveTab("recommended")}
        >
          Recommended
        </li>

        <li
          className={activeTab === "saved" ? "active" : ""}
          onClick={() => setActiveTab("saved")}
        >
          Saved Properties
        </li>

        <li
          className={activeTab === "current" ? "active" : ""}
          onClick={() => setActiveTab("current")}
        >
          Current Renting
        </li>

        <li
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Tenant Profile
        </li>

        <li
          className={activeTab === "requested-properties" ? "active" : ""}
          onClick={() => setActiveTab("requested-properties")}
        >
         Requested Properties
        </li>

        <button className='logoutBtn' onClick={handleLogout}>logout</button>
      </ul>
    </aside>
  );
}
