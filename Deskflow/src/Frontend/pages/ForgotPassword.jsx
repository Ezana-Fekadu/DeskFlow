import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";

function ForgotPassword() {
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${BASE_URL}/auth/reset-password`, { name, newPassword });
      setMessage(res.data.message || "Password reset successfully");
      setError("");
      setName("");
      setNewPassword("");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Unable to reset password");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>
        <Link to="/">Back to login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
