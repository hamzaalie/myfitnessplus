import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  getUser: async () => {
    const response = await api.get('/auth/user');
    return response.data;
  }
};

// Profile API calls
export const profileAPI = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await api.put('/profile', profileData);
    return response.data;
  },
  updateDarkMode: async (darkMode) => {
    const response = await api.put('/profile/theme/dark-mode', { darkMode });
    return response.data;
  },
  unlockBadge: async (badgeId, badgeName) => {
    const response = await api.put('/profile/badges/unlock', { badgeId, badgeName });
    return response.data;
  }
};

// Meals API calls
export const mealsAPI = {
  getMeals: async (date) => {
    const params = date ? { date } : {};
    const response = await api.get('/meals', { params });
    return response.data;
  },
  getMealById: async (id) => {
    const response = await api.get(`/meals/${id}`);
    return response.data;
  },
  createMeal: async (mealData) => {
    const response = await api.post('/meals', mealData);
    return response.data;
  },
  updateMeal: async (id, mealData) => {
    const response = await api.put(`/meals/${id}`, mealData);
    return response.data;
  },
  deleteMeal: async (id) => {
    const response = await api.delete(`/meals/${id}`);
    return response.data;
  }
};

// Workouts API calls
export const workoutsAPI = {
  getWorkouts: async () => {
    const response = await api.get('/workouts');
    return response.data;
  },
  getWorkoutById: async (id) => {
    const response = await api.get(`/workouts/${id}`);
    return response.data;
  },
  createWorkout: async (workoutData) => {
    const response = await api.post('/workouts', workoutData);
    return response.data;
  },
  updateWorkout: async (id, workoutData) => {
    const response = await api.put(`/workouts/${id}`, workoutData);
    return response.data;
  },
  toggleExercise: async (id, exerciseIndex) => {
    const response = await api.put(`/workouts/${id}/exercise/${exerciseIndex}`);
    return response.data;
  },
  deleteWorkout: async (id) => {
    const response = await api.delete(`/workouts/${id}`);
    return response.data;
  }
};

// Goals API calls
export const goalsAPI = {
  getGoals: async () => {
    const response = await api.get('/goals');
    return response.data;
  },
  getGoalById: async (id) => {
    const response = await api.get(`/goals/${id}`);
    return response.data;
  },
  createGoal: async (goalData) => {
    const response = await api.post('/goals', goalData);
    return response.data;
  },
  updateGoal: async (id, goalData) => {
    const response = await api.put(`/goals/${id}`, goalData);
    return response.data;
  },
  deleteGoal: async (id) => {
    const response = await api.delete(`/goals/${id}`);
    return response.data;
  }
};

// Water Intake API calls
export const waterAPI = {
  getWaterIntake: async (date) => {
    const params = date ? { date } : {};
    const response = await api.get('/water-intake', { params });
    return response.data;
  },
  addWater: async () => {
    const response = await api.put('/water-intake/add');
    return response.data;
  },
  removeWater: async () => {
    const response = await api.put('/water-intake/remove');
    return response.data;
  },
  setWater: async (glasses, date) => {
    const response = await api.put('/water-intake/set', { glasses, date });
    return response.data;
  }
};

export default api;
