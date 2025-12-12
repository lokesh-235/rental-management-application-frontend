import { Navigate } from "react-router";

export default function ProtectedRoute({ children, role }) {

    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user) return <Navigate to="/login" />;

    if (role && user.role !== role) return <Navigate to="/unauthorized" />;

    return children;
}
