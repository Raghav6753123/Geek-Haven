import React, { useState } from 'react';
import validator from 'validator';
import api from '../api';
import { useAuth } from '../AuthContext/authContext';
import { useNavigate } from 'react-router-dom';
const SignUp = ({ setActiveForm }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stream, setStream] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [cpassErr, setCpassErr] = useState('');
  const [apiErr, setApiErr] = useState('');
  const [success, setSuccess] = useState('');
  const { setaAuthuser } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    setEmailErr('');
    setPassErr('');
    setCpassErr('');
    setApiErr('');
    setSuccess('');

    if (!validator.isEmail(email)) {
      setEmailErr('Invalid email address');
      valid = false;
    }
    if (!password) {
      setPassErr('Password cannot be empty');
      valid = false;
    }
    if (password !== confirmPassword) {
      setCpassErr('Passwords do not match');
      valid = false;
    }
    if (!stream) {
      setApiErr('Please select a stream');
      valid = false;
    }
    if (!valid) return;

    try {
  const res = await api.post('/api/auth/register', {
        email,
        password,
        name: email.split('@')[0],
        stream
      });
      setSuccess('Registration successful!');
      localStorage.setItem("isValid", true);
      setaAuthuser(true);
      navigate("/dash");
      setTimeout(() => setActiveForm('signIn'), 1500);
    } catch (err) {
      setApiErr(err?.response?.data?.message || 'Registration failed');
      setTimeout(() => setApiErr(''), 3000);
    }
  };

  return (
    <form className="form-section" onSubmit={handleSubmit}>
      <h2 className="form-title">Sign Up</h2>
      <div className="form-group">
        <label htmlFor="signup-email" className="form-label">Email</label>
        <input
          id="signup-email"
          type="email"
          className="form-input"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {emailErr && <span style={{ color: 'red', fontSize: '0.9rem' }}>{emailErr}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="signup-password" className="form-label">Password</label>
        <input
          id="signup-password"
          type="password"
          className="form-input"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {passErr && <span style={{ color: 'red', fontSize: '0.9rem' }}>{passErr}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="signup-confirm-password" className="form-label">Confirm Password</label>
        <input
          id="signup-confirm-password"
          type="password"
          className="form-input"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        {cpassErr && <span style={{ color: 'red', fontSize: '0.9rem' }}>{cpassErr}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="stream" className="form-label">Stream</label>
        <select
          id="stream"
          className="form-input"
          value={stream}
          onChange={e => setStream(e.target.value)}
          required
        >
          <option value="">Select a stream</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
        </select>
      </div>
      {apiErr && <span style={{ color: 'red', display: 'block', margin: '0.5rem 0', textAlign: 'center', fontWeight: 600 }}>{apiErr}</span>}
      {success && <span style={{ color: 'green', display: 'block', margin: '0.5rem 0', textAlign: 'center', fontWeight: 600 }}>{success}</span>}
      <button type="submit" className="submit-button">Sign Up</button>
      <div className="form-links">
        <button type="button" className="form-link-btn" onClick={() => setActiveForm('signIn')}>Sign In</button>
      </div>
    </form>
  );
};

export default SignUp;
