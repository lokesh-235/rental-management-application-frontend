import React, { useState } from "react";
import "./owner-header.css";
import { logOut } from "../../../apis/apis";

export default function OwnerHeader({ user, onNav, activeView ,onMenu}) {
  const [menuOpen, setMenuOpen] = useState(false);

   function handleLogout() {
    sessionStorage.clear();
    logOut();
    window.location.href = "/login";
  }

  return (
    <header className="owner-header">
      <button className="menu-btn" onClick={onMenu}>☰</button>
      <div className="owner-brand">Owner Dashboard</div>

      <nav className="owner-nav">
        <button
          className={activeView === "properties" ? "active" : ""}
          onClick={() => onNav("properties")}
        >
          Properties
        </button>

        <button
          className={activeView === "tenants" ? "active" : ""}
          onClick={() => onNav("tenants")}
        >
          Tenants
        </button>

        <button
          className={activeView === "payments" ? "active" : ""}
          onClick={() => onNav("payments")}
        >
          Payments
        </button>

        <button
          className={activeView === "maintenance" ? "active" : ""}
          onClick={() => onNav("maintenance")}
        >
          Maintenance
        </button>

        <button
          className={activeView === "analytics" ? "active" : ""}
          onClick={() => onNav("analytics")}
        >
          Analytics
        </button>
      </nav>

      <div className="owner-user-section">
        <div className="owner-name">{user?.name}</div>

        <div
          className="owner-avatar"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {user?.userName?.[0]?.toUpperCase() || "U"}
        </div>

        {menuOpen && (
          <div className="owner-menu">
            <p className="owner-menu-item"><b>{user?.name}</b></p>
            <p className="owner-menu-item">{user?.email}</p>
            <div className="owner-menu-divider"></div>
            <button className="owner-menu-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
