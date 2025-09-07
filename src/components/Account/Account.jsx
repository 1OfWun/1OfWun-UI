import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

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
      <div className="account-page">
        <h2>Welcome, {user.username || user.email} 👋</h2>
        <p>Email: {user.email}</p>
        <button onClick={logoutUser}>Logout</button>
      </div>
    );
  }

  return (
    <div className="account-page">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required={!isLogin}
            />
          </div>
        )}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
}

export default Account;
