import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Shield, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import HeartAnimation from './HeartAnimation';
import TeamSection from './TeamSection';

const LandingPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  const features = [
    {
      icon: Activity,
      title: 'Real-time ECG Monitoring',
      description: 'Advanced electrocardiogram analysis with instant insights'
    },
    {
      icon: Shield,
      title: 'AI-Powered Risk Assessment',
      description: 'Machine learning algorithms predict stroke risk with high accuracy'
    },
    {
      icon: TrendingUp,
      title: 'Personalized Health Insights',
      description: 'Get tailored recommendations based on your unique health profile'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="pt-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Heart className="h-20 w-20 text-red-500 mx-auto mb-4" />
            </motion.div>
            
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Understand Your Heart.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                Monitor Your Health.
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              Advanced ECG monitoring and AI-powered stroke prediction. 
              Get personalized insights and take control of your cardiovascular wellness with cutting-edge technology.
            </motion.p>
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center space-x-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage('form')}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Know Your Heart Now
              </motion.button>
              
              <HeartAnimation />
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 + index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ECG Wave Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="max-w-4xl mx-auto px-4 py-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-8">
              Real-time ECG Visualization
            </h3>
            <div className="h-32 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 400 100" className="text-green-500">
                <motion.path
                  d="M0,50 L50,50 L60,20 L70,80 L80,50 L100,50 L110,30 L120,70 L130,50 L200,50 L210,20 L220,80 L230,50 L250,50 L260,30 L270,70 L280,50 L350,50 L360,20 L370,80 L380,50 L400,50"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <TeamSection />
      </div>
    </div>
  );
};

export default LandingPage;