export interface User {
  id: string;
  name: string;
  streak: number;
  badges: Badge[];
  prefersDarkMode: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

export interface MoodEntry {
  id: string;
  date: Date;
  emoji: string;
  sentiment: number; // -1 to 1 sentiment score
  note?: string;
  userId?: string; // optional for guest mode
}

export interface CommunityMood {
  date: Date;
  moodCounts: {
    [emoji: string]: number;
  };
  averageSentiment: number;
  totalEntries: number;
  quotes: string[];
}

export type MoodEmoji = {
  emoji: string;
  label: string;
  sentiment: number;
}

export type ThemeMode = 'light' | 'dark';