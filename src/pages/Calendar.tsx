import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../components/shared/Card';
import MoodEmoji from '../components/shared/MoodEmoji';
import { useMood } from '../context/MoodContext';
import { useUser } from '../context/UserContext';
import { moodOptions } from '../data/moodOptions';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  
  const { getEntriesForMonth, getEntriesByDate, getMoodEmoji } = useMood();
  const { user, isGuest } = useUser();
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);
  
  // Get all entries for the current month
  const monthEntries = getEntriesForMonth(currentDate.getFullYear(), currentDate.getMonth());
  
  // Generate calendar days including empty spots for proper alignment
  const daysToDisplay = Array(startDay).fill(null).concat(monthDays);
  
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
    setSelectedDay(null);
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
    setSelectedDay(null);
  };
  
  const handleDayClick = (day: Date | null) => {
    if (day) {
      setSelectedDay(day);
    }
  };
  
  // Get entry for the selected day
  const selectedDayEntry = selectedDay ? getEntriesByDate(selectedDay) : null;
  const selectedMoodEmoji = selectedDayEntry ? getMoodEmoji(selectedDayEntry.emoji) : null;
  
  if (!user && !isGuest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="text-center max-w-md">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Sign in to View Your Calendar
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Create an account or log in to track your mood over time and see your emoji calendar.
          </p>
          <a 
            href="/login" 
            className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full transition-colors"
          >
            Log In / Sign Up
          </a>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
              Your Mood Calendar
            </h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {format(currentDate, 'MMMM yyyy')}
              </span>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="mb-6">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {daysToDisplay.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="aspect-square"></div>;
                }
                
                const dateString = format(day, 'yyyy-MM-dd');
                const isToday = format(new Date(), 'yyyy-MM-dd') === dateString;
                const isSelected = selectedDay && format(selectedDay, 'yyyy-MM-dd') === dateString;
                
                // Find mood entry for this day
                const entry = monthEntries.find(
                  entry => format(new Date(entry.date), 'yyyy-MM-dd') === dateString
                );
                
                return (
                  <motion.div
                    key={dateString}
                    className={`
                      aspect-square rounded-lg flex flex-col items-center justify-center cursor-pointer
                      ${isToday ? 'bg-primary-100 dark:bg-primary-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                      ${isSelected ? 'ring-2 ring-primary-500' : ''}
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDayClick(day)}
                  >
                    <div className={`
                      text-sm font-medium mb-1
                      ${isToday ? 'text-primary-800 dark:text-primary-300' : 'text-gray-800 dark:text-gray-200'}
                    `}>
                      {format(day, 'd')}
                    </div>
                    {entry && (
                      <div className="text-xl" title={moodOptions.find(m => m.emoji === entry.emoji)?.label}>
                        {entry.emoji}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Selected Day Details */}
          {selectedDay && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                {format(selectedDay, 'EEEE, MMMM d, yyyy')}
              </h3>
              
              {selectedDayEntry ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0">
                  {selectedMoodEmoji && (
                    <div className="mr-6">
                      <MoodEmoji mood={selectedMoodEmoji} size="lg" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300 mb-1">
                      <span className="font-medium">Mood:</span> {selectedMoodEmoji?.label}
                    </p>
                    
                    {selectedDayEntry.note && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Journal Note:</p>
                        <p className="text-gray-800 dark:text-gray-200 mt-1 italic">
                          "{selectedDayEntry.note}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">
                  No mood check-in for this day.
                </p>
              )}
            </motion.div>
          )}
          
          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Mood Legend</h3>
            <div className="flex flex-wrap gap-3">
              {moodOptions.slice(0, 8).map((mood) => (
                <div key={mood.emoji} className="flex items-center space-x-1">
                  <span className="text-xl">{mood.emoji}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{mood.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;