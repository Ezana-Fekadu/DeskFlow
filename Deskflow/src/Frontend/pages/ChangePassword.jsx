import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleChange = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      return setError("Both current and new passwords are required.");
    }
    if (newPassword.length < 6) {
      return setError("New password must be at least 6 characters.");
    }
    if (oldPassword === newPassword) {
      return setError("New password must be different from the current password.");
    }

    try {
      const res = await api.put("/auth/password", {
        userId: user.id,
        oldPassword,
        newPassword,
      });
      setMessage(res.data.message || "Password updated successfully.");
      setError("");
      setOldPassword("");
      setNewPassword("");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError(err.response?.data?.error || "Unable to update password.");
      setMessage("");
    }
  };

  return (
    <div className="page-card form-card">
      <h2>Change Password</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <form className="form-grid" onSubmit={handleChange}>
        <input
          className="input-field"
          type="password"
          placeholder="Current password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
