import { useEffect, useState } from 'react';
import '../assets/css/Header.css';
import moonIcon from '../assets/images/moon.svg';
import sunIcon from '../assets/images/sun.svg';

/**
 * Header component - Application header with theme toggle functionality.
 * Maintains theme preference in localStorage to persist between sessions.
 *
 * @returns {JSX.Element} The rendered header component
 */
const Header = () => {
  // Initialize state from localStorage or default to false (light mode)
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  // Apply the theme when component mounts and when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  /**
   * Toggles between light and dark mode
   */
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className={`header ${darkMode ? 'dark' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <h1>TODO</h1>
        </div>

        <div className="theme-toggle">
          <button
            onClick={toggleDarkMode}
            className="theme-button"
            aria-label="Toggle dark mode"
          >
            <img
              src={darkMode ? sunIcon : moonIcon}
              alt={darkMode ? 'Light mode' : 'Dark mode'}
              className="theme-icon"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
