import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smile, Calendar, BarChart2, Award } from 'lucide-react';
import Button from '../components/shared/Button';
import { useUser } from '../context/UserContext';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { continueAsGuest } = useUser();

  const handleGuestClick = () => {
    continueAsGuest();
    navigate('/snuggie');
  };

  const featureItems = [
    {
      icon: <Smile className="w-10 h-10 text-primary-500" />,
      title: 'Quick Emoji Check-ins',
      description: 'Track your mood with just a tap using our intuitive emoji interface.'
    },
    {
      icon: <Calendar className="w-10 h-10 text-primary-500" />,
      title: 'Visualize Your Mood',
      description: 'See your emotional journey with our beautiful emoji calendar.'
    },
    {
      icon: <BarChart2 className="w-10 h-10 text-primary-500" />,
      title: 'Community Insights',
      description: 'View anonymized campus-wide mood trends to feel connected.'
    },
    {
      icon: <Award className="w-10 h-10 text-primary-500" />,
      title: 'Motivational Streaks',
      description: 'Build healthy habits with streaks, badges, and personalized encouragement.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
                A small daily check-in,<br />
                for your big beautiful brain 
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                Track your mood with emoji check-ins, visualize your emotional journey, 
                and gain insights into your mental wellbeing. Simple, private, and uplifting.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleGuestClick}
                >
                  Try as Guest
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Login / Sign Up
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative max-w-md">
                <motion.img
                  src="/robot-bear.png"
                  alt="Friendly robot wearing a bear hood"
                  className="w-full h-auto"
                  initial={{ y: 20 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    y: { 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut'
                    }
                  }}
                />
                
                {/* Decorative floating elements */}
                {[
                  { emoji: '✨', top: '-10%', left: '10%', delay: 0.5 },
                  { emoji: '💭', top: '20%', right: '-10%', delay: 1.2 },
                  { emoji: '💫', bottom: '-5%', left: '15%', delay: 0.8 },
                  //{ emoji: '🌈', top: '-15%', right: '20%', delay: 1.5 }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-2xl md:text-3xl z-10"
                    style={{ 
                      top: item.top, 
                      bottom: item.bottom, 
                      left: item.left, 
                      right: item.right 
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: item.delay,
                      duration: 0.5
                    }}
                  >
                    {item.emoji}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Simple Ways to Track Your Wellbeing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Designed with students in mind, Snug makes emotional tracking easy, engaging, and meaningful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureItems.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl font-display italic text-gray-800 dark:text-white mb-4">
              "Be kind, everyone you meet is fighting a hard battle."
            </p>
            <cite className="text-lg font-medium text-gray-600 dark:text-gray-400">
              — Socrates
            </cite>
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Ready to start your wellness journey?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleGuestClick}
            >
              Start Checking In
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;