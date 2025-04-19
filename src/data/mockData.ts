import { CommunityMood } from '../types';

export const mockCommunityMood: CommunityMood = {
  date: new Date(),
  moodCounts: {
    '😊': 23,
    '😌': 18,
    '😐': 15,
    '😔': 12,
    '😫': 10,
    '😄': 8,
    '😴': 7,
    '🤔': 5
  },
  averageSentiment: 0.15,
  totalEntries: 98,
  quotes: [
    "Taking it one day at a time.",
    "Feeling better after a good night's sleep!",
    "Midterms are stressing me out, but I'll get through this.",
    "Beautiful day outside - lifted my mood!",
    "Just finished a big project. Exhausted but proud.",
    "Trying to stay positive despite the rain.",
    "Coffee makes everything better :)",
    "Missing home today."
  ]
};

export const getMockBadgeProgress = (badgeId: string) => {
  const badgeProgress = {
    'first-checkin': { current: 1, target: 1 },
    'three-day-streak': { current: 2, target: 3 },
    'week-streak': { current: 2, target: 7 },
    'all-emotions': { current: 4, target: 12 },
    'journaling': { current: 3, target: 5 }
  };
  
  return badgeProgress[badgeId as keyof typeof badgeProgress] || { current: 0, target: 1 };
};