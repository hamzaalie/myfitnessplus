// Mock data for the application
// This data simulates what would come from a backend in a production environment

// Progress data with traffic light status
export const progressData = {
  overall: {
    status: 'amber', // green, amber, red
    score: 72,
    message: 'Good progress! Keep pushing to reach your goals.'
  },
  categories: [
    {
      id: 1,
      name: 'Nutrition',
      status: 'green',
      score: 85,
      target: 2000,
      current: 1850,
      unit: 'calories',
      description: 'You\'re on track with your daily calorie goals!'
    },
    {
      id: 2,
      name: 'Workouts',
      status: 'amber',
      score: 65,
      target: 5,
      current: 3,
      unit: 'sessions/week',
      description: 'Try to fit in 2 more workout sessions this week.'
    },
    {
      id: 3,
      name: 'Protein Intake',
      status: 'green',
      score: 90,
      target: 150,
      current: 142,
      unit: 'grams',
      description: 'Excellent protein intake! Keep it up.'
    },
    {
      id: 4,
      name: 'Water Intake',
      status: 'red',
      score: 45,
      target: 8,
      current: 4,
      unit: 'glasses',
      description: 'Increase your water intake to stay hydrated.'
    },
    {
      id: 5,
      name: 'Sleep',
      status: 'amber',
      score: 70,
      target: 8,
      current: 6.5,
      unit: 'hours',
      description: 'Try to get more rest for better recovery.'
    },
    {
      id: 6,
      name: 'Steps',
      status: 'green',
      score: 88,
      target: 10000,
      current: 8800,
      unit: 'steps',
      description: 'Great activity level! Almost at your daily goal.'
    }
  ]
};

// Meal prep data
export const mealPrepData = {
  weekPlan: [
    {
      day: 'Monday',
      meals: [
        { type: 'Breakfast', name: 'Greek Yogurt with Berries', calories: 320, protein: 18 },
        { type: 'Lunch', name: 'Grilled Chicken Salad', calories: 450, protein: 35 },
        { type: 'Dinner', name: 'Salmon with Quinoa', calories: 550, protein: 42 },
        { type: 'Snack', name: 'Almonds & Apple', calories: 200, protein: 6 }
      ]
    },
    {
      day: 'Tuesday',
      meals: [
        { type: 'Breakfast', name: 'Oatmeal with Banana', calories: 350, protein: 12 },
        { type: 'Lunch', name: 'Turkey Wrap', calories: 480, protein: 30 },
        { type: 'Dinner', name: 'Lean Beef Stir Fry', calories: 520, protein: 38 },
        { type: 'Snack', name: 'Protein Shake', calories: 180, protein: 25 }
      ]
    },
    {
      day: 'Wednesday',
      meals: [
        { type: 'Breakfast', name: 'Egg White Omelette', calories: 280, protein: 24 },
        { type: 'Lunch', name: 'Tuna Salad Bowl', calories: 420, protein: 32 },
        { type: 'Dinner', name: 'Grilled Chicken Breast', calories: 480, protein: 45 },
        { type: 'Snack', name: 'Cottage Cheese', calories: 150, protein: 14 }
      ]
    },
    {
      day: 'Thursday',
      meals: [
        { type: 'Breakfast', name: 'Protein Pancakes', calories: 380, protein: 28 },
        { type: 'Lunch', name: 'Chicken Caesar Salad', calories: 460, protein: 34 },
        { type: 'Dinner', name: 'Shrimp & Vegetables', calories: 420, protein: 35 },
        { type: 'Snack', name: 'Greek Yogurt', calories: 140, protein: 15 }
      ]
    },
    {
      day: 'Friday',
      meals: [
        { type: 'Breakfast', name: 'Smoothie Bowl', calories: 340, protein: 20 },
        { type: 'Lunch', name: 'Grilled Fish Tacos', calories: 490, protein: 32 },
        { type: 'Dinner', name: 'Turkey Meatballs', calories: 510, protein: 40 },
        { type: 'Snack', name: 'Protein Bar', calories: 200, protein: 20 }
      ]
    },
    {
      day: 'Saturday',
      meals: [
        { type: 'Breakfast', name: 'Avocado Toast with Eggs', calories: 420, protein: 22 },
        { type: 'Lunch', name: 'Quinoa Buddha Bowl', calories: 480, protein: 18 },
        { type: 'Dinner', name: 'Grilled Steak', calories: 580, protein: 48 },
        { type: 'Snack', name: 'Mixed Nuts', calories: 180, protein: 6 }
      ]
    },
    {
      day: 'Sunday',
      meals: [
        { type: 'Breakfast', name: 'French Toast', calories: 390, protein: 16 },
        { type: 'Lunch', name: 'Chicken Soup', calories: 350, protein: 28 },
        { type: 'Dinner', name: 'Baked Cod with Rice', calories: 480, protein: 38 },
        { type: 'Snack', name: 'Fruit Salad', calories: 120, protein: 2 }
      ]
    }
  ],
  dailySummary: {
    targetCalories: 2000,
    targetProtein: 150,
    averageCalories: 1850,
    averageProtein: 142
  }
};

