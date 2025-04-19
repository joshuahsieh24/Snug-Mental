import { MoodEmoji } from '../types';

export const moodOptions: MoodEmoji[] = [
  {
    emoji: '😊',
    label: 'Happy',
    sentiment: 0.8
  },
  {
    emoji: '😄',
    label: 'Excited',
    sentiment: 0.9
  },
  {
    emoji: '😌',
    label: 'Content',
    sentiment: 0.6
  },
  {
    emoji: '😐',
    label: 'Neutral',
    sentiment: 0
  },
  {
    emoji: '😕',
    label: 'Confused',
    sentiment: -0.3
  },
  {
    emoji: '😔',
    label: 'Sad',
    sentiment: -0.7
  },
  {
    emoji: '😡',
    label: 'Angry',
    sentiment: -0.8
  },
  {
    emoji: '😫',
    label: 'Stressed',
    sentiment: -0.6
  },
  {
    emoji: '😴',
    label: 'Tired',
    sentiment: -0.4
  },
  {
    emoji: '🥰',
    label: 'Loved',
    sentiment: 0.9
  },
  {
    emoji: '🤔',
    label: 'Thoughtful',
    sentiment: 0.1
  },
  {
    emoji: '😮',
    label: 'Surprised',
    sentiment: 0.2
  }
];

export const getMotivationalMessage = (sentiment: number, streak: number): string => {
  // Very negative mood
  if (sentiment <= -0.7) {
    return "It's okay to not be okay. Remember that feelings are temporary and you're doing your best. Consider reaching out to someone today.";
  }
  
  // Somewhat negative mood
  if (sentiment < 0) {
    return "Everyone has ups and downs. Take a moment for yourself today - even a short walk or deep breath can help shift your perspective.";
  }
  
  // Neutral mood
  if (sentiment < 0.3) {
    return "You're showing up for yourself by checking in - that's something to be proud of! What's one small thing you could do today to boost your mood?";
  }
  
  // Positive mood
  if (sentiment < 0.7) {
    return "You're doing great! This positive energy can help you accomplish something meaningful today. What will you channel it toward?";
  }
  
  // Very positive mood
  return "Wonderful! Your positive state can be contagious - consider sharing some of this good energy with someone else today!";
};

export const getStreakMessage = (streak: number): string => {
  if (streak === 0) {
    return "Start your check-in journey today!";
  }
  if (streak === 1) {
    return "First day checked in! Beginning of a great habit.";
  }
  if (streak < 3) {
    return `${streak} days in a row! Keep it going!`;
  }
  if (streak < 7) {
    return `${streak}-day streak! You're building a solid routine.`;
  }
  if (streak < 14) {
    return `Impressive ${streak}-day streak! You're making this a habit!`;
  }
  if (streak < 30) {
    return `Amazing ${streak}-day streak! Your consistency is inspiring!`;
  }
  return `${streak} DAYS! You're a check-in champion! 🏆`;
};