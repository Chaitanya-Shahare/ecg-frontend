import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Activity, AlertTriangle, TrendingUp, Brain } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useApp } from '../context/AppContext';
import HumanModel3D from './HumanModel3D';
import HealthTips from './HealthTips';

const Dashboard: React.FC = () => {
  const { setCurrentPage, userData, healthMetrics } = useApp();

  if (!userData || !healthMetrics) {
    return null;
  }

  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900' };
    if (score < 60) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900' };
  };

  const riskInfo = getRiskLevel(healthMetrics.riskScore);

  const getHeartRateStatus = (hr: number) => {
    if (hr < 60) return { status: 'Low', color: 'text-blue-600' };
    if (hr > 100) return { status: 'High', color: 'text-red-600' };
    return { status: 'Normal', color: 'text-green-600' };
  };

  const hrStatus = getHeartRateStatus(healthMetrics.heartRate);

  const getBPStatus = (systolic: number, diastolic: number) => {
    if (systolic > 140 || diastolic > 90) return { status: 'High', color: 'text-red-600' };
    if (systolic > 130 || diastolic > 80) return { status: 'Elevated', color: 'text-yellow-600' };
    return { status: 'Normal', color: 'text-green-600' };
  };

  const bpStatus = getBPStatus(healthMetrics.bloodPressure.systolic, healthMetrics.bloodPressure.diastolic);

  const getStrokePredictionText = (prediction?: number) => {
    if (prediction === undefined) return 'Processing...';
    return prediction === 1 ? 'High Risk' : 'Low Risk';
  };

  const getStrokePredictionColor = (prediction?: number) => {
    if (prediction === undefined) return 'text-gray-600';
    return prediction === 1 ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <button
            onClick={() => setCurrentPage('form')}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Form
          </button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Health Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Welcome back, {userData.name}
            </p>
          </div>
        </motion.div>

        {/* AI Prediction Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`${riskInfo.bg} rounded-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-12 w-12 text-blue-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  AI Stroke Risk Prediction
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Machine learning analysis based on your health profile
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                {healthMetrics.riskScore}%
              </div>
              <div className={`text-lg font-semibold ${getStrokePredictionColor(healthMetrics.strokePrediction)}`}>
                {getStrokePredictionText(healthMetrics.strokePrediction)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Recommendation */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-8 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Personalized Health Recommendation
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            {healthMetrics.healthRecommendation}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Heart className="h-8 w-8 text-red-500" />
              <span className={`text-sm font-medium ${hrStatus.color}`}>
                {hrStatus.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Heart Rate
            </h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {healthMetrics.heartRate}
              <span className="text-lg text-gray-500 ml-1">bpm</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-8 w-8 text-blue-500" />
              <span className={`text-sm font-medium ${bpStatus.color}`}>
                {bpStatus.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Blood Pressure
            </h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {healthMetrics.bloodPressure.systolic}/{healthMetrics.bloodPressure.diastolic}
              <span className="text-lg text-gray-500 ml-1">mmHg</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <span className="text-sm font-medium text-gray-500">
                BMI {userData.bmi}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Glucose Level
            </h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {userData.avgGlucoseLevel}
              <span className="text-lg text-gray-500 ml-1">mg/dL</span>
            </div>
          </motion.div>
        </div>

        {/* ECG Chart and 3D Model */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* ECG Chart */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Electrocardiogram (ECG)
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Real-time heart rhythm analysis
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Live</span>
              </div>
            </div>
            
            <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={healthMetrics.ecgData}>
                  <defs>
                    <linearGradient id="ecgGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#ecgGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 3D Human Model */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                3D Health Visualization
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Interactive anatomical model with heart focus
              </p>
            </div>
            
            <HumanModel3D gender={userData.gender} />
          </motion.div>
        </div>

        {/* Health Tips */}
        <HealthTips 
          riskLevel={healthMetrics.riskScore < 30 ? 'low' : healthMetrics.riskScore < 60 ? 'moderate' : 'high'}
          strokePrediction={healthMetrics.strokePrediction}
        />

        {/* Health Conditions */}
        {userData.heartConditions.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mt-8"
          >
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Known Conditions
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userData.heartConditions.map((condition, index) => (
                <motion.div
                  key={condition}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
                >
                  <span className="text-yellow-800 dark:text-yellow-200 font-medium">
                    {condition}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;