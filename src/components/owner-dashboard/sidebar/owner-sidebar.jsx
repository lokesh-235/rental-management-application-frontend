import React from "react";
import "./owner-sidebar.css";

export default function OwnerSidebar({
  activeView,
  setActiveView,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <aside className={`owner-sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h3>Owner Panel</h3>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          ✕
        </button>
      </div>

      <ul className="sidebar-menu">
        <li className={activeView === "overview" ? "active" : ""}
            onClick={() => setActiveView("overview")}>
          🏠 Overview
        </li>

        <li className={activeView === "properties" ? "active" : ""}
            onClick={() => setActiveView("properties")}>
          🏡 Manage Properties
        </li>

        <li className={activeView === "requests" ? "active" : ""}
            onClick={() => setActiveView("requests")}>
          📩 Tenant Requests
        </li>

        <li className={activeView === "tenants" ? "active" : ""}
            onClick={() => setActiveView("tenants")}>
          👥 Tenants
        </li>

        <li className={activeView === "payments" ? "active" : ""}
            onClick={() => setActiveView("payments")}>
          💰 Payments
        </li>

        <li className={activeView === "maintenance" ? "active" : ""}
            onClick={() => setActiveView("maintenance")}>
          🛠 Maintenance
        </li>

        <li className={activeView === "analytics" ? "active" : ""}
            onClick={() => setActiveView("analytics")}>
          📊 Analytics
        </li>
      </ul>
    </aside>
  );
}
