import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  onClick,
  interactive = false
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 transition-all duration-200';
  const interactiveClasses = interactive 
    ? 'cursor-pointer hover:shadow-md' 
    : '';

  return (
    <motion.div
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
      whileHover={interactive ? { y: -4 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
          {title}
        </h3>
      )}
      {children}
    </motion.div>
  );
};

export default Card;