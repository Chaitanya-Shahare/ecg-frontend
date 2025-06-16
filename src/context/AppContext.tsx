import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserData, HealthMetrics } from '../types';

interface AppContextType {
  currentPage: 'landing' | 'form' | 'dashboard';
  setCurrentPage: (page: 'landing' | 'form' | 'dashboard') => void;
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  healthMetrics: HealthMetrics | null;
  setHealthMetrics: (metrics: HealthMetrics) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'form' | 'dashboard'>('landing');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    const savedHealthMetrics = localStorage.getItem('healthMetrics');
    
    if (savedUserData && savedHealthMetrics) {
      try {
        setUserData(JSON.parse(savedUserData));
        setHealthMetrics(JSON.parse(savedHealthMetrics));
        setCurrentPage('dashboard');
      } catch (error) {
        console.error('Error loading saved data:', error);
        localStorage.removeItem('userData');
        localStorage.removeItem('healthMetrics');
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      userData,
      setUserData,
      healthMetrics,
      setHealthMetrics
    }}>
      {children}
    </AppContext.Provider>
  );
};