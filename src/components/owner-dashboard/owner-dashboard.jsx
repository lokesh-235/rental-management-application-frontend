import React, { useState } from "react";
import OwnerHeader from "./owner-header/owner-header";
import "./owner-dashboard.css";
import OwnerProperties from "./owner-properties/owner-properties";
import TenantRequests from "./tenant-requests/tenant-requests";
import Tenants from "./tenants/tenants";
export default function OwnerDashboard() {

  const user = JSON.parse(sessionStorage.getItem("user"));

  const [view, setView] = useState("overview");

  return (
    <div className="owner-dashboard">

      <OwnerHeader user={user} onNav={setView} activeView={view} />

      <div className="owner-dashboard-body">

        {/* Sidebar */}
        <aside className="owner-sidebar">
          <button className={view === "overview" ? "active" : ""} onClick={() => setView("overview")}>🏠 Overview</button>
          <button className={view === "properties" ? "active" : ""} onClick={() => setView("properties")}>🏡 Manage Properties</button>
          <button className={view === "requests" ? "active" : ""} onClick={() => setView("requests")}>Tenant requests</button>
          <button className={view === "tenants" ? "active" : ""} onClick={() => setView("tenants")}>👥 Tenants</button>
          <button className={view === "payments" ? "active" : ""} onClick={() => setView("payments")}>💰 Payments</button>
          <button className={view === "maintenance" ? "active" : ""} onClick={() => setView("maintenance")}>🛠 Maintenance</button>
          <button className={view === "analytics" ? "active" : ""} onClick={() => setView("analytics")}>📊 Analytics</button>
        </aside>

        {/* Main Content */}
        <main className="owner-main">
          {view === "overview" && <Overview />}
          {view === "properties" && <OwnerProperties owner={user}/>}
          {view === "requests" && <TenantRequests owner={user}/>}
          {view === "tenants" && <Tenants owner={user}/>}
          {view === "payments" && <Payments />}
          {view === "maintenance" && <Maintenance />}
          {view === "analytics" && <Analytics />}
        </main>
        {/* <h1>{JSON.stringify(user)}</h1> */}
      </div>
    </div>
  );
}

// ------- Dummy Components for now ---------
const Overview = () => (
  <div className="section-card">
    <h2>Dashboard Overview</h2>
    <p>This is where analytics & summary appears.</p>
  </div>
);



const Payments = () => (
  <div className="section-card">
    <h2>Rent Payments</h2>
    <p>Track earnings & due payments.</p>
  </div>
);

const Maintenance = () => (
  <div className="section-card">
    <h2>Maintenance Requests</h2>
    <p>Tenant complaints and repair tickets.</p>
  </div>
);

const Analytics = () => (
  <div className="section-card">
    <h2>Analytics</h2>
    <p>Graphs & insights will appear here.</p>
  </div>
);
