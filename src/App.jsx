import { BrowserRouter, Routes, Route } from "react-router";
import LoginForm from "./components/login-form/login";
import TenantDashboard from "./components/tenant-dashboard/tenant-dashboard";
import ProtectedRoute from "./components/protected-route/protected-route";
import Home from "./components/home/Home";
import OwnerHeader from "./components/owner-dashboard/owner-header/owner-header";
import OwnerDashboard from "./components/owner-dashboard/owner-dashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home/>}></Route>

        <Route path="/login" element={<LoginForm />} />

        <Route 
          path="/owner/dashboard"
          element={
            <ProtectedRoute role="OWNER">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/tenant/dashboard"
          element={
            <ProtectedRoute role="TENANT">
              <TenantDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />

      </Routes>

      {/* <Route path="*" element={<h1>an authorized</h1>}></Route> */}
    </BrowserRouter>
    
  );
}

export default App;
