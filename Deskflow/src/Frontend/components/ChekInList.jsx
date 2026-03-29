import axios from "axios";
import { useEffect, useState } from "react";

const CheckInList = ({ newCheckIn }) => {
  const [checkIns, setCheckIns] = useState([]);

  useEffect(() => {
    let active = true;

    const fetchCheckIns = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/checkins");
        if (active) setCheckIns(response.data);
      } catch (err) {
        console.error("Error fetching check-ins:", err);
      }
    };

    fetchCheckIns();

    return () => {
      active = false;
    };
  }, [newCheckIn]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/checkins/${id}`);
      // refetch or update local state after delete
    } catch (err) {
      console.error("Error deleting check-in:", err);
    }
  };

  return (
    <div>
      <h3>Check-In Records</h3>
      <ul>
        {checkIns.map((checkIn) => (
          <li key={checkIn.id}>
            ID: {checkIn.id}, Resident: {checkIn.resident_id}, Clerk: {checkIn.clerk_id}, Time: {checkIn.check_in_time}, Checkout: {checkIn.check_out_time || "N/A"}
            <button onClick={() => handleDelete(checkIn.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckInList;