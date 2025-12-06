import React from 'react';
import { authAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './DashboardNav.css';

const DashboardNav = ({ activeView, onViewChange, profileData }) => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        authAPI.logout();
        navigate('/');
    };

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'daily-entry', label: 'Daily Entry', icon: '📝' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'goals', label: 'Goals', icon: '🎯' },
    ];

    return (
        <nav className="dashboard-nav">
            <div className="nav-header">
                <h2>LifeLens</h2>
                {profileData && (
                    <div className="user-info">
                        <div className="user-avatar">
                            {profileData.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-details">
                            <p className="user-name">{profileData.name}</p>
                            <span className="profile-completion">
                                {profileData.profileCompletionPercentage}% complete
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <ul className="nav-menu">
                {menuItems.map(item => (
                    <li
                        key={item.id}
                        className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                        onClick={() => onViewChange(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </li>
                ))}
            </ul>

            <div className="nav-footer">
                <button className="theme-toggle-btn" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                    {theme === 'light' ? '🌙' : '☀️'}
                    <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                    🚪 Logout
                </button>
            </div>
        </nav>
    );
};

export default DashboardNav;
