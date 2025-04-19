import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Database } from 'lucide-react';
import Card from '../components/shared/Card';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <div className="flex items-center mb-6">
              <ShieldCheck className="w-8 h-8 text-primary-500 mr-3" />
              <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                Privacy Policy
              </h1>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                At Snug, we take your privacy seriously. This policy explains how we handle your data.
              </p>
              
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Lock className="w-5 h-5 text-primary-500 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Data We Collect
                  </h2>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  When you use Snug, we collect:
                </p>
                
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Account information:</strong> If you create an account, we store your name and email
                  </li>
                  <li>
                    <strong>Mood entries:</strong> The emojis you select and any optional journal notes
                  </li>
                  <li>
                    <strong>Usage data:</strong> How often you check in, which helps calculate streaks and badges
                  </li>
                </ul>
                
                <p className="text-gray-700 dark:text-gray-300 italic">
                  Guest usage: If you use Snug as a guest, we only store data locally on your device.
                </p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Database className="w-5 h-5 text-primary-500 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    How We Use Your Data
                  </h2>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your data is used to:
                </p>
                
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Provide the core functionality of mood tracking and visualization</li>
                  <li>Generate your personal calendar, streaks, and achievement badges</li>
                  <li>Create anonymous, aggregated campus mood trends (no individual data is identifiable)</li>
                </ul>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
                  <p className="text-green-800 dark:text-green-200 font-medium">What we DON'T do with your data:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-green-700 dark:text-green-300">
                    <li>We never sell your personal information to third parties</li>
                    <li>We don't share your journal entries with anyone</li>
                    <li>We don't use your data for targeted advertising</li>
                  </ul>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Your Rights and Control
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You have complete control over your data:
                </p>
                
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Delete your data:</strong> You can clear all your mood entries and reset your progress at any time
                  </li>
                  <li>
                    <strong>Use offline mode:</strong> Choose to store data only on your device
                  </li>
                  <li>
                    <strong>Guest mode:</strong> Use the app without creating an account
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: June 1, 2025
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  This is a demonstration app. In a real application, this would be a comprehensive legal document.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;