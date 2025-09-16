import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./AdminLogin.css"; // Make sure your CSS file is named AdminLogin.css

export default function AdminLogin() {
  const { loginUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loggedInUser = await loginUser(email, password);
    setLoading(false);

    if (loggedInUser?.is_admin) {
      navigate("/dashboard");
    } else {
      alert("Access denied. Admins only."); // You might want to use a more styled notification here
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>
          <span className="brand-one">1</span>
          <span className="brand-o">O</span>
          <span className="brand-fwun">fWun</span> Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="admin-email">Email</label>
            <input
              type="email"
              id="admin-email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="admin-password">Password</label>
            <input
              type="password"
              id="admin-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}