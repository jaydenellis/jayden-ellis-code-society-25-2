import React from 'react';
// Assuming React Router is being used
// import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  // For React Router navigation
  // const location = useLocation();
  
  // For standard navigation without React Router, use:
  const currentPath = window.location.pathname;

  const isActive = (path: string): boolean => {
    return currentPath === path;
  };

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo/Brand */}
        <div className="header__brand">
          <button 
            onClick={() => handleNavigation('/')}
            className="brand-link"
          >
            Code Differently
          </button>
        </div>

        {/* Navigation */}
        <nav className="header__nav">
          <ul className="nav-list">
            <li className="nav-item">
              {/* Option 1: Using React Router Link (uncomment if using React Router) */}
              {/* <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'nav-link--active' : ''}`}
              >
                Home
              </Link> */}
              
              {/* Option 2: Standard navigation */}
              <button
                onClick={() => handleNavigation('/')}
                className={`nav-link ${isActive('/') ? 'nav-link--active' : ''}`}
              >
                Home
              </button>
            </li>

            <li className="nav-item">
              {/* React Router version */}
              {/* <Link 
                to="/programs" 
                className={`nav-link ${isActive('/programs') ? 'nav-link--active' : ''}`}
              >
                Programs
              </Link> */}
              
              {/* Standard navigation */}
              <button
                onClick={() => handleNavigation('/programs')}
                className={`nav-link ${isActive('/programs') ? 'nav-link--active' : ''}`}
              >
                Programs
              </button>
            </li>

            <li className="nav-item">
              {/* React Router version */}
              {/* <Link 
                to="/add-program" 
                className={`nav-link ${isActive('/add-program') ? 'nav-link--active' : ''}`}
              >
                Add Program
              </Link> */}
              
              {/* Standard navigation */}
              <button
                onClick={() => handleNavigation('/add-program')}
                className={`nav-link ${isActive('/add-program') ? 'nav-link--active' : ''}`}
              >
                Add Program
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle (optional) */}
        <button className="header__mobile-toggle">
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
      </div>
    </header>
  );
};

// Alternative version using React Router (uncomment if using React Router)
/*
const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <Link to="/" className="brand-link">
            Code Differently
          </Link>
        </div>

        <nav className="header__nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'nav-link--active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/programs" 
                className={`nav-link ${isActive('/programs') ? 'nav-link--active' : ''}`}
              >
                Programs
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/add-program" 
                className={`nav-link ${isActive('/add-program') ? 'nav-link--active' : ''}`}
              >
                Add Program
              </Link>
            </li>
          </ul>
        </nav>

        <button className="header__mobile-toggle">
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
      </div>
    </header>
  );
};
*/

export default Header;