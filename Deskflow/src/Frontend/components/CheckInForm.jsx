import React, { useState } from "react";
import axios from "axios";

const CheckInForm = ({ onNewCheckIn }) => {
  const [residentId, setResidentId] = useState("");
  const [clerkId, setClerkId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/checkins", {
        resident_id: residentId,
        clerk_id: clerkId,
        check_in_time: new Date().toISOString(),
      });
      onNewCheckIn(response.data); // Update parent list
      setResidentId("");
      setClerkId("");
    } catch (err) {
      console.error("Error creating check-in:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Check-In</h3>
      <input
        type="number"
        placeholder="Resident ID"
        value={residentId}
        onChange={(e) => setResidentId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Clerk ID"
        value={clerkId}
        onChange={(e) => setClerkId(e.target.value)}
        required
      />
      <button type="submit">Check In</button>
    </form>
  );
};

export default CheckInForm;