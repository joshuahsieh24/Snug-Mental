import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, User, LogOut, MessageSquare } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavClick = (to: string, requiresAuth: boolean) => {
    if (requiresAuth && !currentUser) {
      navigate('/login');
      return;
    }
    navigate(to);
    setMenuOpen(false);
  };

  const navItems = [
    { to: '/checkin', label: 'Check In', requiresAuth: false },
    { to: '/community', label: 'Community', requiresAuth: false },
    { to: '/calendar', label: 'Calendar', requiresAuth: true },
    { to: '/snuggie', label: 'Chat with Snuggie', icon: <MessageSquare className="w-4 h-4" />, requiresAuth: false },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex items-center space-x-2 text-primary-500 hover:text-primary-400 transition-colors group"
            onClick={() => setMenuOpen(false)}
          >
            <div className="relative">
              <img 
                src="/hugging-face.png" 
                alt="Hugging Face Logo" 
                className="w-8 h-8 transition-all duration-300 dark:filter dark:brightness-110 
                dark:drop-shadow-[0_0_8px_rgba(0,175,175,0.5)] group-hover:dark:drop-shadow-[0_0_12px_rgba(0,175,175,0.7)]" 
              />
            </div>
            <span className="font-display font-bold text-xl">Snug</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.to}
                onClick={() => handleNavClick(item.to, item.requiresAuth)}
                className={`flex items-center space-x-1 text-sm font-medium ${
                  window.location.pathname === item.to
                    ? 'text-primary-500'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                } transition-colors`}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {currentUser ? (
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center space-x-1 text-sm font-medium ${
                      isActive
                        ? 'text-primary-500'
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                    } transition-colors`
                  }
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </NavLink>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Login / Sign Up
              </NavLink>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}
          initial={false}
          animate={{ height: menuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.to}
                onClick={() => handleNavClick(item.to, item.requiresAuth)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium ${
                  window.location.pathname === item.to
                    ? 'text-primary-500'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                } transition-colors`}
              >
                <div className="flex items-center space-x-2">
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
              </button>
            ))}

            <div className="px-4 py-2">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            {currentUser ? (
              <div className="px-4 space-y-2">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 text-sm font-medium ${
                      isActive
                        ? 'text-primary-500'
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                    } transition-colors`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="px-4">
                <NavLink
                  to="/login"
                  className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Login / Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;