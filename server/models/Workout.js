const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  name: {
    type: String,
    required: true
  },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: String,
      completed: Boolean
    }
  ],
  duration: {
    type: String,
    default: '60 mins'
  },
  isRest: {
    type: Boolean,
    default: false
  },
  completionPercentage: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
