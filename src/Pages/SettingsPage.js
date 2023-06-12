import React, { useState, useEffect } from 'react';

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
];

function SettingsPage({ changeTheme }) {
  const [currentTheme, setCurrentTheme] = useState('');

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setCurrentTheme(theme);
  }, []);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    changeTheme(theme);
  };

  return (
    <div className="p-10 grid grid-cols-6 gap-4">
      {themes.map((theme, index) => (
        <button
          key={index}
          className={`btn ${currentTheme === theme ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleThemeChange(theme)}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default SettingsPage;
