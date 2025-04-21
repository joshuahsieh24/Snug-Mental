import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import Card from '../components/shared/Card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'snuggie';
  sentiment?: {
    score: number;
    magnitude: number;
  };
  timestamp: Date;
}

const Snuggie: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialLoadRef = useRef(true);
  const hasScrolledRef = useRef(false);

  const scrollToBottom = () => {
    if (!initialLoadRef.current || hasScrolledRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: "Hi! I'm Snuggie, your emotional support companion. How are you feeling today?",
          sender: 'snuggie',
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // Set initialLoadRef to false after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      initialLoadRef.current = false;
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const analyzeSentiment = async (text: string): Promise<{ score: number; magnitude: number }> => {
    // Mock sentiment analysis with random values
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: Math.random() * 2 - 1, // Random score between -1 and 1
          magnitude: Math.random() * 10, // Random magnitude between 0 and 10
        });
      }, 1000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const sentiment = await analyzeSentiment(inputText);
      
      // Add sentiment to user message
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === userMessage.id ? { ...msg, sentiment } : msg
        )
      );

      // Generate Snuggie's response based on sentiment
      let response = '';
      if (sentiment.score > 0.3) {
        response = "That's wonderful! I'm so happy to hear you're feeling positive. Would you like to tell me more about what's making you feel this way?";
      } else if (sentiment.score < -0.3) {
        response = "I hear you, and it's okay to feel this way. Would you like to talk more about what's troubling you? I'm here to listen.";
      } else {
        response = "Thank you for sharing. Would you like to explore those feelings a bit more? I'm here to chat about whatever's on your mind.";
      }

      // Add Snuggie's response
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: response,
          sender: 'snuggie',
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const getSentimentEmoji = (score: number) => {
    if (score > 0.5) return '😊';
    if (score > 0) return '🙂';
    if (score > -0.5) return '😐';
    return '😔';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="h-[80vh] flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <img
              src="/robot-bear.png"
              alt="Snuggie"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h1 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                Snuggie
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your Emotional Support Companion
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-primary-500 text-white ml-12'
                        : 'bg-gray-100 dark:bg-gray-800 mr-12'
                    }`}
                  >
                    {message.sender === 'snuggie' && (
                      <img
                        src="/robot-bear.png"
                        alt="Snuggie"
                        className="w-8 h-8 rounded-full mb-2"
                      />
                    )}
                    <p className={`text-sm ${
                      message.sender === 'user'
                        ? 'text-white'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {message.text}
                    </p>
                    {message.sentiment && (
                      <div className="mt-2 text-xs opacity-75">
                        <span>{getSentimentEmoji(message.sentiment.score)}</span>
                        <span className="ml-1">
                          Sentiment: {(message.sentiment.score * 100).toFixed(0)}%
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Snuggie is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-primary-500 text-white rounded-lg px-6 py-2 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Snuggie; 