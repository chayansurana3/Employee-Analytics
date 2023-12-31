import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import "./themeToggle.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className={theme === 'light' ? "round-toggle-light" : "round-toggle-dark"}>
      {theme === 'light' ? '🌙' : '🌞'}
    </button>
  );
};

export default ThemeToggle;