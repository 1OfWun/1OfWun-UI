import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./Account.css"; // Assuming you save the CSS in Account.css

function Account() {
  const { user, loginUser, registerUser, logoutUser } = useContext(AppContext);

  // Local state for form inputs
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true); // toggle between login/register

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await loginUser(form.email, form.password);
    } else {
      await registerUser(form.username, form.email, form.password);
    }
    setForm({ username: "", email: "", password: "" }); // clear inputs
  };

  if (user) {
    return (
      <div className="account-container">
        <div className="welcome-card">
          <h2>Welcome, {user.username || user.email.split('@')[0]} 👋</h2>
          <p>Email: {user.email}</p>
          <button onClick={logoutUser} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {!isLogin && (
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required={!isLogin}
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
        </p>
      </form>
    </div>
  );
}

export default Account;