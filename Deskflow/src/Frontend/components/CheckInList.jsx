import { useEffect, useState } from "react";
import api from "../api";

const CheckInList = ({ newCheckIn }) => {
  const [checkIns, setCheckIns] = useState([]);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    let active = true;

    const fetchCheckIns = async () => {
      try {
        const response = await api.get("/checkins");
        if (active) setCheckIns(response.data);
      } catch (_) {
        setError("Error fetching check-ins. Please try again.");
      }
    };

    fetchCheckIns();

    return () => {
      active = false;
    };
  }, [newCheckIn]);

  return (
    <div>
      <h3>Check-In Records</h3>
      {error && <div className="alert alert-error">{error}</div>}
      {info && <div className="alert alert-success">{info}</div>}
      {checkIns.length === 0 ? (
        <div className="empty-state">No check-ins yet. Use the form to add one.</div>
      ) : (
        <div className="list">
          {checkIns.map((checkIn) => {
            if (checkIn.check_out_time) return null;
            return (
              <div key={checkIn.id} className="list-item">
                <span>Resident {checkIn.resident_id} by Clerk {checkIn.clerk_id}</span>
                <span>Checked in: {new Date(checkIn.check_in_time).toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CheckInList;