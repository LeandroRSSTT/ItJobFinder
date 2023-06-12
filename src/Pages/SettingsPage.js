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
    <div className="px-4 sm:px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="text-center col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <h1 className="text-4xl font-bold my-8">Changer le thème</h1>
      </div>
      {themes.map((theme, index) => (
        <div key={index} className="col-span-1">
          <button
            className={`w-full btn ${currentTheme === theme ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleThemeChange(theme)}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SettingsPage;
