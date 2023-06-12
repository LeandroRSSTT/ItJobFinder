import React, { useState, useEffect } from 'react'; // Ajoutez useEffect ici
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedList from './FeedList';
import Navbar from './Navigation/Navbar';
import SettingsPage from './Pages/SettingsPage';

import './App.css';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'lofi');

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // Cette fonction s'exécute chaque fois que le thème change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/ItJobFinder/settings" element={<SettingsPage changeTheme={changeTheme} />} />
        <Route path="/ItJobFinder/" element={<FeedList />} />
      </Routes>
    </Router>
  );
}

export default App;
