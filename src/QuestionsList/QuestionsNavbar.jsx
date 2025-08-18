
import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext/authContext';
import { useNavigate } from 'react-router-dom';
import './QuestionsNavbar.css';

const QuestionsNavbar = ({ darkMode: propDarkMode, setDarkMode: propSetDarkMode, setSearch }) => {
  const navigate = useNavigate();
  const { setAuthuser } = useAuth();
  // If darkMode and setDarkMode are not provided, manage them locally
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof propDarkMode === 'boolean') return propDarkMode;
    const stored = localStorage.getItem('dashboard-dark-mode');
    return stored === 'true';
  });
  useEffect(() => {
    if (typeof propSetDarkMode === 'function') {
      propSetDarkMode(darkMode);
    }
    if (darkMode) {
      document.body.classList.add('dashboard-dark');
    } else {
      document.body.classList.remove('dashboard-dark');
    }
    localStorage.setItem('dashboard-dark-mode', darkMode);
  }, [darkMode, propSetDarkMode]);

  return (
    <nav className="dashboard-navbar-alt">
      <div className="navbar-left-alt">
        <span className="geak-title-alt">Geak Haven</span>
      </div>
      <div className="navbar-center-alt">
        <input
          type="text"
          placeholder="Search topics..."
          className="search-input-alt"
          onChange={e => setSearch && setSearch(e.target.value)}
        />
      </div>
      <div className="navbar-right-alt">
        <button
          className="darkmode-toggle-btn"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          onClick={() => setDarkMode(prev => !prev)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            marginRight: '1rem',
          }}
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
        <button className="profile-btn-alt" title="Profile">
          <span className="profile-icon-alt">
            {(() => {
              const email = localStorage.getItem('email');
              return email && email.length > 0 ? email[0].toUpperCase() : 'R';
            })()}
          </span>
        </button>
        <button
          className="logout-btn-alt"
          onClick={() => {
            localStorage.removeItem("isValid");
            localStorage.setItem("authuser", "false");
            navigate("/");
            setAuthuser(false);
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default QuestionsNavbar;
