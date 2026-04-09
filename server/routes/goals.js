const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goal = require('../models/Goal');

// GET all goals for user
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching goals' });
  }
});

// GET goal by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    if (goal.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching goal' });
  }
});

// POST create new goal
router.post('/', auth, async (req, res) => {
  try {
    const { title, category, target, current, status, deadline } = req.body;
    
    if (!title || !category || !target) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const goal = new Goal({
      userId: req.user.id,
      title,
      category,
      target,
      current: current || '0',
      status: status || 'on-track',
      deadline
    });
    
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Error creating goal' });
  }
});

// PUT update goal
router.put('/:id', auth, async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    
    if (goal.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const { title, category, target, current, status, deadline } = req.body;
    if (title) goal.title = title;
    if (category) goal.category = category;
    if (target) goal.target = target;
    if (current !== undefined) goal.current = current;
    if (status) goal.status = status;
    if (deadline) goal.deadline = deadline;
    
    await goal.save();
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Error updating goal' });
  }
});

// DELETE goal
router.delete('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    
    if (goal.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting goal' });
  }
});

module.exports = router;
