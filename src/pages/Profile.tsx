import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Flame, Trash2, AlertCircle } from 'lucide-react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { useUser } from '../context/UserContext';
import { useMood } from '../context/MoodContext';
import { getMockBadgeProgress } from '../data/mockData';
import { getStreakMessage } from '../data/moodOptions';

const Profile: React.FC = () => {
  const { user, isGuest, clearUserData, logout } = useUser();
  const { calculateStreak } = useMood();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Redirect if not logged in and not a guest
  if (!user && !isGuest) {
    navigate('/login');
    return null;
  }
  
  const streak = calculateStreak();
  const streakMessage = getStreakMessage(streak);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {isGuest ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700 dark:text-yellow-200">
                  You're using Snug as a guest. Your data won't be saved between sessions.{' '}
                  <a href="/login" className="font-medium underline">Sign up</a> to track your mood over time.
                </p>
              </div>
            </div>
          </div>
        ) : null}
        
        <div className="mb-8">
          <Card>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                  {isGuest ? 'Guest Profile' : `${user?.name}'s Profile`}
                </h1>
                {!isGuest && (
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Welcome back! You're doing great.
                  </p>
                )}
              </div>
              
              <div className="flex items-center bg-primary-50 dark:bg-primary-900/30 px-4 py-2 rounded-full">
                <Flame className="w-5 h-5 text-orange-500 mr-2" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Current Streak</div>
                  <div className="font-bold text-lg text-gray-900 dark:text-white">
                    {streak} Day{streak !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
            
            {streak > 0 && (
              <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  {streakMessage}
                </p>
              </div>
            )}
          </Card>
        </div>
        
        <div className="mb-8">
          <Card>
            <div className="flex items-center mb-4">
              <Award className="w-6 h-6 text-primary-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Badges & Achievements</h2>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(user?.badges || []).map((badge) => {
                const progress = getMockBadgeProgress(badge.id);
                const earned = badge.earned;
                
                return (
                  <motion.div
                    key={badge.id}
                    className={`
                      p-4 rounded-lg border 
                      ${earned 
                        ? 'border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/20' 
                        : 'border-gray-200 dark:border-gray-700'}
                    `}
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="flex items-start">
                      <div className="text-3xl mr-3">{badge.icon}</div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{badge.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {badge.description}
                        </p>
                        
                        {/* Progress bar */}
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Progress: {progress.current}/{progress.target}</span>
                            {earned && <span>Completed!</span>}
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${earned ? 'bg-primary-500' : 'bg-gray-400 dark:bg-gray-600'}`}
                              style={{ width: `${(progress.current / progress.target) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </div>
        
        <div className="mb-8">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Account Settings
            </h2>
            
            <div className="space-y-4">
              {!isGuest && (
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                    Clear Data History
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    This will remove all your mood entries and reset your streaks and badges. This action cannot be undone.
                  </p>
                  
                  {showDeleteConfirm ? (
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4">
                      <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                        Are you sure you want to delete all your data? This cannot be undone.
                      </p>
                      <div className="flex space-x-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowDeleteConfirm(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          variant="primary" 
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            clearUserData();
                            setShowDeleteConfirm(false);
                          }}
                        >
                          Confirm Delete
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      Clear Data
                    </Button>
                  )}
                </div>
              )}
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                  {isGuest ? 'Create an Account' : 'Log Out'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {isGuest 
                    ? 'Create an account to save your mood history and track your progress over time.'
                    : 'Log out of your account. Your data will remain saved for when you return.'
                  }
                </p>
                
                <Button
                  variant={isGuest ? 'primary' : 'outline'}
                  onClick={() => {
                    if (isGuest) {
                      navigate('/login');
                    } else {
                      logout();
                      navigate('/');
                    }
                  }}
                >
                  {isGuest ? 'Sign Up' : 'Log Out'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;