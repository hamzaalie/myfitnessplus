// Badge definitions and logic
export const BADGES = {
  FIRST_WORKOUT: {
    id: 'first_workout',
    name: 'First Workout',
    description: 'Log your first workout',
    icon: '🏃'
  },
  FIRST_MEAL: {
    id: 'first_meal',
    name: 'First Meal',
    description: 'Log your first meal',
    icon: '🍽️'
  },
  WORKOUT_WARRIOR: {
    id: 'workout_warrior',
    name: 'Workout Warrior',
    description: 'Complete 5 workouts',
    icon: '💪'
  },
  CALORIE_TRACKER: {
    id: 'calorie_tracker',
    name: 'Calorie Tracker',
    description: 'Log meals for 5 days',
    icon: '📊'
  },
  WATER_MASTER: {
    id: 'water_master',
    name: 'Water Master',
    description: 'Drink 8 glasses of water in one day',
    icon: '💧'
  },
  WEEK_WARRIOR: {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Maintain streak for 7 days',
    icon: '🔥'
  },
  GOAL_SETTER: {
    id: 'goal_setter',
    name: 'Goal Setter',
    description: 'Create your first goal',
    icon: '🎯'
  },
  SUPER_USER: {
    id: 'super_user',
    name: 'Super User',
    description: 'Use all app features',
    icon: '⭐'
  }
};

// BMI Calculator
export const calculateBMI = (weight, height) => {
  if (!weight || !height) return null;
  // weight in kg, height in cm
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return Math.round(bmi * 10) / 10;
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: 'Underweight', color: '#3498db' };
  if (bmi < 25) return { category: 'Normal', color: '#2ecc71' };
  if (bmi < 30) return { category: 'Overweight', color: '#f39c12' };
  return { category: 'Obese', color: '#e74c3c' };
};

// Badge unlock conditions
export const checkBadgeConditions = (stats) => {
  const newBadges = [];
  
  // First Workout
  if (stats.workoutCount >= 1) {
    newBadges.push(BADGES.FIRST_WORKOUT.id);
  }
  
  // First Meal
  if (stats.mealCount >= 1) {
    newBadges.push(BADGES.FIRST_MEAL.id);
  }
  
  // Workout Warrior
  if (stats.workoutCount >= 5) {
    newBadges.push(BADGES.WORKOUT_WARRIOR.id);
  }
  
  // Calorie Tracker
  if (stats.daysTrackedMeals >= 5) {
    newBadges.push(BADGES.CALORIE_TRACKER.id);
  }
  
  // Water Master
  if (stats.waterGlassesToday >= 8) {
    newBadges.push(BADGES.WATER_MASTER.id);
  }
  
  // Goal Setter
  if (stats.goalCount >= 1) {
    newBadges.push(BADGES.GOAL_SETTER.id);
  }
  
  return newBadges;
};

// Motivational quotes
export const MOTIVATIONAL_QUOTES = [
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "Health is a state of complete physical, mental, and social well-being.",
    author: "WHO"
  },
  {
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn"
  },
  {
    text: "A fit body, a calm mind, a house full of love. These things cannot be bought.",
    author: "Naval Ravikant"
  },
  {
    text: "The greatest wealth is health.",
    author: "Virgil"
  },
  {
    text: "Don't wish for it, work for it.",
    author: "Unknown"
  },
  {
    text: "Fitness is not about being better than someone else. It's about being better than you used to be.",
    author: "Khloe Kardashian"
  },
  {
    text: "Exercise is king, nutrition is queen, put them both together and you've got a kingdom.",
    author: "Jack LaLanne"
  },
  {
    text: "Your body can stand almost anything. It's your mind that you have to convince.",
    author: "A. L. Graziadei"
  },
  {
    text: "The mind always fails first, not the body.",
    author: "Henry Rollins"
  }
];

export const getRandomQuote = () => {
  return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
};
