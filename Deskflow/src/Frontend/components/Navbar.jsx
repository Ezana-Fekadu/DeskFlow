import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ setUser }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    if (setUser) setUser(null);
    navigate("/");
  };

  return (
    <nav className="nav-bar">
      <div className="nav-brand">DeskFlow</div>
      <div className="nav-links">
        <span>Welcome, {user?.name || "Guest"}</span>
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
        <Link className="nav-link" to="/change-password">
          Change Password
        </Link>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;