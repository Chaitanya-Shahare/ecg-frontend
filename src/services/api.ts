import { UserData, APIRequest } from "../types";

const API_BASE_URL = "https://extras-crime-kansas-dried.trycloudflare.com";

export const predictHealth = async (userData: UserData): Promise<any> => {
  const apiRequest: APIRequest = {
    gender:
      userData.gender === "male"
        ? "Male"
        : userData.gender === "female"
          ? "Female"
          : "Other",
    age: userData.age,
    hypertension: userData.heartConditions.includes("Hypertension") ? 1 : 0,
    heart_disease: userData.heartConditions.includes("Heart Disease") ? 1 : 0,
    ever_married: userData.everMarried,
    work_type: userData.workType,
    Residence_type: userData.residenceType,
    avg_glucose_level: userData.avgGlucoseLevel,
    bmi: userData.bmi,
    smoking_status: userData.smokingStatus,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequest),
    });
    console.log("response", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    // Return mock data as fallback
    return {
      prediction: Math.random() > 0.7 ? 1 : 0,
      probability: Math.random() * 100,
    };
  }
};

