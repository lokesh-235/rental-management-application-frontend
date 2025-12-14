import React from "react";
import "./sidebar.css";

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) {
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
          tenant profile
        </li>
      </ul>
    </aside>
  );
}
