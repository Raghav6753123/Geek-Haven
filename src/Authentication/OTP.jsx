import React, { useState, useRef } from 'react';
import axios from 'axios';
import validator from 'validator';
import AOS from 'aos';
import bcrypt from 'bcryptjs';
import 'aos/dist/aos.css';
import { useAuth } from '../AuthContext/authContext';
import { useNavigate } from 'react-router-dom';
const OTP = ({ setActiveForm }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpInputs, setOtpInputs] = useState(['', '', '', '', '', '']);
  const otpRef = useRef([...Array(6)].map(() => React.createRef()));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { setAuthuser } = useAuth();
  React.useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleEmailSubmit = async (e) => {
    setShowOtp(true);
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!validator.isEmail(email)) {
      setError('Invalid Email');
      setTimeout(() => setError(''), 3000);
      return;
    }
    try {
      const res = await axios.post('api/auth/login-otp', { email });
      setOtp(res.data.EncryptedOtp);
      setShowOtp(true);
      setjwt(res.data.token);
      setOtpInputs(['', '', '', '', '', '']);
      setTimeout(() => {
        if (otpRef.current[0]?.current) otpRef.current[0].current.focus();
      }, 400);
    } catch (err) {
      setError(err?.response?.data?.message || 'User not found');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleOtpInput = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 1) return;
    const newInputs = [...otpInputs];
    newInputs[idx] = value;
    setOtpInputs(newInputs);
    if (value && idx < 5) {
      otpRef.current[idx + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (otpInputs[idx] === '' && idx > 0) {
        otpRef.current[idx - 1].current.focus();
        const newInputs = [...otpInputs];
        newInputs[idx - 1] = '';
        setOtpInputs(newInputs);
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otpInputs.join('');
    console.log(enteredOtp);
    const isMatch = await bcrypt.compare(enteredOtp, otp);
    if (isMatch) {
      setSuccess(true);
      setError('');
      setAuthuser(true);
        localStorage.setItem("isValid",true);
      navigate("/dash");
      console.log("OTP Verified ✅");
    } else {
      console.log("Invalid OTP ❌");
      setError('Incorrect OTP');
      setSuccess(false);
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <form className="form-section" onSubmit={showOtp ? handleOtpSubmit : handleEmailSubmit} data-aos="fade-right">
      <h2 className="form-title">Login with OTP</h2>
      <div className="form-group">
        <label htmlFor="otp-email" className="form-label">Email</label>
        <input
          id="otp-email"
          type="email"
          className="form-input"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={showOtp}
        />
      </div>
      {showOtp && (
        <div className="form-group" style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center' }} data-aos="fade-down">
          {otpInputs.map((val, idx) => (
            <input
              key={idx}
              ref={otpRef.current[idx]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="form-input otp-input-box"
              style={{
                width: "3rem",
                height: "3rem",
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#111",                // dark text for visibility
                backgroundColor: "#ffffff",   // pure white background
                border: "2px solid #4f46e5",
                borderRadius: "0.5rem",       // rounded edges
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                outline: "none",
                letterSpacing: "2px",
                caretColor: "#4f46e5",
                transition: "all 0.2s ease",
              }}
              value={val}
              onChange={e => handleOtpInput(e, idx)}
              onKeyDown={e => handleOtpKeyDown(e, idx)}
              onFocus={e => (e.target.style.borderColor = "#1e3a8a")}
              onBlur={e => (e.target.style.borderColor = "#4f46e5")}
            />
          ))}

        </div>
      )}
      {error && <span style={{ color: 'red', display: 'block', margin: '0.5rem 0', textAlign: 'center', fontWeight: 600 }}>{error}</span>}
      {success && <span style={{ color: 'green', display: 'block', margin: '0.5rem 0', textAlign: 'center', fontWeight: 600 }}>OTP Verified!</span>}
      <button type="submit" className="submit-button" style={{ marginTop: '1rem' }}>{showOtp ? 'Verify OTP' : 'Verify'}</button>
      <div className="form-links">
        <button type="button" className="form-link-btn" onClick={() => setActiveForm('signIn')}>Sign In</button>
      </div>
    </form>
  );
};

export default OTP;
