const mongoose = require('mongoose');
require('../config/database');
const User = require('../models/User');
const Workout = require('../models/Workout');

async function testToggle() {
  try {
    // Find user by email
    const email = process.argv[2] || 'hamzaaliaps098@gmail.com';
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found:', email);
      process.exit(1);
    }
    
    console.log('✅ Found user:', user.name, `(${user.email})`);
    console.log('User ID:', user._id.toString());
    
    // Find user's workouts
    const workouts = await Workout.find({ userId: user._id });
    console.log(`\n📋 Found ${workouts.length} workouts`);
    
    if (workouts.length === 0) {
      console.log('❌ No workouts found for this user');
      process.exit(1);
    }
    
    // Show first workout details
    const workout = workouts[0];
    console.log(`\n🏋️ First workout: ${workout.name} (${workout.day})`);
    console.log('Workout ID:', workout._id.toString());
    console.log('Exercises:', workout.exercises.length);
    console.log('Current completion:', workout.completionPercentage + '%');
    
    if (workout.exercises.length > 0) {
      console.log('\nFirst exercise:', workout.exercises[0].name);
      console.log('Currently completed:', workout.exercises[0].completed);
      
      // Toggle first exercise
      workout.exercises[0].completed = !workout.exercises[0].completed;
      const completed = workout.exercises.filter(e => e.completed).length;
      workout.completionPercentage = Math.round((completed / workout.exercises.length) * 100);
      
      await workout.save();
      console.log('\n✅ Toggled first exercise!');
      console.log('Now completed:', workout.exercises[0].completed);
      console.log('New completion percentage:', workout.completionPercentage + '%');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

setTimeout(testToggle, 1000);
