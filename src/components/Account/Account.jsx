import React, { useContext, useState } from 'react'
import './Account.css'
import { AppContext } from '../../context/AppContext';

const Account = () => {
  const { user, loginUser, registerUser, logoutUser } = useContext(AppContext);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user) {
    return (
      <div className="account-container">
        <div className="welcome-card">
          <h2>WELCOME, {user.name.toUpperCase()}</h2> 
          <p>Email: {user.email}</p>
          <button onClick={logoutUser} className="logout-button">Logout</button> 
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      registerUser(email, password);
    } else {
      loginUser(email, password);
    }
  };

  return (
    <div className="account-container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      <p onClick={() => setIsRegister(!isRegister)}>
        {isRegister
          ? 'Already have an account? Login'
          : 'Don\'t have an account? Register'
        }
      </p>
    </div>
  );
};

export default Account;