import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Register({ setUser }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (name.trim().length < 3) {
      return setError("Name must be at least 3 characters.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    try {
      await api.post("/auth/register", {
        name,
        password,
        role: "user",
      });

      const loginRes = await api.post("/auth/login", { name, password });
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      setUser(loginRes.data.user);
      setSuccess("Registration successful. Redirecting to dashboard...");
      setError("");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
      setSuccess("");
    }
  };

  return (
    <div className="page-card form-card">
      <h2>Create an account</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form className="form-grid" onSubmit={handleRegister}>
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">
          Create account
        </button>
      </form>
      <p className="section-links">
        Already have an account? <Link className="nav-link" to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;