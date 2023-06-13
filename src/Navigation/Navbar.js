import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar bg-neutral flex items-center justify-between mb-8 text-neutral-content">
      <div className="navbar-start">
        <div className="dropdown">
          <button onClick={toggleMenu} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          {isOpen && (
            <ul tabIndex={0} className="menu bg-neutral text-neutral-content menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link onClick={toggleMenu} className="hover:bg-secondary hover:text-secondary-content" to="/">Homepage</Link></li>
              <li><Link onClick={toggleMenu} className="hover:bg-secondary hover:text-secondary-content" to="/settings">Settings</Link></li>
            </ul>
          )}
        </div>
      </div>
      <div className="navbar-center flex-grow text-center">
        <Link to="/" className="btn btn-ghost normal-case text-2xl w-full">Jobs list</Link>
      </div>
      <div className="navbar-end">
        {/* Add any additional elements here if needed */}
      </div>
    </div>
  );
};

export default Navbar;
