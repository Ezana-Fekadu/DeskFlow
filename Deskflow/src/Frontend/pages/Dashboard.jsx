import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckInForm from "../components/CheckInForm";
import CheckInList from "../components/CheckInList";
import Navbar from "../components/Navbar";

function Dashboard({ user, setUser }) {
  const [newCheckIn, setNewCheckIn] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="page-shell">
      <Navbar setUser={setUser} />
      <div className="page-title">
        <div>
          <h1>Welcome back, {user?.name}</h1>
          <p>Manage resident check-ins and stay on top of desk operations.</p>
        </div>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="page-card">
          <CheckInForm onNewCheckIn={setNewCheckIn} />
        </div>
        <div className="page-card">
          <CheckInList newCheckIn={newCheckIn} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;