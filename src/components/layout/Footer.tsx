import React from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Info, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto transition-colors duration-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="/hugging-face.png" alt="Hugging Face Logo" className="w-6 h-6 mr-2" />
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} Snug
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 items-center text-sm">
            <NavLink 
              to="/about" 
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors mb-2 md:mb-0"
            >
              <Info className="w-4 h-4 mr-1" />
              About
            </NavLink>
            
            <NavLink 
              to="/privacy" 
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors mb-2 md:mb-0"
            >
              <Shield className="w-4 h-4 mr-1" />
              Privacy
            </NavLink>
            
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse-slow" />
              <span>for mental wellness</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
          <p>
            Snug is not a substitute for professional mental health care.
            If you're experiencing a crisis, please contact your local mental health services or call/text 988.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;