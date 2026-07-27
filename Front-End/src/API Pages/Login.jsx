import React, { useState, useEffect } from 'react';

const Login = ({ setActiveView, setUserRole }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [phoneNumber, setPhoneNumber] = useState('+639');

  const [otpCode, setOtpCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roleToSet, setRoleToSet] = useState('student');

  useEffect(() => {
    const sessionExpiry = localStorage.getItem('escholar_2fa_session');
    const savedRole = localStorage.getItem('escholar_user_role');
    if (sessionExpiry && new Date().getTime() < parseInt(sessionExpiry, 10)) {
      if (savedRole && setUserRole) setUserRole(savedRole);
      setActiveView('dashboard');
    }
  }, [setActiveView, setUserRole]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email === 'student@example.com' && password === 'student123') {
      setError('');
      setRoleToSet('student');
      setStep(2); 
    } else if ((email === 'admin@example.com' || email === 'admin123') && password === 'admin123') {
      setError('');
      setRoleToSet('admin');
      setStep(2);
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleSendSMS = async (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number format (e.g. +639...).");
      return;
    }

    setIsLoading(true);
    setError('');

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);

    try {
      const response = await fetch('https://ws-message.e.gov.ph/messaging/v1/sms/push', {
        method: 'POST',
        headers: {
          'X-EMESSAGE-Auth': import.meta.env.VITE_EMESSAGE_AUTH,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: phoneNumber,
          message: `Your eScholar verification code is: ${code}. It will expire shortly.`
        })
      });

      if (response.ok) {
        setStep(3); 
      } else {
        const errData = await response.json();
        if (errData.error === 'account_was_temporary_banned') {
          setError('Our SMS service is currently experiencing issues. Please try again later.');
        } else if (errData.message) {
          setError(errData.message);
        } else {
          setError('Failed to send SMS. Please try again later.');
        }
      }
    } catch (err) {
      setError('Network error occurred while sending SMS.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otpCode === generatedCode) {
      const expiry = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); 
      localStorage.setItem('escholar_2fa_session', expiry.toString());
      localStorage.setItem('escholar_user_role', roleToSet);
      if (setUserRole) setUserRole(roleToSet);
      
      setActiveView('dashboard');
    } else {
      setError('Incorrect verification code. Please try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo" style={{ color: 'black' }}>eScholar</div>
          <h2>{step === 1 ? 'Welcome Back' : step === 2 ? 'Two-Factor Auth' : 'Verify Phone'}</h2>
          <p>
            {step === 1 && 'Please enter your details to sign in.'}
            {step === 2 && 'Enter the mobile number to receive your code.'}
            {step === 3 && `Enter the 6-digit code sent to ${phoneNumber}.`}
          </p>
        </div>

        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleLoginSubmit} className="auth-form">
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

            <button type="submit" className="btn-solid-blue btn-full-width">Sign In</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSendSMS} className="auth-form">
            <div className="form-group">
              <label>Mobile Number (E.164 format)</label>
              <input 
                type="text" 
                placeholder="+639000000000" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="btn-solid-blue btn-full-width" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send SMS Code'}
            </button>
            <button type="button" className="btn-secondary btn-full-width" style={{ marginTop: '0.5rem' }} onClick={() => setStep(1)}>
              Back
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleVerifyOTP} className="auth-form">
            <div className="form-group">
              <label>6-Digit Code</label>
              <input 
                type="text" 
                placeholder="123456" 
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required 
                maxLength="6"
              />
            </div>

            <button type="submit" className="btn-solid-blue btn-full-width">
              Verify & Login
            </button>
            <button type="button" className="btn-secondary btn-full-width" style={{ marginTop: '0.5rem' }} onClick={() => setStep(2)}>
              Change Phone Number
            </button>
          </form>
        )}

        {step === 1 && (
          <div className="auth-footer" style={{ marginTop: '1.5rem' }}>
            <p>Don't have an account? <button className="link-btn" onClick={() => setActiveView('register')}>Register here</button></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
