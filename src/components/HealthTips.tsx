import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Apple, Moon } from 'lucide-react';

interface HealthTipsProps {
  riskLevel: 'low' | 'moderate' | 'high';
  strokePrediction?: number;
}

const HealthTips: React.FC<HealthTipsProps> = ({ riskLevel, strokePrediction }) => {
  const getTips = () => {
    const baseTips = [
      {
        icon: Heart,
        title: "Regular Exercise",
        description: "Aim for 150 minutes of moderate aerobic activity per week",
        color: "text-red-500"
      },
      {
        icon: Apple,
        title: "Healthy Diet",
        description: "Focus on fruits, vegetables, whole grains, and lean proteins",
        color: "text-green-500"
      },
      {
        icon: Activity,
        title: "Monitor Vitals",
        description: "Regular blood pressure and heart rate monitoring",
        color: "text-blue-500"
      },
      {
        icon: Moon,
        title: "Quality Sleep",
        description: "Aim for 7-9 hours of quality sleep each night",
        color: "text-purple-500"
      }
    ];

    if (riskLevel === 'high' || (strokePrediction && strokePrediction > 0.7)) {
      return [
        ...baseTips,
        {
          icon: Heart,
          title: "Medical Consultation",
          description: "Schedule regular check-ups with your cardiologist",
          color: "text-red-600"
        }
      ];
    }

    return baseTips;
  };

  const tips = getTips();

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Personalized Health Tips
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <motion.div
            key={tip.title}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <tip.icon className={`h-6 w-6 ${tip.color} mt-1 flex-shrink-0`} />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {tip.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {tip.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HealthTips;