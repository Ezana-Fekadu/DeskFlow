import { useState } from "react";
import CheckInForm from "../components/CheckInForm";
import CheckInList from "../components/CheckInList";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [newCheckIn, setNewCheckIn] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; // redirect to login
  };

  return (
    <div>
        <Navbar />

      <h1>Welcome, {user?.name}</h1>
      <button onClick={handleLogout}>Logout</button>

      {/* Check-in management */}
      <CheckInForm onNewCheckIn={setNewCheckIn} />
      <CheckInList newCheckIn={newCheckIn} />
    </div>
  );
}

export default Dashboard;