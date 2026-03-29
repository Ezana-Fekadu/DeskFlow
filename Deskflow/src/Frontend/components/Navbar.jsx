import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // if you have token
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>DeskFlow</h2>
      <div style={styles.links}>
        <span>Welcome, {user?.name}</span>
        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>
        <Link to="/change-password" style={styles.link}>
          Change Password
        </Link>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 1rem",
    backgroundColor: "#1e3a8a",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  logoutBtn: {
    padding: "0.3rem 0.7rem",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Navbar;