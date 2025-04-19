import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Moon, Sun, User, LogOut, MessageSquare } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isGuest, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { to: '/checkin', label: 'Check In' },
    { to: '/calendar', label: 'Calendar' },
    { to: '/community', label: 'Community' },
    { to: '/snuggie', label: 'Chat with Snuggie', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex items-center space-x-2 text-primary-500 hover:text-primary-600 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <img src="/snug-logo.svg" alt="Snug Logo" className="w-8 h-8" />
            <span className="font-display font-bold text-xl">Snug</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-1 text-sm font-medium ${
                    isActive
                      ? 'text-primary-500'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                  } transition-colors`
                }
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </NavLink>
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

            {user || isGuest ? (
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
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 space-y-2"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-md text-sm font-medium ${
                    isActive
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  } transition-colors`
                }
              >
                <span className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              </NavLink>
            ))}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              {user || isGuest ? (
                <>
                  <NavLink
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded-md text-sm font-medium ${
                        isActive
                          ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      } transition-colors`
                    }
                  >
                    <span className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </span>
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-4 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="flex items-center space-x-2">
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </span>
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 px-4 rounded-md text-sm font-medium text-center text-white bg-primary-500 hover:bg-primary-600 transition-colors"
                >
                  Login / Sign Up
                </NavLink>
              )}

              <button
                onClick={() => {
                  toggleTheme();
                  setMenuOpen(false);
                }}
                className="w-full mt-2 py-2 px-4 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <span className="flex items-center space-x-2">
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
                </span>
              </button>
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;