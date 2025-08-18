import React, { useState, useEffect } from 'react';
import CategoryGrid from './CategoryGrid';
import ProgressBar from './ProgressBar';
import './Dashboard.css';
import { useAuth } from '../AuthContext/authContext';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const { setAuthuser } = useAuth();
    const [darkMode, setDarkMode] = useState(() => {
        const stored = localStorage.getItem('dashboard-dark-mode');
        return stored === 'true';
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dashboard-dark');
        } else {
            document.body.classList.remove('dashboard-dark');
        }
        localStorage.setItem('dashboard-dark-mode', darkMode);
    }, [darkMode]);

    return (
        <div className={darkMode ? "dashboard-root-alt dashboard-dark" : "dashboard-root-alt"}>
            <nav className="dashboard-navbar-alt">
                <div className="navbar-left-alt">
                    <span className="geak-title-alt">Geak Haven</span>
                </div>
                <div className="navbar-center-alt">
                    <input type="text" placeholder="Search topics..." className="search-input-alt" onChange={(e) => {
                        setSearch(e.target.value);
                    }} />
                </div>
                <div className="navbar-right-alt">
                    <button
                        className="darkmode-toggle-btn"
                        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        onClick={() => setDarkMode((prev) => !prev)}
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
                    <button className="logout-btn-alt" onClick={() => {
                        localStorage.removeItem("isValid");
                        navigate("/");
                        setAuthuser(false);
                    }}>Logout</button>
                </div>
            </nav>
            <main className="dashboard-content-alt">
                <section className="dashboard-header-section-alt">
                    <h1 className="dashboard-title-alt">Your Coding Journey</h1>
                    <div className="dashboard-progress-row-alt">
                        <span className="dashboard-progress-label-alt">Overall Progress</span>
                        <ProgressBar percent={50} />
                        <span className="dashboard-progress-percent-alt">50%</span>
                    </div>
                </section>
                <section className="dashboard-cards-section-alt">
                    <CategoryGrid search={search} />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;