import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Login({ setUser }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (name.trim().length < 3) {
      return setError("Name must be at least 3 characters.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    try {
      const res = await api.post("/auth/login", { name, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="page-card form-card">
      <h2>Login</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form className="form-grid" onSubmit={handleLogin}>
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
          Login
        </button>
      </form>
      <div className="section-links">
        <Link className="nav-link" to="/register">
          Create new account
        </Link>
        <Link className="nav-link" to="/forgot-password">
          Forgot password?
        </Link>
      </div>
    </div>
  );
}

export default Login;