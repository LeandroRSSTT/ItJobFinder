import React, { useState, useEffect } from 'react'; // Ajoutez useEffect ici
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import FeedList from './Pages/FeedList';
import Navbar from './Navigation/Navbar';
import SettingsPage from './Pages/SettingsPage';
import Footer from './Components/Footer';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // Cette fonction s'exécute chaque fois que le thème change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <div id="content" className="flex-grow">
          <Routes>
            <Route path="/settings" element={<SettingsPage changeTheme={changeTheme} />} />
            <Route path="/" element={<FeedList />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
