import React from 'react';
import { motion } from 'framer-motion';
import { MoodEmoji as MoodEmojiType } from '../../types';

interface MoodEmojiProps {
  mood: MoodEmojiType;
  onClick?: () => void;
  isSelected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const MoodEmoji: React.FC<MoodEmojiProps> = ({
  mood,
  onClick,
  isSelected = false,
  size = 'md',
  showLabel = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };
  
  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={onClick}
        className={`
          ${sizeClasses[size]} 
          p-3 rounded-full 
          ${isSelected 
            ? 'bg-primary-100 dark:bg-primary-900 ring-2 ring-primary-500' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary-300
        `}
        aria-label={`Select mood: ${mood.label}`}
      >
        <span role="img" aria-label={mood.label}>
          {mood.emoji}
        </span>
      </button>
      
      {showLabel && (
        <span className="mt-1 text-xs text-gray-600 dark:text-gray-300">
          {mood.label}
        </span>
      )}
    </motion.div>
  );
};

export default MoodEmoji;