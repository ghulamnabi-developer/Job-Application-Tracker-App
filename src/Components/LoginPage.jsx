import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OTPLogin from './OTPLoginPage'; // Assuming OTPLogin component is defined
import './LoginPage.css';

const LoginPage = ({ setIsLoggedIn }) => {
  const [isEmailLogin, setIsEmailLogin] = useState(true); // Toggle between email and OTP login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setIsLoggedIn(true);
      navigate('/'); // Redirect to home
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isEmailLogin ? 'Login' : 'OTP Login'}</h2>
        {error && <p className="error-message">{error}</p>}
        {isEmailLogin ? (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input-field"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input-field"
              required
            />
            <button type="submit" className="submit-button">Login</button>
          </form>
        ) : (
          <OTPLogin setIsLoggedIn={setIsLoggedIn} /> // OTPLogin Component
        )}

        {/* Toggle Between Email/Password and OTP Login */}
        <button
          className="toggle-button"
          onClick={() => setIsEmailLogin(!isEmailLogin)}
        >
          {isEmailLogin ? 'Login with OTP' : 'Login with Email'}
        </button>

        {isEmailLogin && (
          <p className="text-sm mt-2">
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
