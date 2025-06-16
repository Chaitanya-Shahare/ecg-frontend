export interface UserData {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  cholesterol: number;
  heartConditions: string[];
  // Additional fields for API
  everMarried: 'Yes' | 'No';
  workType: 'Private' | 'Self-employed' | 'Govt_job' | 'children' | 'Never_worked';
  residenceType: 'Urban' | 'Rural';
  avgGlucoseLevel: number;
  bmi: number;
  smokingStatus: 'formerly smoked' | 'never smoked' | 'smokes' | 'Unknown';
}

export interface HealthMetrics {
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  riskScore: number;
  strokePrediction?: number;
  healthRecommendation: string;
  ecgData: Array<{ time: number; value: number }>;
}

export interface APIRequest {
  gender: string;
  age: number;
  hypertension: number;
  heart_disease: number;
  ever_married: string;
  work_type: string;
  Residence_type: string;
  avg_glucose_level: number;
  bmi: number;
  smoking_status: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}