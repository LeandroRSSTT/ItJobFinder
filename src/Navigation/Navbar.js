import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-base-300 flex items-center justify-between mb-4 text-base-content">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu bg-base-300 text-base-content menu-sm dropdown-content mt-3 p-2 shadow rounded-box w-52">
            <li><Link className="hover:bg-primary hover:text-primary-content" to="/">Homepage</Link></li>
            <li><Link className="hover:bg-primary hover:text-primary-content" to="/settings">Settings</Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center flex-grow text-center">
        <Link to="/" className="normal-case text-2xl w-full">Job finder</Link>
      </div>
      <div className="navbar-end">

      </div>
    </div>
  );
};

export default Navbar;
