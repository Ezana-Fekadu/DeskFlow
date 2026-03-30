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
      } catch (err) {
        setError("Error fetching check-ins. Please try again.");
      }
    };

    fetchCheckIns();

    return () => {
      active = false;
    };
  }, [newCheckIn]);

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/checkins/${id}`);
      if (response.data.deleted) {
        setCheckIns((prev) => prev.filter((checkIn) => checkIn.id !== id));
        setInfo("Check-in record deleted.");
        setError("");
      }
    } catch (err) {
      setError("Unable to delete check-in.");
      setInfo("");
    }
  };

  const handleCheckout = async (id) => {
    try {
      const finishedAt = new Date().toISOString();
      const response = await api.put(`/checkins/${id}`, { check_out_time: finishedAt });
      if (response.data.changes) {
        setCheckIns((prev) =>
          prev.map((checkIn) =>
            checkIn.id === id ? { ...checkIn, check_out_time: finishedAt } : checkIn
          )
        );
        setInfo("Checked out successfully.");
        setError("");
      }
    } catch (err) {
      setError("Unable to check out.");
      setInfo("");
    }
  };

  return (
    <div>
      <h3>Check-In Records</h3>
      {error && <div className="alert alert-error">{error}</div>}
      {info && <div className="alert alert-success">{info}</div>}
      {checkIns.length === 0 ? (
        <div className="empty-state">No check-ins yet. Use the form to add one.</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Resident</th>
              <th>Clerk</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {checkIns.map((checkIn) => (
              <tr key={checkIn.id}>
                <td>{checkIn.id}</td>
                <td>{checkIn.resident_id}</td>
                <td>{checkIn.clerk_id}</td>
                <td>{new Date(checkIn.check_in_time).toLocaleString()}</td>
                <td>{checkIn.check_out_time ? new Date(checkIn.check_out_time).toLocaleString() : "Pending"}</td>
                <td className="action-cell">
                  <button className="btn btn-secondary" onClick={() => handleDelete(checkIn.id)}>
                    Delete
                  </button>
                  {!checkIn.check_out_time && (
                    <button className="btn btn-primary" onClick={() => handleCheckout(checkIn.id)}>
                      Check Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CheckInList;