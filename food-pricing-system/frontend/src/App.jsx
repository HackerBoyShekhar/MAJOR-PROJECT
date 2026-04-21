import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Profile from './pages/Profile';
import Menu from './pages/Menu';
import TrackRadar from './pages/TrackRadar';
import Contact from './pages/Contact';
import FlowerRain from './components/FlowerRain';
import SparkleEffect from './components/SparkleEffect';
import CustomCursor from './components/CustomCursor';
import { ToastProvider } from './components/Toast';
import { AnimatePresence } from 'framer-motion';
import SignatureFooter from './components/SignatureFooter';

const AppContent = ({ darkMode, toggleTheme }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <CustomCursor />
      {/* 🌈 GLOBAL BACKGROUND ELEMENTS */}
      <div className="bg-animated-gradient" />
      <div className="grid-overlay" />
      <div className="center-glow" />
      <FlowerRain />
      <SparkleEffect />

      <div className="relative z-10">
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <main className="transition-all duration-300">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/status" element={<TrackRadar />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
        <SignatureFooter />
      </div>
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <ToastProvider>
        <AppContent darkMode={darkMode} toggleTheme={toggleTheme} />
      </ToastProvider>
    </Router>
  );
}

export default App;
