import React, { useState } from 'react';
import '../components/LandingPage.css';
import Logo from '../components/Logo';

const NIDAS_BASE_URL = import.meta.env.VITE_NIDAS_BASE_URL;
const NIDAS_CLIENT_ID = import.meta.env.VITE_NIDAS_CLIENT_ID;
const NIDAS_CLIENT_SECRET = import.meta.env.VITE_NIDAS_CLIENT_SECRET;
const NIDAS_PUB_KEY = import.meta.env.VITE_NIDAS_PUB_KEY;

const Register = ({ setActiveView }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState(null);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationStep, setVerificationStep] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setVerificationError(null);

    const formData = new FormData(e.target);
    const registrationData = Object.fromEntries(formData.entries());

    if (registrationData.password !== registrationData.confirm_password) {
      setVerificationError("Passwords do not match.");
      return;
    }

    if (!window.eKYC) {
      setVerificationError("eVerify SDK is not loaded. Please check your connection.");
      return;
    }

    setIsVerifying(true);

    try {
      setVerificationStep("Authenticating with NIDAS...");
      
      const authResponse = await fetch(`${NIDAS_BASE_URL}/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: NIDAS_CLIENT_ID,
          client_secret: NIDAS_CLIENT_SECRET
        })
      });

      if (!authResponse.ok) {
        throw new Error("Failed to authenticate with NIDAS. Check client credentials.");
      }

      const authData = await authResponse.json();
      console.log("Auth Response Data:", authData);
      
      const accessToken = (authData?.data?.access_token || authData?.access_token || "").trim();
      
      if (!accessToken) {
        throw new Error("Failed to extract access_token from the authentication response. See console for details.");
      }
      console.log("Access Token Successfully Extracted!");


      setVerificationStep("Awaiting Face Liveness Check...");
      
      const livenessResponse = await window.eKYC().start({
        pubKey: NIDAS_PUB_KEY
      });

      console.log("Camera SDK Response:", livenessResponse);

      const sessionId = livenessResponse?.result?.session_id;

      if (!sessionId) {
        throw new Error("Facial recognition failed or was closed before finishing. The camera did not return a session ID.");
      }

      setVerificationStep("Verifying Identity...");

      const verifyPayload = {
        first_name: registrationData.first_name.trim(),
        last_name: registrationData.last_name.trim(),
        birth_date: registrationData.birth_date,
        face_liveness_session_id: sessionId
      };

      if (registrationData.middle_name && registrationData.middle_name.trim() !== "") {
        verifyPayload.middle_name = registrationData.middle_name.trim();
      }

      if (registrationData.suffix && registrationData.suffix.trim() !== "") {
        verifyPayload.suffix = registrationData.suffix.trim();
      }

      console.log("Submitting to Verification Endpoint:", verifyPayload);

      const verifyResponse = await fetch(`${NIDAS_BASE_URL.replace(/\/$/, '')}/api/query`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(verifyPayload)
      });

      if (!verifyResponse.ok) {
        const errorText = await verifyResponse.text();
        throw new Error(`Verification endpoint failed with status ${verifyResponse.status}: ${errorText || 'The biometrics did not match the provided demographics.'}`);
      }

      const verifyData = await verifyResponse.json();
      console.log("Verify Response Data:", verifyData);

      const successCodes = ['AAA000', 'XTA113'];
      const isSuccessCode = verifyData?.data?.code && successCodes.includes(verifyData.data.code);
      const isGradeOne = verifyData?.meta?.result_grade === 1;

      if (!verifyData || !verifyData.data || (!isSuccessCode && !isGradeOne)) {
         console.error("Mismatch. API returned:", verifyData);
         throw new Error("Identity verification failed.");
      }

      console.log("Verification Success!");
      setIsVerifying(false);
      setVerificationSuccess(true);

      setTimeout(() => {
        setActiveView('login');
      }, 2500);

    } catch (error) {
      console.error("Verification Process Error:", error);
      setVerificationError(error.message || "Face verification failed or was cancelled. Please try again.");
      setIsVerifying(false);
      setVerificationStep("");
    }
  };

  return (
    <div className="auth-wrapper" style={{ position: 'relative' }}>
      <nav className="landing-navbar" style={{ position: 'absolute', top: 0, left: 0, width: '100%', boxSizing: 'border-box' }}>
        <Logo onClick={() => setActiveView('landing')} color="#1d4ed8" />
        <div className="landing-nav-actions">
          <button className="btn-login-nav" onClick={() => setActiveView('login')} disabled={isVerifying}>Log In</button>
        </div>
      </nav>
      
      <div className="auth-card register-card" style={{ marginTop: '4rem' }}>
        <div className="auth-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Logo size="large" color="#1d4ed8" />
          </div>
          <h2>Create an Account</h2>
          <p>Enter your information below to register.</p>
        </div>

        {verificationError && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', border: '1px solid #f87171' }}>
            {verificationError}
          </div>
        )}

        {verificationSuccess && (
          <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '1rem', border: '1px solid #86efac', textAlign: 'center', fontWeight: 'bold' }}>
            🎉 Verification Successful! <br/>
            <span style={{ fontSize: '0.85rem', fontWeight: 'normal' }}>Redirecting to login...</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="auth-form" style={{ display: verificationSuccess ? 'none' : 'block' }}>
          <div className="form-row form-row-2">
            <div className="form-group">
              <label>First Name *</label>
              <input type="text" name="first_name" placeholder="First Name" required disabled={isVerifying} />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input type="text" name="last_name" placeholder="Last Name" required disabled={isVerifying} />
            </div>
          </div>
          <div className="form-row form-row-2">
            <div className="form-group">
              <label>Middle Name</label>
              <input type="text" name="middle_name" placeholder="Middle Name (Optional)" disabled={isVerifying} />
            </div>
            <div className="form-group">
              <label>Suffix</label>
              <input type="text" name="suffix" placeholder="e.g. Jr, III (Optional)" disabled={isVerifying} />
            </div>
          </div>

          <div className="form-row form-row-2">
            <div className="form-group">
              <label>Birthday *</label>
              <input type="date" name="birth_date" required disabled={isVerifying} />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="text" name="phone_number" placeholder="+639..." required disabled={isVerifying} />
            </div>
          </div>

          <div className="form-row form-row-2">
            <div className="form-group">
              <label>Full Address *</label>
              <input type="text" name="address" placeholder="Enter your full address" required disabled={isVerifying} />
            </div>
            <div className="form-group">
              <label>Current School *</label>
              <select name="school" required className="form-select" disabled={isVerifying} defaultValue="">
                <option value="" disabled>Select your school</option>
                <option value="STI">STI</option>
                <option value="QCU">QCU</option>
                <option value="PUP">PUP</option>
                <option value="PU">PU</option>
              </select>
            </div>
          </div>

          <div className="form-row form-row-2">
            <div className="form-group">
              <label>Password *</label>
              <input type="password" name="password" placeholder="Create a password" required disabled={isVerifying} />
            </div>
            <div className="form-group">
              <label>Confirm Password *</label>
              <input type="password" name="confirm_password" placeholder="Confirm your password" required disabled={isVerifying} />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-solid-blue btn-full-width mt-4" 
            disabled={isVerifying}
            style={{ opacity: isVerifying ? 0.7 : 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.25rem' }}
          >
            {isVerifying ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="spinner" style={{ width: '16px', height: '16px', border: '2px solid #ffffff', borderBottomColor: 'transparent', borderRadius: '50%', display: 'inline-block', boxSizing: 'border-box', animation: 'rotation 1s linear infinite' }}></span>
                  <span style={{ fontWeight: 600 }}>Processing...</span>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 'normal', opacity: 0.9 }}>{verificationStep}</span>
              </>
            ) : (
              "Verify Identity & Register"
            )}
          </button>
        </form>
      </div>
      
      <style>{`
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Register;
