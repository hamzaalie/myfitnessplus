const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// Import models
const Goal = require('../models/Goal');
const User = require('../models/User');

const sampleGoals = [
  {
    title: 'Lose 10 lbs',
    category: 'Weight',
    target: '170',
    current: '175',
    status: 'on-track',
    deadline: new Date('2026-06-01')
  },
  {
    title: 'Run a 5K',
    category: 'Cardio',
    target: '5',
    current: '3',
    status: 'on-track',
    deadline: new Date('2026-05-15')
  },
  {
    title: 'Bench Press 225 lbs',
    category: 'Strength',
    target: '225',
    current: '185',
    status: 'needs-attention',
    deadline: new Date('2026-12-31')
  },
  {
    title: 'Drink 8 glasses of water daily',
    category: 'Habits',
    target: '8',
    current: '6',
    status: 'on-track',
    deadline: new Date('2026-04-30')
  },
  {
    title: 'Workout 5 days a week',
    category: 'Habits',
    target: '5',
    current: '4',
    status: 'on-track',
    deadline: new Date('2026-12-31')
  }
];

const seedGoals = async () => {
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
      console.log('Usage: node seedGoals.js [user-email]');
      process.exit(1);
    }

    console.log(`👤 Found user: ${user.name} (${user.email})`);

    // Delete existing goals for this user
    const deleted = await Goal.deleteMany({ userId: user._id });
    console.log(`🗑️  Deleted ${deleted.deletedCount} existing goals`);

    // Create new goals
    const goals = sampleGoals.map(goal => ({
      ...goal,
      userId: user._id
    }));

    const created = await Goal.insertMany(goals);
    console.log(`✅ Created ${created.length} sample goals`);

    console.log('\n🎯 Goals Summary:');
    created.forEach(g => {
      console.log(`   ${g.title}: ${g.current}/${g.target} (${g.status})`);
    });

    console.log('\n✨ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding goals:', error);
    process.exit(1);
  }
};

seedGoals();
