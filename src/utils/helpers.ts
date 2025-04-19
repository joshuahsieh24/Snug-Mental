// Generate a random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Format a date to YYYY-MM-DD string
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Simple sentiment analysis function (mock)
// In a real app, this would be an API call to a sentiment analysis service
export const analyzeSentiment = (text: string): number => {
  if (!text) return 0;
  
  const positiveWords = [
    'happy', 'joy', 'excited', 'great', 'good', 'love', 'wonderful', 'amazing',
    'excellent', 'fantastic', 'pleased', 'delighted', 'content'
  ];
  
  const negativeWords = [
    'sad', 'unhappy', 'depressed', 'angry', 'upset', 'frustrated', 'annoyed',
    'disappointed', 'terrible', 'horrible', 'awful', 'miserable', 'stressed'
  ];
  
  const words = text.toLowerCase().split(/\W+/);
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) score += 0.1;
    if (negativeWords.includes(word)) score -= 0.1;
  });
  
  // Clamp between -1 and 1
  return Math.max(-1, Math.min(1, score));
};

// Check if the app can work offline
export const canWorkOffline = (): boolean => {
  return 'serviceWorker' in navigator && 'localStorage' in window;
};

// Safely store data for offline use
export const storeOfflineData = (key: string, data: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error storing offline data:', error);
  }
};

// Retrieve offline data
export const getOfflineData = (key: string): any => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving offline data:', error);
    return null;
  }
};