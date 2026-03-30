import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function ForgotPassword() {
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length < 3) {
      return setError("Name must be at least 3 characters.");
    }
    if (newPassword.length < 6) {
      return setError("New password must be at least 6 characters.");
    }

    try {
      const res = await api.put("/auth/reset-password", { name, newPassword });
      setMessage(res.data.message || "Password reset successfully");
      setError("");
      setName("");
      setNewPassword("");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Unable to reset password.");
      setMessage("");
    }
  };

  return (
    <div className="page-card form-card">
      <h2>Forgot Password</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <form className="form-grid" onSubmit={handleSubmit}>
        <input
          className="input-field"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          Reset Password
        </button>
      </form>
      <p className="section-links">
        <Link className="nav-link" to="/">
          Back to login
        </Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
