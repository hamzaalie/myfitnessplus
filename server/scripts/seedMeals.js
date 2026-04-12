const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// Import models
const Meal = require('../models/Meal');
const User = require('../models/User');

// Get today's date at midnight
const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const sampleMeals = [
  { type: 'Breakfast', name: 'Greek Yogurt with Berries', calories: 320, protein: 18 },
  { type: 'Lunch', name: 'Grilled Chicken Salad', calories: 450, protein: 35 },
  { type: 'Snack', name: 'Almonds & Apple', calories: 200, protein: 6 },
  { type: 'Dinner', name: 'Salmon with Quinoa', calories: 550, protein: 42 }
];

const seedMeals = async () => {
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
      console.log('Usage: node seedMeals.js [user-email]');
      process.exit(1);
    }

    console.log(`👤 Found user: ${user.name} (${user.email})`);

    const today = getToday();

    // Delete existing meals for today for this user
    const deleted = await Meal.deleteMany({ 
      userId: user._id,
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }
    });
    console.log(`🗑️  Deleted ${deleted.deletedCount} existing meals for today`);

    // Create new meals
    const meals = sampleMeals.map(meal => ({
      ...meal,
      userId: user._id,
      date: today
    }));

    const created = await Meal.insertMany(meals);
    console.log(`✅ Created ${created.length} sample meals for today`);

    const totalCalories = created.reduce((sum, m) => sum + m.calories, 0);
    const totalProtein = created.reduce((sum, m) => sum + m.protein, 0);

    console.log('\n🍽️  Meals Summary:');
    created.forEach(m => {
      console.log(`   ${m.type}: ${m.name} (${m.calories} cal, ${m.protein}g protein)`);
    });
    console.log(`\n   Total: ${totalCalories} calories, ${totalProtein}g protein`);

    console.log('\n✨ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding meals:', error);
    process.exit(1);
  }
};

seedMeals();
