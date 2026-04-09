const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Workout = require('../models/Workout');

// GET all workouts for user
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching workouts' });
  }
});

// GET workout by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    if (workout.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching workout' });
  }
});

// POST create new workout
router.post('/', auth, async (req, res) => {
  try {
    const { day, name, exercises, duration, isRest } = req.body;
    
    if (!day || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const workout = new Workout({
      userId: req.user.id,
      day,
      name,
      exercises: exercises || [],
      duration: duration || '60 mins',
      isRest: isRest || false
    });
    
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Error creating workout' });
  }
});

// PUT update workout
router.put('/:id', auth, async (req, res) => {
  try {
    let workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    
    if (workout.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const { day, name, exercises, duration, isRest, completionPercentage } = req.body;
    if (day) workout.day = day;
    if (name) workout.name = name;
    if (exercises) workout.exercises = exercises;
    if (duration) workout.duration = duration;
    if (isRest !== undefined) workout.isRest = isRest;
    if (completionPercentage !== undefined) workout.completionPercentage = completionPercentage;
    
    await workout.save();
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Error updating workout' });
  }
});

// PUT toggle exercise completion
router.put('/:id/exercise/:exerciseIndex', auth, async (req, res) => {
  try {
    console.log('Toggle exercise - workout ID:', req.params.id, 'exercise index:', req.params.exerciseIndex, 'user ID:', req.user.id);
    
    let workout = await Workout.findById(req.params.id);
    if (!workout) {
      console.log('Workout not found');
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    console.log('Workout found, userId:', workout.userId.toString());
    if (workout.userId.toString() !== req.user.id) {
      console.log('Not authorized - workout belongs to:', workout.userId.toString(), 'but user is:', req.user.id);
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const index = parseInt(req.params.exerciseIndex);
    console.log('Exercise index:', index, 'exercises length:', workout.exercises.length);
    if (index >= 0 && index < workout.exercises.length) {
      workout.exercises[index].completed = !workout.exercises[index].completed;
      
      // Calculate completion percentage
      const completed = workout.exercises.filter(e => e.completed).length;
      workout.completionPercentage = Math.round((completed / workout.exercises.length) * 100);
      console.log('Updated completion percentage:', workout.completionPercentage);
    }
    
    await workout.save();
    console.log('Workout saved successfully');
    res.json(workout);
  } catch (err) {
    console.error('Error in toggle exercise:', err);
    res.status(500).json({ message: 'Error updating exercise', error: err.message });
  }
});

// DELETE workout
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    
    if (workout.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting workout' });
  }
});

module.exports = router;
