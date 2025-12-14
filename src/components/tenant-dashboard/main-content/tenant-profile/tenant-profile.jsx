import React from "react";
import "./tenant-profile.css";

export default function TenantProfile() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <section className="tenant-profile">
      <h3>Tenant Details</h3>

      <div className="profile-card">
        <p><b>Name:</b> {user.userName}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>
    </section>
  );
}
