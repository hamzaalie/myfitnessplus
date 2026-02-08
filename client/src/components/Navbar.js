import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="navbar-brand">
          <span className="brand-icon">💪</span>
          <span className="brand-text">MyFitnessPlus</span>
        </Link>

        <button 
          className="navbar-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/meals" 
                className={`nav-link ${isActive('/meals') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Meal Prep
              </Link>
              <Link 
                to="/workout" 
                className={`nav-link ${isActive('/workout') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Workout
              </Link>
              <Link 
                to="/progress" 
                className={`nav-link ${isActive('/progress') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Progress
              </Link>
              <Link 
                to="/goals" 
                className={`nav-link ${isActive('/goals') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Goals
              </Link>
              <div className="nav-user">
                <span className="user-name">Hi, {user?.name?.split(' ')[0]}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="btn btn-primary nav-btn"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
