import React, { useState, useEffect } from 'react'; // Added hooks
import { Link } from 'react-router-dom';

const Navbar = () => {
  // 1. Logic to handle the theme state
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "emerald"
  );

  // 2. Update the <html> tag whenever the theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("emerald");
    }
  };

  return (
    <div className="navbar bg-base-100 border-b border-base-200 px-4 md:px-12 sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-200 text-base-content">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/contracts">My Contracts</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </div>
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-xl">L</div>
          <span className="text-xl font-black tracking-tighter hidden sm:block italic">LegallySimple</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold gap-2">
          <li><Link to="/dashboard" className="rounded-lg hover:bg-primary/10">Dashboard</Link></li>
          <li><Link to="/contracts" className="rounded-lg hover:bg-primary/10">Contracts</Link></li>
          <li><Link to="/wallet" className="rounded-lg hover:bg-primary/10 text-success">Wallet</Link></li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>

        {/* --- FIXED THEME TOGGLE --- */}
        <label className="swap swap-rotate btn btn-ghost btn-circle">
          <input 
            type="checkbox" 
            onChange={handleToggle} 
            // Ensures the checkbox stays checked if we are in dark mode
            checked={theme === "dark" ? true : false} 
          />
          {/* Sun icon (shows when theme is dark) */}
          <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
          {/* Moon icon (shows when theme is emerald) */}
          <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.69Z"/></svg>
        </label>

        {/* User Avatar */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://ui-avatars.com/api/?name=User&background=10B981&color=fff" alt="avatar" />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-200">
            <li className="menu-title text-base-content/50">Account</li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><button className="text-error">Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;