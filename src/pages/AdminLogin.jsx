import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // We'll create this CSS file

function AdminLogin() {
  const { loginUser, user } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in as admin
  useEffect(() => {
    if (user?.is_admin) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginSuccessful = await loginUser(email, password); 

    if (loginSuccessful && user?.is_admin) {
      navigate("/dashboard");
    } else {
      alert("Access denied. Admins only.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        {/* Updated title to reflect "1OfWun" branding */}
        <h2>
          <span className="brand-one">1</span>
          <span className="brand-o">O</span>
          <span className="brand-fwun">fWun Admin Login</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;