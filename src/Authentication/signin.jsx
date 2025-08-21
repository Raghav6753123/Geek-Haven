import React from 'react';
import { useState, useEffect } from 'react';
import valdator from "validator"
import api from '../api';
import { useAuth } from '../AuthContext/authContext';
import { useNavigate } from 'react-router-dom';
const SignIn = ({ setActiveForm }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const { setAuthuser } = useAuth();
  const HandleSubmit = async () => {
    if (!valdator.isEmail(email)) {
      setError("Invalid Email");
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    console.log(email);
    if (password.trim() === '') {
      setError("Password is required");
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

  await api.post('/api/auth/login', { email, password }).then((res) => {
      setOtp(res.data.EncryptedOtp);
      localStorage.setItem("isValid",true);
      setAuthuser(true);
      navigate("/dash");
      console.log("otp Sent");
    }).catch((err) => {
      setError("Invalid Credentials");
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    })

  }
  return (
    <form className="form-section" onSubmit={(e) => {
      e.preventDefault();
      HandleSubmit();
    }}>
      <h2 className="form-title">Sign In</h2>
      {error && <span>{error}</span>}
      <div className="form-group">
        <label htmlFor="signin-email" className="form-label">Email</label>
        <input id="signin-email" type="email" className="form-input" placeholder="Enter your email" onChange={(e) => {
          setEmail(e.target.value);
        }} />

      </div>
      <div className="form-group">
        <label htmlFor="signin-password" className="form-label">Password</label>
        <input id="signin-password" type="password" className="form-input" placeholder="Enter your password" onChange={(e) => {
          setPassword(e.target.value);
        }} />
      </div>
      <button type="submit" className="submit-button">Sign In</button>
      <div className="form-links">
        <button type="button" className="form-link-btn" onClick={() => setActiveForm('otp')}>Login with OTP</button>
        <span>|</span>
        <button type="button" className="form-link-btn" onClick={() => setActiveForm('signUp')}>Sign Up</button>
      </div>
    </form>
  )
};

export default SignIn;
