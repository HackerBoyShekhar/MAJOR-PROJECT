import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, UtensilsCrossed } from 'lucide-react';

const Navbar = ({ darkMode, toggleTheme }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-dark-200/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg group-hover:scale-105 transition-transform duration-300">
            <UtensilsCrossed className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <span className="font-display font-bold text-xl text-slate-900 dark:text-slate-100 hidden sm:block">
            Love<span className="text-primary-600 dark:text-primary-500">Bites</span>
          </span>
        </Link>
        
        {/* Links */}
        <div className="flex items-center gap-2 sm:gap-6">
          <Link 
            to="/menu" 
            className={`px-3 py-2 rounded-xl font-bold transition-all ${location.pathname === '/menu' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-dark-100'}`}
          >
            Menu
          </Link>
          <Link 
            to="/status" 
            className={`px-3 py-2 rounded-xl font-bold transition-all ${location.pathname === '/status' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-dark-100'}`}
          >
            Radar
          </Link>
          <Link 
            to="/contact" 
            className={`px-3 py-2 rounded-xl font-bold transition-all ${location.pathname === '/contact' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-dark-100'}`}
          >
            Contact
          </Link>
          <Link 
            to="/profile" 
            className={`px-3 py-2 rounded-xl font-bold transition-all ${location.pathname === '/profile' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-dark-100'}`}
          >
            Profile
          </Link>
          <Link 
            to="/admin" 
            className={`px-3 py-2 rounded-xl font-bold transition-all hidden lg:block ${isAdminPage ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-dark-100'}`}
          >
            Admin
          </Link>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
