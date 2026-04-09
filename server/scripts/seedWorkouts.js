const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// Import models
const Workout = require('../models/Workout');
const User = require('../models/User');

const sampleWorkouts = [
  {
    day: 'Monday',
    name: 'Push Day',
    duration: '60 min',
    isRest: false,
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-10', completed: false },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', completed: false },
      { name: 'Shoulder Press', sets: 4, reps: '8-10', completed: false },
      { name: 'Lateral Raises', sets: 3, reps: '12-15', completed: false },
      { name: 'Tricep Dips', sets: 3, reps: '10-12', completed: false },
      { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', completed: false }
    ],
    completionPercentage: 0
  },
  {
    day: 'Tuesday',
    name: 'Pull Day',
    duration: '55 min',
    isRest: false,
    exercises: [
      { name: 'Deadlifts', sets: 4, reps: '6-8', completed: false },
      { name: 'Pull-ups', sets: 4, reps: '8-10', completed: false },
      { name: 'Barbell Rows', sets: 3, reps: '8-10', completed: false },
      { name: 'Face Pulls', sets: 3, reps: '12-15', completed: false },
      { name: 'Bicep Curls', sets: 3, reps: '10-12', completed: false },
      { name: 'Hammer Curls', sets: 3, reps: '10-12', completed: false }
    ],
    completionPercentage: 0
  },
  {
    day: 'Wednesday',
    name: 'Rest Day',
    duration: '0 min',
    isRest: true,
    exercises: [],
    completionPercentage: 0
  },
  {
    day: 'Thursday',
    name: 'Leg Day',
    duration: '65 min',
    isRest: false,
    exercises: [
      { name: 'Squats', sets: 4, reps: '8-10', completed: false },
      { name: 'Leg Press', sets: 4, reps: '10-12', completed: false },
      { name: 'Romanian Deadlifts', sets: 3, reps: '10-12', completed: false },
      { name: 'Leg Curls', sets: 3, reps: '12-15', completed: false },
      { name: 'Calf Raises', sets: 4, reps: '15-20', completed: false },
      { name: 'Leg Extensions', sets: 3, reps: '12-15', completed: false }
    ],
    completionPercentage: 0
  },
  {
    day: 'Friday',
    name: 'Upper Body',
    duration: '50 min',
    isRest: false,
    exercises: [
      { name: 'Overhead Press', sets: 4, reps: '8-10', completed: false },
      { name: 'Chin-ups', sets: 3, reps: '8-10', completed: false },
      { name: 'Dumbbell Flyes', sets: 3, reps: '12-15', completed: false },
      { name: 'Cable Rows', sets: 3, reps: '10-12', completed: false },
      { name: 'Skull Crushers', sets: 3, reps: '10-12', completed: false },
      { name: 'Concentration Curls', sets: 3, reps: '10-12', completed: false }
    ],
    completionPercentage: 0
  },
  {
    day: 'Saturday',
    name: 'Cardio & Core',
    duration: '45 min',
    isRest: false,
    exercises: [
      { name: 'HIIT Sprints', sets: 8, reps: '30s each', completed: false },
      { name: 'Planks', sets: 3, reps: '60s hold', completed: false },
      { name: 'Russian Twists', sets: 3, reps: '20 each side', completed: false },
      { name: 'Leg Raises', sets: 3, reps: '15', completed: false },
      { name: 'Mountain Climbers', sets: 3, reps: '30s each', completed: false }
    ],
    completionPercentage: 0
  },
  {
    day: 'Sunday',
    name: 'Rest Day',
    duration: '0 min',
    isRest: true,
    exercises: [],
    completionPercentage: 0
  }
];

const seedWorkouts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Get user email from command line argument or use default
    const userEmail = process.argv[2] || 'testuser@example.com';
    
    // Find the user
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      console.error(`❌ User with email ${userEmail} not found`);
      console.log('Usage: node seedWorkouts.js [user-email]');
      process.exit(1);
    }

    console.log(`👤 Found user: ${user.name} (${user.email})`);

    // Delete existing workouts for this user
    const deleted = await Workout.deleteMany({ userId: user._id });
    console.log(`🗑️  Deleted ${deleted.deletedCount} existing workouts`);

    // Create new workouts
    const workouts = sampleWorkouts.map(workout => ({
      ...workout,
      userId: user._id
    }));

    const created = await Workout.insertMany(workouts);
    console.log(`✅ Created ${created.length} sample workouts`);

    console.log('\n📋 Workout Summary:');
    created.forEach(w => {
      console.log(`   ${w.day}: ${w.name} (${w.exercises.length} exercises)`);
    });

    console.log('\n✨ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding workouts:', error);
    process.exit(1);
  }
};

seedWorkouts();
