import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-neutral flex items-center justify-between mb-8 text-neutral-content">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu bg-neutral text-neutral-content menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link className="hover:bg-secondary hover:text-secondary-content" to="/">Homepage</Link></li>
            <li><Link className="hover:bg-secondary hover:text-secondary-content" to="/settings">Settings</Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center flex-grow text-center">
        <Link to="/" className="btn btn-ghost normal-case text-2xl w-full">Jobs 2list</Link>
      </div>
      <div className="navbar-end">

      </div>
    </div>
  );
};

export default Navbar;
