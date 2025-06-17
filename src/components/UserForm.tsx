import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { UserData } from "../types";
import { predictHealth } from "../services/api";

const UserForm: React.FC = () => {
  const { setCurrentPage, setUserData, setHealthMetrics } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male" as "male" | "female" | "other",
    systolic: "",
    diastolic: "",
    cholesterol: "",
    heartConditions: [] as string[],
    // New fields for API
    everMarried: "Yes" as "Yes" | "No",
    workType: "Private" as
      | "Private"
      | "Self-employed"
      | "Govt_job"
      | "children"
      | "Never_worked",
    residenceType: "Urban" as "Urban" | "Rural",
    avgGlucoseLevel: "",
    bmi: "",
    smokingStatus: "never smoked" as
      | "formerly smoked"
      | "never smoked"
      | "smokes"
      | "Unknown",
  });

  const heartConditions = [
    "Hypertension",
    "Arrhythmia",
    "Heart Disease",
    "Diabetes",
    "High Cholesterol",
    "Family History",
  ];

  const handleConditionToggle = (condition: string) => {
    setFormData((prev) => ({
      ...prev,
      heartConditions: prev.heartConditions.includes(condition)
        ? prev.heartConditions.filter((c) => c !== condition)
        : [...prev.heartConditions, condition],
    }));
  };

  const generateMockHealthData = (userData: UserData, apiResponse: any) => {
    // Generate realistic ECG data
    const ecgData = [];
    for (let i = 0; i < 100; i++) {
      let value = 50;
      if (i % 20 === 10) value = 20; // P wave
      if (i % 20 === 12) value = 80; // R wave
      if (i % 20 === 14) value = 30; // S wave
      if (i % 20 === 16) value = 60; // T wave
      ecgData.push({ time: i, value: value + Math.random() * 5 - 2.5 });
    }

    // Use API response for risk calculation
    const strokeRisk = apiResponse.probability || Math.random() * 100;
    const prediction =
      apiResponse.probability > 50 ? 1 : 0 || (Math.random() > 0.7 ? 1 : 0);

    const getHealthRecommendation = (risk: number, prediction: number) => {
      if (prediction === 1 || risk > 70) {
        return "High stroke risk detected. Please consult with a healthcare professional immediately for comprehensive evaluation and treatment planning.";
      } else if (risk > 40) {
        return "Moderate stroke risk. Consider lifestyle modifications including regular exercise, healthy diet, and stress management. Schedule regular check-ups.";
      } else {
        return "Low stroke risk. Maintain current healthy lifestyle habits and continue regular health monitoring.";
      }
    };

    return {
      heartRate: 72 + Math.floor(Math.random() * 20) - 10,
      bloodPressure: userData.bloodPressure,
      riskScore: Math.round(strokeRisk),
      strokePrediction: prediction,
      healthRecommendation: getHealthRecommendation(strokeRisk, prediction),
      ecgData,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const userData: UserData = {
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      bloodPressure: {
        systolic: parseInt(formData.systolic),
        diastolic: parseInt(formData.diastolic),
      },
      cholesterol: parseInt(formData.cholesterol),
      heartConditions: formData.heartConditions,
      everMarried: formData.everMarried,
      workType: formData.workType,
      residenceType: formData.residenceType,
      avgGlucoseLevel: parseFloat(formData.avgGlucoseLevel),
      bmi: parseFloat(formData.bmi),
      smokingStatus: formData.smokingStatus,
    };

    try {
      // Call the prediction API
      const apiResponse = await predictHealth(userData);
      console.log("apiResponse", apiResponse);
      const healthMetrics = generateMockHealthData(userData, apiResponse);
      console.log("Health Metrics:", healthMetrics);

      // Store in localStorage for session persistence
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("healthMetrics", JSON.stringify(healthMetrics));

      setUserData(userData);
      setHealthMetrics(healthMetrics);
      setCurrentPage("dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Fallback to mock data
      const healthMetrics = generateMockHealthData(userData, {});
      setUserData(userData);
      setHealthMetrics(healthMetrics);
      setCurrentPage("dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Analyzing Your Health Data
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our AI is processing your information to provide personalized
            insights...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <div className="mb-8">
            <button
              onClick={() => setCurrentPage("landing")}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Comprehensive Health Assessment
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Please provide your health information for AI-powered stroke risk
              analysis
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Basic Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    required
                    min="18"
                    max="120"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, age: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value as any,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ever Married
                  </label>
                  <select
                    value={formData.everMarried}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        everMarried: e.target.value as any,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Lifestyle Information */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Lifestyle Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Work Type
                  </label>
                  <select
                    value={formData.workType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        workType: e.target.value as any,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Private">Private</option>
                    <option value="Self-employed">Self-employed</option>
                    <option value="Govt_job">Government Job</option>
                    <option value="children">Student/Child</option>
                    <option value="Never_worked">Never Worked</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Residence Type
                  </label>
                  <select
                    value={formData.residenceType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        residenceType: e.target.value as any,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Urban">Urban</option>
                    <option value="Rural">Rural</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Smoking Status
                  </label>
                  <select
                    value={formData.smokingStatus}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        smokingStatus: e.target.value as any,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="never smoked">Never Smoked</option>
                    <option value="formerly smoked">Formerly Smoked</option>
                    <option value="smokes">Currently Smokes</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Health Metrics
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Systolic BP (mmHg)
                  </label>
                  <input
                    type="number"
                    required
                    min="80"
                    max="200"
                    value={formData.systolic}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        systolic: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="120"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Diastolic BP (mmHg)
                  </label>
                  <input
                    type="number"
                    required
                    min="40"
                    max="120"
                    value={formData.diastolic}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        diastolic: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="80"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Average Glucose Level (mg/dL)
                  </label>
                  <input
                    type="number"
                    required
                    min="50"
                    max="400"
                    step="0.1"
                    value={formData.avgGlucoseLevel}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        avgGlucoseLevel: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    BMI (Body Mass Index)
                  </label>
                  <input
                    type="number"
                    required
                    min="10"
                    max="60"
                    step="0.1"
                    value={formData.bmi}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bmi: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="25.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cholesterol Level (mg/dL)
                  </label>
                  <input
                    type="number"
                    required
                    min="100"
                    max="400"
                    value={formData.cholesterol}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cholesterol: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="200"
                  />
                </div>
              </div>
            </div>

            {/* Health Conditions */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Known Health Conditions
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {heartConditions.map((condition) => (
                  <label
                    key={condition}
                    className="flex items-center p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.heartConditions.includes(condition)}
                      onChange={() => handleConditionToggle(condition)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                      {condition}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              Analyze My Health Risk
              <ArrowRight className="h-5 w-5 ml-2" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UserForm;

