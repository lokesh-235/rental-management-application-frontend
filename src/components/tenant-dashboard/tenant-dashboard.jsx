import React, { useState } from "react";
import "./tenant-dashboard.css";
import Properties from "../properties/properties";
import SearchForm from "../search-form/search-form";

export default function TenantDashboard() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  let logOut = async () => {
    let res = await fetch("http://localhost:8080/api/users/logout",{
      method : "POST"
    })
  }

  function logout() {
    logOut();
    sessionStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="tenant-page">
      
      {/* Top Bar */}
      <div className="tenant-header">
        <h2>Tenant Dashboard</h2>

        <div className="user-icon-area">
          <div className="user-icon" onClick={() => setMenuOpen(!menuOpen)}>
            {user.userName.charAt(0).toUpperCase()}
          </div>

          {menuOpen && (
            <div className="dropdown-menu">
              <p><strong>{user.userName}</strong></p>
              <p>Role: {user.role}</p>
              <hr />
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Search Section */}
      <SearchForm />

      {/* Saved Properties */}
      <section className="section">
        <h3>Saved Properties</h3>
        {/* <Properties/>  */}
      </section>

      {/* Current Renting Property */}
      <section className="section">
        <h3>Current Renting</h3>

        <div className="rent-box">
          <h4>Flat A-202, Skyline Residency</h4>
          <p><b>Monthly Rent:</b> ₹12,000</p>
          <p><b>Due Date:</b> 5th of every month</p>
          <button className="pay-btn">Pay Rent</button>
        </div>
      </section>

      {/* Recommended */}
      <section className="section">
        <h3>Recommended For You</h3>
        <Properties />
      </section>

      {/* Footer */}
      <footer>
        <div className="container text-center">
          &copy; 2025 Rental Management. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
