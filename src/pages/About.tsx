import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

const About: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
              About Snug
            </h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Snug is a lightweight mental health tracking app designed specifically for students and young adults. 
                Our mission is to make emotional awareness accessible, simple, and even a little fun.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                Our Approach
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300">
                Mental health doesn't have to be heavy or clinical. Snug focuses on:
              </p>
              
              <ul className="list-disc pl-6 mt-3 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Simplicity:</strong> Quick emoji check-ins that take seconds, not minutes
                </li>
                <li>
                  <strong>Visual tracking:</strong> See your emotional patterns with our emoji calendar
                </li>
                <li>
                  <strong>Community connection:</strong> Anonymous campus-wide mood trends to help you feel less alone
                </li>
                <li>
                  <strong>Gentle encouragement:</strong> Streaks and badges to build healthy habits
                </li>
                <li>
                  <strong>Privacy-first:</strong> Your data remains yours, with options to use offline or anonymously
                </li>
              </ul>
              
              <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl my-8">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Brain className="w-8 h-8 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Why Track Your Mood?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Research shows that emotional awareness is a key component of mental wellness. By taking a moment 
                      to check in with yourself daily, you can:
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Identify patterns in your emotional responses</li>
                      <li>Notice how external factors affect your wellbeing</li>
                      <li>Build resilience through self-reflection</li>
                      <li>Develop a more nuanced emotional vocabulary</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
                Important Disclaimer
              </h2>
              
              <div className="flex items-start mb-6">
                <ShieldCheck className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1 mr-2 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300 italic">
                  Snug is not a replacement for professional mental health care. If you're experiencing a crisis 
                  or need immediate support, please contact your campus counseling services, call/text 988, 
                  or reach out to a trusted person in your life.
                </p>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <div className="flex justify-center">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-red-500 mr-2 animate-pulse-slow" />
                    <p className="text-gray-700 dark:text-gray-300">
                      Made with care for students everywhere
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="text-center mb-8">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/checkin')}
            >
              Start Checking In
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;