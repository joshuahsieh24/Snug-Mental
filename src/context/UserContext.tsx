import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, Badge } from '../types';
import { generateId } from '../utils/helpers';
import { auth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface UserContextType {
  user: User | null;
  isGuest: boolean;
  login: (name: string) => void;
  logout: () => void;
  continueAsGuest: () => void;
  updateUser: (updates: Partial<User>) => void;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Initial badges that all users can earn
const initialBadges: Badge[] = [
  {
    id: 'first-checkin',
    name: 'First Check-in',
    description: 'Completed your first mood check-in',
    icon: '🎯',
    earned: false
  },
  {
    id: 'three-day-streak',
    name: 'On a Roll',
    description: 'Checked in for 3 days in a row',
    icon: '🔥',
    earned: false
  },
  {
    id: 'week-streak',
    name: 'Consistency Champion',
    description: 'Checked in for 7 days in a row',
    icon: '🏆',
    earned: false
  },
  {
    id: 'all-emotions',
    name: 'Emotional Range',
    description: 'Used all different mood emojis',
    icon: '🌈',
    earned: false
  },
  {
    id: 'journaling',
    name: 'Thoughtful Reflection',
    description: 'Added journal notes to 5 check-ins',
    icon: '✍️',
    earned: false
  }
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Create or update user in UserContext when Firebase user exists
        const newUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          streak: 0,
          badges: [...initialBadges],
          prefersDarkMode: false
        };
        setUser(newUser);
        setIsGuest(false);
        localStorage.setItem('snugUser', JSON.stringify(newUser));
        localStorage.removeItem('snugGuest');
      } else {
        // Clear user when Firebase user is null
        setUser(null);
        setIsGuest(false);
        localStorage.removeItem('snugUser');
        localStorage.removeItem('snugGuest');
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (name: string) => {
    const newUser: User = {
      id: generateId(),
      name,
      streak: 0,
      badges: [...initialBadges],
      prefersDarkMode: false
    };
    
    setUser(newUser);
    setIsGuest(false);
    localStorage.setItem('snugUser', JSON.stringify(newUser));
    localStorage.removeItem('snugGuest');
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    localStorage.setItem('snugGuest', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('snugUser');
    localStorage.removeItem('snugGuest');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('snugUser', JSON.stringify(updatedUser));
  };

  const clearUserData = () => {
    // Keep the user logged in but clear their data
    if (user) {
      const clearedUser = {
        ...user,
        streak: 0,
        badges: initialBadges // Reset badges to initial state
      };
      setUser(clearedUser);
      localStorage.setItem('snugUser', JSON.stringify(clearedUser));
    }
    
    // Clear mood data and other user-related data
    localStorage.removeItem('moodEntries');
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isGuest, 
      login, 
      logout, 
      continueAsGuest, 
      updateUser,
      clearUserData
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};