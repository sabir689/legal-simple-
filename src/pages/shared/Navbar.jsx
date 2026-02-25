import React, { useState, useEffect, useLayoutEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const location = useLocation();

  // 1. Theme Sync - useLayoutEffect prevents the "white flash" on load
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 2. Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY > 20;
      // Functional update prevents unnecessary re-renders
      setIsScrolled(prev => (prev !== offset ? offset : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. FIXED: Route Change Logic
  // We use requestAnimationFrame to move the setState call out of the 
  // synchronous effect body, satisfying the "cascading render" warning.
  useEffect(() => {
    if (isOpen) {
      const handle = requestAnimationFrame(() => {
        setIsOpen(false);
      });
      return () => cancelAnimationFrame(handle);
    }
  }, [location.pathname, isOpen]);

  const toggleTheme = () => setTheme(p => (p === 'dark' ? 'light' : 'dark'));

  const navLinks = [
    { name: 'Features', path: '#features' },
    { name: 'Pricing', path: '#pricing' },
    { name: 'How It Works', path: '#works' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled || isOpen 
        ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md py-4 border-b border-zinc-200 dark:border-white/10' 
        : 'bg-transparent py-7 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 z-[110]">
          <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase">
            Legally<span className="text-[#4f46e5] italic">Simple</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-7">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.path} 
                className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 hover:text-[#4f46e5] dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 border-l border-zinc-200 dark:border-white/10 pl-8">
            <button 
              onClick={toggleTheme} 
              className="text-lg p-1 hover:scale-110 transition-transform focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white hover:opacity-70">
              Login
            </Link>
            <Link to="/get-started">
              <button className="bg-[#4f46e5] text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:brightness-110 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden z-[110] p-2 text-zinc-900 dark:text-white focus:outline-none"
        >
          <div className="flex flex-col gap-1.5 items-end">
            <Motion.span animate={isOpen ? { rotate: 45, y: 8, width: 24 } : { rotate: 0, y: 0, width: 24 }} className="h-0.5 bg-current block" />
            <Motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="h-0.5 w-4 bg-[#4f46e5] block" />
            <Motion.span animate={isOpen ? { rotate: -45, y: -8, width: 24 } : { rotate: 0, y: 0, width: 24 }} className="h-0.5 bg-current block" />
          </div>
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 bg-white dark:bg-black z-[105] flex flex-col justify-center items-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.path} className="text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
                {link.name}
              </a>
            ))}
            <Link to="/get-started" className="mt-4 bg-[#4f46e5] text-white px-10 py-4 font-black uppercase text-xs tracking-widest">
              Get Started
            </Link>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;