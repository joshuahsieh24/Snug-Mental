import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import MoodEmoji from '../components/shared/MoodEmoji';
import { moodOptions, getMotivationalMessage } from '../data/moodOptions';
import { useMood } from '../context/MoodContext';
import { useUser } from '../context/UserContext';

const MoodCheck: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  
  const { user } = useUser();
  const { addEntry, calculateStreak } = useMood();
  const navigate = useNavigate();
  
  const handleMoodSelect = (emoji: string) => {
    setSelectedMood(emoji);
    // Generate a motivational message based on the selected mood
    const moodOption = moodOptions.find(option => option.emoji === emoji);
    if (moodOption) {
      setMotivationalMessage(getMotivationalMessage(moodOption.sentiment, calculateStreak()));
    }
  };
  
  const handleSubmit = () => {
    if (selectedMood) {
      addEntry(selectedMood, note);
      setIsSubmitted(true);
    }
  };
  
  const resetForm = () => {
    setSelectedMood(null);
    setNote('');
    setIsSubmitted(false);
    setMotivationalMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="check-in-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-8">
                <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white text-center mb-6">
                  How are you feeling today?
                </h1>
                
                <div className="grid grid-cols-4 gap-3 mb-8">
                  {moodOptions.map((mood) => (
                    <MoodEmoji
                      key={mood.emoji}
                      mood={mood}
                      onClick={() => handleMoodSelect(mood.emoji)}
                      isSelected={selectedMood === mood.emoji}
                      showLabel
                    />
                  ))}
                </div>
                
                <AnimatePresence>
                  {selectedMood && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-6">
                        <label 
                          htmlFor="note" 
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Want to add a note? (Optional)
                        </label>
                        <textarea
                          id="note"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                          placeholder="What's on your mind today?"
                          rows={3}
                        />
                      </div>
                      
                      {motivationalMessage && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 border-l-4 border-primary-500">
                          <p className="text-gray-700 dark:text-gray-300 italic">
                            "{motivationalMessage}"
                          </p>
                        </div>
                      )}
                      
                      <Button 
                        variant="primary" 
                        fullWidth 
                        onClick={handleSubmit}
                      >
                        Submit Check-in
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
              
              {selectedMood === null && (
                <div className="text-center text-gray-600 dark:text-gray-400 italic">
                  Tap an emoji above to check in for today
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="check-in-success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <motion.div 
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                🎉
              </motion.div>
              
              <Card className="mb-6">
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                  You did it!
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Thanks for checking in today. Making this a daily habit can help you understand your emotional patterns over time.
                </p>
                
                {user && (
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Current streak: <span className="font-bold text-primary-600 dark:text-primary-400">{calculateStreak()} day{calculateStreak() !== 1 ? 's' : ''}</span>
                  </p>
                )}
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/calendar')}
                  >
                    View Calendar
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/community')}
                  >
                    See Community Moods
                  </Button>
                </div>
              </Card>
              
              <Button 
                variant="ghost" 
                onClick={resetForm}
              >
                Check in again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MoodCheck;