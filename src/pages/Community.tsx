import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Activity, MessageSquareQuote } from 'lucide-react';
import Card from '../components/shared/Card';
import { useMood } from '../context/MoodContext';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'moods' | 'quotes'>('moods');
  const { communityMood } = useMood();
  
  // Format date for display
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(communityMood.date);
  
  // Sort emojis by count (descending)
  const sortedMoods = Object.entries(communityMood.moodCounts)
    .sort(([, countA], [, countB]) => countB - countA);
  
  // Calculate the max count for the emoji bars
  const maxCount = Math.max(...Object.values(communityMood.moodCounts));
  
  // Determine the overall campus mood sentiment
  const getMoodDescription = (sentiment: number) => {
    if (sentiment >= 0.5) return 'Positive';
    if (sentiment >= 0.1) return 'Somewhat Positive';
    if (sentiment > -0.1) return 'Neutral';
    if (sentiment > -0.5) return 'Somewhat Negative';
    return 'Negative';
  };
  
  const campusMood = getMoodDescription(communityMood.averageSentiment);
  const moodColor = communityMood.averageSentiment >= 0.1
    ? 'text-green-500'
    : communityMood.averageSentiment <= -0.1
      ? 'text-orange-500'
      : 'text-blue-500';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4">
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
              Campus Mood
            </h1>
            <img
              src="/sjsu-spartan.png"
              alt="SJSU Spartan Logo"
              className="h-12 w-auto"
            />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Anonymous insights into how SJSU students are feeling today
          </p>
        </div>
        
        <div className="mb-8">
          <Card>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  Community Snapshot
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {formattedDate} • {communityMood.totalEntries} check-ins today
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  Campus Mood: <span className={`font-medium ${moodColor}`}>{campusMood}</span>
                </span>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex space-x-6">
                <button
                  className={`
                    pb-3 font-medium text-sm flex items-center space-x-2
                    ${activeTab === 'moods' 
                      ? 'text-primary-500 border-b-2 border-primary-500' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
                  `}
                  onClick={() => setActiveTab('moods')}
                >
                  <BarChart className="w-4 h-4" />
                  <span>Mood Distribution</span>
                </button>
                
                <button
                  className={`
                    pb-3 font-medium text-sm flex items-center space-x-2
                    ${activeTab === 'quotes' 
                      ? 'text-primary-500 border-b-2 border-primary-500' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
                  `}
                  onClick={() => setActiveTab('quotes')}
                >
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>Anonymous Thoughts</span>
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'moods' ? (
              <div className="space-y-4">
                {sortedMoods.map(([emoji, count]) => (
                  <div key={emoji} className="flex items-center space-x-4">
                    <div className="text-2xl w-10 flex justify-center">{emoji}</div>
                    <div className="flex-1">
                      <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary-500 rounded-full flex items-center px-3"
                          style={{ width: `${(count / maxCount) * 100}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / maxCount) * 100}%` }}
                          transition={{ duration: 1, delay: 0.1 }}
                        >
                          <span className="text-white text-xs font-medium">
                            {count}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {communityMood.quotes.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {communityMood.quotes.map((quote, index) => (
                      <motion.div 
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-2 border-primary-300 dark:border-primary-700"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <p className="text-gray-700 dark:text-gray-300 italic">"{quote}"</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center italic py-8">
                    No thoughts shared today.
                  </p>
                )}
              </div>
            )}
          </Card>
        </div>
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            All data is anonymous and aggregated. Individual check-ins are never shared.
          </p>
          <p className="mt-1">
            Note: Campus data is simulated for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Community;