import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;
  if (role && role !== userRole) return <Navigate to={userRole === "teacher" ? "/teacher/dashboard" : "/articles"} />;

  return children;
}

export default ProtectedRoute;