// Workout data
export const workoutData = {
  weekPlan: [
    {
      day: 'Monday',
      name: 'Push Day',
      duration: '60 min',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Shoulder Press', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '45s' },
        { name: 'Tricep Dips', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', rest: '45s' }
      ]
    },
    {
      day: 'Tuesday',
      name: 'Pull Day',
      duration: '55 min',
      exercises: [
        { name: 'Deadlifts', sets: 4, reps: '6-8', rest: '120s' },
        { name: 'Pull-ups', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Barbell Rows', sets: 3, reps: '8-10', rest: '90s' },
        { name: 'Face Pulls', sets: 3, reps: '12-15', rest: '45s' },
        { name: 'Bicep Curls', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Hammer Curls', sets: 3, reps: '10-12', rest: '45s' }
      ]
    },
    {
      day: 'Wednesday',
      name: 'Rest Day',
      duration: '-',
      exercises: [],
      isRest: true,
      restActivities: ['Light stretching', 'Foam rolling', '20-min walk']
    },
    {
      day: 'Thursday',
      name: 'Leg Day',
      duration: '65 min',
      exercises: [
        { name: 'Squats', sets: 4, reps: '8-10', rest: '120s' },
        { name: 'Leg Press', sets: 4, reps: '10-12', rest: '90s' },
        { name: 'Romanian Deadlifts', sets: 3, reps: '10-12', rest: '90s' },
        { name: 'Leg Curls', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Calf Raises', sets: 4, reps: '15-20', rest: '45s' },
        { name: 'Leg Extensions', sets: 3, reps: '12-15', rest: '60s' }
      ]
    },
    {
      day: 'Friday',
      name: 'Upper Body',
      duration: '50 min',
      exercises: [
        { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Chin-ups', sets: 3, reps: '8-10', rest: '90s' },
        { name: 'Dumbbell Flyes', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Cable Rows', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Skull Crushers', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Concentration Curls', sets: 3, reps: '10-12', rest: '45s' }
      ]
    },
    {
      day: 'Saturday',
      name: 'Cardio & Core',
      duration: '45 min',
      exercises: [
        { name: 'HIIT Sprints', sets: 8, reps: '30s each', rest: '60s' },
        { name: 'Planks', sets: 3, reps: '60s hold', rest: '30s' },
        { name: 'Russian Twists', sets: 3, reps: '20 each side', rest: '30s' },
        { name: 'Leg Raises', sets: 3, reps: '15', rest: '30s' },
        { name: 'Mountain Climbers', sets: 3, reps: '30s each', rest: '30s' }
      ]
    },
    {
      day: 'Sunday',
      name: 'Rest Day',
      duration: '-',
      exercises: [],
      isRest: true,
      restActivities: ['Yoga session', 'Meditation', 'Light mobility work']
    }
  ],
  stats: {
    totalWorkouts: 5,
    totalDuration: '4h 35min',
    muscleGroups: ['Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core']
  }
};

// Goals data
export const goalsData = {
  mainGoals: [
    {
      id: 1,
      title: 'Lose 10 lbs',
      category: 'Weight',
      target: 170,
      current: 175,
      unit: 'lbs',
      startValue: 180,
      deadline: '2024-03-01',
      progress: 50,
      status: 'on-track'
    },
    {
      id: 2,
      title: 'Run a 5K',
      category: 'Cardio',
      target: 5,
      current: 3.2,
      unit: 'km',
      startValue: 1,
      deadline: '2024-02-15',
      progress: 55,
      status: 'on-track'
    },
    {
      id: 3,
      title: 'Bench Press 200 lbs',
      category: 'Strength',
      target: 200,
      current: 165,
      unit: 'lbs',
      startValue: 135,
      deadline: '2024-04-01',
      progress: 46,
      status: 'needs-attention'
    },
    {
      id: 4,
      title: 'Drink 8 glasses of water daily',
      category: 'Habits',
      target: 8,
      current: 4,
      unit: 'glasses',
      startValue: 2,
      deadline: 'Ongoing',
      progress: 33,
      status: 'behind'
    }
  ],
  achievements: [
    { id: 1, name: 'First Workout', icon: '🏆', date: '2024-01-01', description: 'Completed your first workout!' },
    { id: 2, name: 'Week Streak', icon: '🔥', date: '2024-01-07', description: 'Worked out for 7 days straight!' },
    { id: 3, name: 'Meal Master', icon: '🍽️', date: '2024-01-10', description: 'Logged 50 meals!' },
    { id: 4, name: 'Early Bird', icon: '🌅', date: '2024-01-15', description: 'Completed 5 morning workouts!' }
  ]
};

// Dashboard summary data
export const dashboardData = {
  todaySummary: {
    caloriesConsumed: 1450,
    caloriesTarget: 2000,
    workoutCompleted: true,
    waterGlasses: 5,
    stepsCount: 6500
  },
  weeklyHighlights: {
    workoutsCompleted: 4,
    avgCalories: 1850,
    streakDays: 12,
    weightChange: -0.5
  }
};
