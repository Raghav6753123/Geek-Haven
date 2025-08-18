import React, { useState } from 'react';
import './AuthPage.css';
import SignIn from './signin';
import OTP from './OTP';
import SignUp from './SignUp';

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState('signIn');

  const renderForm = () => {
    switch (activeForm) {
      case 'signIn':
        return <SignIn setActiveForm={setActiveForm} />;
      case 'otp':
        return <OTP setActiveForm={setActiveForm} />;
      case 'signUp':
        return <SignUp setActiveForm={setActiveForm} />;
      default:
        return null;
    }
  };

  return (
    <div className="split-container">
      <div className="left-panel">
        <svg className="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
  <h1 className="logo-title">Geek Haven</h1>
      </div>
      <div className="right-panel">
        {renderForm()}
      </div>
    </div>
  );
};

export default AuthPage;
