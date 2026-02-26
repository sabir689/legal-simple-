import React, { useState, useEffect, useContext } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  // 1. Handle background transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Lock body scroll when mobile menu is open (External DOM sync - no error here)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // 3. Optimized handler to close menu without triggering cascading effects
  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  const handleLogout = async () => {
    closeMenu();
    try {
      await logOut();
    } catch (error) {
      console.error("Session termination failed", error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '#pricing' },
    { name: 'Process', path: '/process' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        isScrolled || isOpen
          ? 'bg-white dark:bg-[#050505] py-4 border-b border-zinc-200 dark:border-white/10 shadow-sm'
          : 'bg-transparent py-7 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" onClick={closeMenu} className="relative z-[1100] flex items-center gap-2">
          <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase">
            Legally<span className="text-[#4f46e5] italic text-2xl">Simple</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 hover:text-[#4f46e5] dark:hover:text-white transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* USER AUTH SECTION */}
          <div className="flex items-center gap-6 border-l border-zinc-200 dark:border-white/10 pl-10">
            {user ? (
              <div className="flex items-center gap-4 group">
                <div className="text-right hidden lg:block">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#4f46e5] leading-none mb-1">Verified User</p>
                  <p className="text-[11px] font-bold text-zinc-900 dark:text-white truncate max-w-[100px]">
                    {user.displayName || 'Legal Pro'}
                  </p>
                </div>
                
                <div className="relative">
                    <button className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#4f46e5] bg-zinc-100 dark:bg-zinc-800 transition-transform active:scale-90">
                        <img 
                            src={user.photoURL || 'https://via.placeholder.com/40'} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                        />
                    </button>
                    
                    <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <button 
                            onClick={handleLogout}
                            className="bg-red-500 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 shadow-xl hover:bg-red-600 whitespace-nowrap"
                        >
                            Terminate_Session
                        </button>
                    </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white hover:text-[#4f46e5] transition-colors">
                  Login
                </Link>
                <Link to="/register">
                  <button className="bg-[#4f46e5] text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#3f37c9] shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-[1100] p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col gap-1.5 items-end">
            <Motion.span 
              animate={isOpen ? { rotate: 45, y: 8, width: 28 } : { rotate: 0, y: 0, width: 28 }} 
              className="h-0.5 bg-zinc-900 dark:bg-white block origin-center" 
            />
            <Motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }} 
              className="h-0.5 w-5 bg-[#4f46e5] block" 
            />
            <Motion.span 
              animate={isOpen ? { rotate: -45, y: -8, width: 28 } : { rotate: 0, y: 0, width: 28 }} 
              className="h-0.5 bg-zinc-900 dark:bg-white block origin-center" 
            />
          </div>
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white dark:bg-[#050505] z-[1050] md:hidden flex flex-col p-10 pt-32"
          >
            <div className="flex flex-col gap-8">
                <p className="text-zinc-400 uppercase font-black tracking-[0.3em] text-[10px]">Registry Navigation</p>
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    onClick={closeMenu}
                    className="text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white hover:italic transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
            </div>

            <div className="mt-auto pb-10 border-t border-zinc-100 dark:border-white/5 pt-10">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={user.photoURL} className="w-12 h-12 rounded-xl border-2 border-[#4f46e5]" alt="User" />
                      <div>
                        <p className="text-xs font-black dark:text-white uppercase truncate max-w-[150px]">{user.displayName}</p>
                        <p className="text-[10px] text-[#4f46e5] font-black uppercase tracking-widest leading-none">Access: Verified</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout} 
                      className="text-[10px] font-black text-red-500 uppercase border border-red-500/20 px-4 py-2 hover:bg-red-500 hover:text-white transition-all"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/login" onClick={closeMenu} className="py-5 text-center border border-zinc-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest dark:text-white">
                        Login
                    </Link>
                    <Link to="/register" onClick={closeMenu} className="py-5 text-center bg-[#4f46e5] text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                        Register
                    </Link>
                  </div>
                )}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;