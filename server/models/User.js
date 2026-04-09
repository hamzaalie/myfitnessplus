const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  // Profile fields
  fitnessGoal: {
    type: String,
    default: 'General Fitness',
    enum: ['Weight Loss', 'Muscle Gain', 'General Fitness', 'Endurance']
  },
  targetCalories: {
    type: Number,
    default: 2000
  },
  targetWeight: {
    type: Number,
    default: null
  },
  height: {
    type: Number,
    default: null // in cm
  },
  currentWeight: {
    type: Number,
    default: null
  },
  // UI preferences
  darkMode: {
    type: Boolean,
    default: false
  },
  // Achievements/Badges
  badges: [
    {
      id: String,
      name: String,
      unlocked: Boolean,
      unlockedDate: Date
    }
  ]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
