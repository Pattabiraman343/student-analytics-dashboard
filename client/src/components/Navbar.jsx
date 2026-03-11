import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-links">
        {role === "student" && (
          <>
            <Link to="/articles">Articles</Link>
            <Link to="/student/dashboard">My Highlights</Link>
          </>
        )}

        {role === "teacher" && (
          <>
            {/* Dashboard Summary */}
            <Link to="/teacher/dashboard">Dashboard Summary</Link>

            {/* Student Engagement Analytics */}
            <Link to="/teacher/analytics">Student Engagement</Link>

            <Link to="/teacher/create">Create Article</Link>
            <Link to="/teacher/articles">My Articles</Link>
          </>
        )}
      </div>

      <button className="navbar-logout-btn" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;