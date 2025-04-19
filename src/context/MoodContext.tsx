import React, { createContext, useState, useContext, useEffect } from 'react';
import { MoodEntry, MoodEmoji, CommunityMood } from '../types';
import { useUser } from './UserContext';
import { generateId, formatDate } from '../utils/helpers';
import { moodOptions } from '../data/moodOptions';
import { mockCommunityMood } from '../data/mockData';

interface MoodContextType {
  entries: MoodEntry[];
  communityMood: CommunityMood;
  addEntry: (emoji: string, note?: string) => void;
  getEntriesByDate: (date: Date) => MoodEntry | undefined;
  getEntriesForMonth: (year: number, month: number) => MoodEntry[];
  getMoodEmoji: (emoji: string) => MoodEmoji | undefined;
  calculateStreak: () => number;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isGuest, updateUser } = useUser();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [communityMood, setCommunityMood] = useState<CommunityMood>(mockCommunityMood);

  // Load saved entries on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    if (savedEntries) {
      // Parse the JSON string, then convert date strings back to Date objects
      const parsedEntries: MoodEntry[] = JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
      
      setEntries(parsedEntries);
    }
  }, []);

  // Calculate and update user streak when entries change
  useEffect(() => {
    if (user && !isGuest) {
      const streak = calculateStreak();
      if (streak !== user.streak) {
        updateUser({ streak });
      }
    }
  }, [entries, user, isGuest, updateUser]);

  // Add a new mood entry
  const addEntry = (emoji: string, note?: string) => {
    const moodOption = moodOptions.find(option => option.emoji === emoji);
    
    if (!moodOption) return;
    
    const newEntry: MoodEntry = {
      id: generateId(),
      date: new Date(),
      emoji,
      sentiment: moodOption.sentiment,
      note,
      userId: user?.id
    };
    
    // Replace any entry from the same day or add a new one
    const todayStr = formatDate(new Date());
    const otherEntries = entries.filter(entry => 
      formatDate(entry.date) !== todayStr
    );
    
    const updatedEntries = [...otherEntries, newEntry];
    setEntries(updatedEntries);
    
    // Save to localStorage
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
    
    // Update mock community mood (in a real app, this would be an API call)
    updateCommunityMood(emoji, note);
  };

  // Update the mock community mood data when a new entry is added
  const updateCommunityMood = (emoji: string, note?: string) => {
    setCommunityMood(prev => {
      const updatedCounts = { ...prev.moodCounts };
      updatedCounts[emoji] = (updatedCounts[emoji] || 0) + 1;
      
      const updatedQuotes = [...prev.quotes];
      if (note && note.length > 5) {
        // Add the note to quotes if it's substantial
        updatedQuotes.push(note);
        if (updatedQuotes.length > 10) {
          // Keep only the 10 most recent quotes
          updatedQuotes.shift();
        }
      }
      
      // Recalculate average sentiment
      const moodOption = moodOptions.find(option => option.emoji === emoji);
      const newSentiment = moodOption ? moodOption.sentiment : 0;
      const newAverage = 
        (prev.averageSentiment * prev.totalEntries + newSentiment) / 
        (prev.totalEntries + 1);
      
      return {
        ...prev,
        moodCounts: updatedCounts,
        totalEntries: prev.totalEntries + 1,
        averageSentiment: newAverage,
        quotes: updatedQuotes
      };
    });
  };

  // Get a mood entry for a specific date
  const getEntriesByDate = (date: Date): MoodEntry | undefined => {
    const dateStr = formatDate(date);
    return entries.find(entry => formatDate(entry.date) === dateStr);
  };

  // Get all entries for a specific month
  const getEntriesForMonth = (year: number, month: number): MoodEntry[] => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getFullYear() === year && entryDate.getMonth() === month;
    });
  };

  // Get mood emoji details
  const getMoodEmoji = (emoji: string): MoodEmoji | undefined => {
    return moodOptions.find(option => option.emoji === emoji);
  };

  // Calculate the current streak
  const calculateStreak = (): number => {
    if (entries.length === 0) return 0;
    
    // Sort entries by date (newest first)
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if there's an entry for today
    const latestEntry = new Date(sortedEntries[0].date);
    latestEntry.setHours(0, 0, 0, 0);
    
    if (latestEntry.getTime() !== today.getTime() && 
        latestEntry.getTime() !== today.getTime() - 86400000) {
      // No entry for today or yesterday, streak is broken
      return 0;
    }
    
    // Count consecutive days
    let streak = 1;
    let expectedDate = new Date(latestEntry);
    
    for (let i = 1; i < sortedEntries.length; i++) {
      expectedDate.setDate(expectedDate.getDate() - 1);
      const entryDate = new Date(sortedEntries[i].date);
      entryDate.setHours(0, 0, 0, 0);
      
      if (entryDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  return (
    <MoodContext.Provider value={{
      entries,
      communityMood,
      addEntry,
      getEntriesByDate,
      getEntriesForMonth,
      getMoodEmoji,
      calculateStreak
    }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = (): MoodContextType => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};