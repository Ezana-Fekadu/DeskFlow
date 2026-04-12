import { useState } from "react";
import CheckInForm from "../components/CheckInForm";
import CheckInList from "../components/CheckInList";
import ItemList from "../components/ItemList";
import Navbar from "../components/Navbar";
import VisitorList from "../components/VisitorList";

function Dashboard({ user, setUser }) {
  const [newCheckIn, setNewCheckIn] = useState(null);
  const [showVisitorPrompt, setShowVisitorPrompt] = useState(false);


  const handleCheckInSuccess = (checkIn) => {
    setNewCheckIn(checkIn);
    setShowVisitorPrompt(true);
  };

  const handleVisitorSkip = () => {
    setShowVisitorPrompt(false);
  };

  return (
    <div className="page-shell">
      <Navbar setUser={setUser} />
      <div className="page-title">
        <div>
          <h1>Welcome back, {user?.name}</h1>
          <p>Manage resident check-ins and stay on top of desk operations.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="page-card">
          <CheckInForm onNewCheckIn={handleCheckInSuccess} />
        </div>
        <div className="page-card">
          <CheckInList newCheckIn={newCheckIn} />
        </div>
        <div className="page-card">
          <VisitorList />
        </div>
        <div className="page-card">
          <ItemList />
        </div>
      </div>

      {showVisitorPrompt && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Visitors with Resident?</h3>
            <p>Resident checked in. Log any visitors?</p>
            <VisitorForm 
              onNewVisitor={() => setShowVisitorPrompt(false)} 
              hostResidentId={newCheckIn?.resident_id} 
            />
            <button className="btn btn-secondary" onClick={handleVisitorSkip}>
              No Visitors / Skip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;