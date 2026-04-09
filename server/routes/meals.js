const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Meal = require('../models/Meal');

// GET all meals for user (optionally filtered by date)
router.get('/', auth, async (req, res) => {
  try {
    const { date } = req.query;
    let query = { userId: req.user.id };
    
    if (date) {
      // Parse date string (YYYY-MM-DD) and create UTC range for that day
      const startDate = new Date(date + 'T00:00:00.000Z');
      const endDate = new Date(date + 'T23:59:59.999Z');
      
      console.log('Querying meals for date:', date);
      console.log('Date range:', startDate, 'to', endDate);
      
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    const meals = await Meal.find(query).sort({ date: -1 });
    console.log('Found meals:', meals.length);
    res.json(meals);
  } catch (err) {
    console.error('Error fetching meals:', err);
    res.status(500).json({ message: 'Error fetching meals' });
  }
});

// GET meal by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    if (meal.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching meal' });
  }
});

// POST create new meal
router.post('/', auth, async (req, res) => {
  try {
    const { type, name, calories, protein, date } = req.body;
    
    if (!type || !name || !calories) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Normalize date to midnight UTC
    let mealDate;
    if (date) {
      mealDate = new Date(date);
    } else {
      mealDate = new Date();
    }
    // Set to start of day in UTC
    mealDate.setUTCHours(0, 0, 0, 0);
    
    console.log('Creating meal with date:', mealDate);
    
    const meal = new Meal({
      userId: req.user.id,
      type,
      name,
      calories,
      protein: protein || 0,
      date: mealDate
    });
    
    await meal.save();
    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ message: 'Error creating meal' });
  }
});

// PUT update meal
router.put('/:id', auth, async (req, res) => {
  try {
    let meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    
    if (meal.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const { type, name, calories, protein, date } = req.body;
    if (type) meal.type = type;
    if (name) meal.name = name;
    if (calories) meal.calories = calories;
    if (protein !== undefined) meal.protein = protein;
    if (date) meal.date = date;
    
    await meal.save();
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: 'Error updating meal' });
  }
});

// DELETE meal
router.delete('/:id', auth, async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    
    if (meal.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meal deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting meal' });
  }
});

module.exports = router;
