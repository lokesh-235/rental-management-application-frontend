import React, { useState } from "react";
import OwnerHeader from "./owner-header/owner-header";
import OwnerProperties from "./owner-properties/owner-properties";
import TenantRequests from "./tenant-requests/tenant-requests";
import Tenants from "./active-rentals/active-rentals";
import "./owner-dashboard.css";
import OwnerSidebar from "./sidebar/owner-sidebar";
export default function OwnerDashboard() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [view, setView] = useState("properties");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="owner-dashboard">
      <OwnerHeader
        user={user}
        onNav={setView}
        activeView={view}
        onMenu={() => setSidebarOpen(true)}
      />

      <OwnerSidebar
        activeView={view}
        setActiveView={setView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="owner-main">
        {view === "overview" && <Overview />}
        {view === "properties" && <OwnerProperties owner={user} />}
        {view === "requests" && <TenantRequests owner={user} />}
        {view === "tenants" && <Tenants owner={user} />}
        {view === "payments" && <Payments />}
        {view === "maintenance" && <Maintenance />}
        {view === "analytics" && <Analytics />}
      </main>
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
