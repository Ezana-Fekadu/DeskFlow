import { useState } from "react";
import api from "../api";

const CheckInForm = ({ onNewCheckIn }) => {
  const [residentId, setResidentId] = useState("");
  const [clerkId, setClerkId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resident = Number(residentId);
    const clerk = Number(clerkId);

    if (!resident || resident <= 0) {
      return setError("Resident ID must be a positive number.");
    }
    if (!clerk || clerk <= 0) {
      return setError("Clerk ID must be a positive number.");
    }

    try {
      const response = await api.post("/checkins", {
        resident_id: resident,
        clerk_id: clerk,
        check_in_time: new Date().toISOString(),
      });
      onNewCheckIn(response.data);
      setSuccess("Check-in created successfully.");
      setError("");
      setResidentId("");
      setClerkId("");
    } catch (err) {
      setError(err.response?.data?.error || "Error creating check-in.");
      setSuccess("");
    }
  };

  return (
    <div>
      <h3>Create Check-In</h3>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form className="form-grid" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="number"
          placeholder="Resident ID"
          value={residentId}
          onChange={(e) => setResidentId(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="number"
          placeholder="Clerk ID"
          value={clerkId}
          onChange={(e) => setClerkId(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">
          Check In
        </button>
      </form>
    </div>
  );
};

export default CheckInForm;