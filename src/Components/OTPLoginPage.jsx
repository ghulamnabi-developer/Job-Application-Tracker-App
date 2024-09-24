import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import from Firebase.js
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const OTPLoginPage = ({ setIsLoggedIn }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setupRecaptcha();
  }, []);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        console.log("Recaptcha resolved");
      },
      'expired-callback': () => {
        setError('Recaptcha expired, please try again.');
      },
    });
  
    // Disable app verification for testing purposes
    window.recaptchaVerifier.verify().then(() => {
      auth.settings.appVerificationDisabledForTesting = true; // This ensures it's disabled for testing
    });
  };
  
  

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number.');
      setLoading(false);
      return;
    }

    const appVerifier = window.recaptchaVerifier;
    // Correctly format the phone number with the country code
    const formattedPhoneNumber = `+92${phoneNumber}`;

    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setLoading(false);
        console.log("OTP has been sent successfully");
      })
      .catch((error) => {
        setError('Failed to send OTP. Please check the phone number and try again.');
        console.error('Error during OTP send:', error.message);
        setLoading(false);
      });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!verificationId) {
      setError('OTP has not been sent yet! Please request OTP first.');
      setLoading(false);
      return;
    }

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      setLoading(false);
      return;
    }

    const credential = PhoneAuthProvider.credential(verificationId, otp);

    signInWithCredential(auth, credential)
      .then(() => {
        setIsLoggedIn(true);
        navigate('/');
        setLoading(false);
      })
      .catch((error) => {
        setError('Invalid OTP. Please try again.');
        console.error('Error during OTP verification:', error);
        setLoading(false);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login with OTP</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={verificationId ? handleOtpSubmit : handlePhoneNumberSubmit}>
          {!verificationId ? (
            <>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="input-field"
                required
              />
              <div id="recaptcha-container"></div>
            </>
          ) : (
            <>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="input-field"
                required
              />
            </>
          )}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Processing...' : verificationId ? 'Submit OTP' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPLoginPage;
