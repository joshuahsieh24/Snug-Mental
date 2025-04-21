import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/shared/Button';
import { useUser } from '../context/UserContext';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, continueAsGuest } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin && !name) {
      setError('Please enter your name');
      return;
    }

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    // In a real app, this would call an authentication API
    // For this demo, we'll just log the user in directly
    login(isLogin ? email.split('@')[0] : name);
    navigate('/checkin');
  };

  const handleGuestLogin = () => {
    continueAsGuest();
    navigate('/checkin');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <motion.div
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <img src="/hugging-face.png" alt="Hugging Face Logo" className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {isLogin 
              ? 'Snug remembers your moods, so you don\'t have to.'
              : 'Start tracking your mental wellness journey today.'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" fullWidth>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6">
          <Button 
            variant="outline" 
            fullWidth 
            onClick={handleGuestLogin}
          >
            Continue as Guest
          </Button>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
          </button>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-center text-gray-500 dark:text-gray-400">
          <p>
            By continuing, you agree to our <a href="/privacy" className="underline">Privacy Policy</a>.
          </p>
          <p className="mt-2">
            For demo purposes only. No actual authentication is implemented.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;