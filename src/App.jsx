import { BrowserRouter, Routes, Route } from "react-router";
import LoginForm from "./components/login-form/login";
import TenantDashboard from "./components/tenant-dashboard/tenant-dashboard";
import ProtectedRoute from "./components/protected-route/protected-route";
import Home from "./components/home/Home";
import OwnerHeader from "./components/owner-dashboard/owner-header/owner-header";
import OwnerDashboard from "./components/owner-dashboard/owner-dashboard";
import { PropertyRefreshProvider } from "./custom-hooks/refresh-properties";

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

        <Route path="*" element={<h1>404 : PAGE NOT FOUND</h1>}></Route>
      </Routes>

      {/* <Route path="*" element={<h1>an authorized</h1>}></Route> */}
    </BrowserRouter>
        // <form
        //   action="http://localhost:8080/api/images/upload/1"
        //   method="POST"
        //   enctype="multipart/form-data"
        // >
        //   <input type="file" name="image" />
        //   <button type="submit">Upload</button>
        // </form>


  );
}

export default App;
