import React, { useState } from "react";
import "./tenant-dashboard.css";
import Sidebar from "./Sidebar/sidebar";
import RecommendedProperties from "./main-content/recommended-properties/RecommendedProperties";
import SavedProperties from "./main-content/saved-properties/saved-properties";
import CurrentRentals from "./main-content/current-rentals/current-rentals";
import TenantProfile from "./main-content/tenant-profile/tenant-profile";


export default function TenantDashboard() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState("recommended");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="tenant-dashboard">

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main
        className={`main-content ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {/* Header */}
        <div className="tenant-header">
          {!sidebarOpen && (
            <button
              className="menu-btn"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
          )}

          <h2>Tenant Dashboard</h2>

          <div
            className="user-icon"
            onClick={() => {setActiveTab("profile");setSidebarOpen(true)}}
            title="View Profile"
          >
              {user.userName.charAt(0).toUpperCase()}
          </div>

        </div>

        {/* Switch Sections */}
        {activeTab === "recommended" && <RecommendedProperties />}
        {activeTab === "saved" && <SavedProperties />}
        {activeTab === "current" && <CurrentRentals />}
        {activeTab === "profile" && <TenantProfile />}
      </main>
    </div>
  );
}
