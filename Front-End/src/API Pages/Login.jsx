import React, { useState } from 'react';

const Login = ({ setActiveView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Static account check for prototyping
    if (email === 'admin@example.com' && password === 'admin123') {
      setError('');
      setActiveView('dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">eScholar</div>
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in.</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', border: '1px solid #f87171' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="btn-solid-blue btn-full-width">Sign In</button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <button className="link-btn" onClick={() => setActiveView('register')}>Register here</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
