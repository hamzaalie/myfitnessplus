const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// GET user profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// PUT update user profile
router.put('/', auth, async (req, res) => {
  try {
    const { name, fitnessGoal, targetCalories, targetWeight, height, currentWeight, darkMode } = req.body;
    
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    if (name) user.name = name;
    if (fitnessGoal) user.fitnessGoal = fitnessGoal;
    if (targetCalories) user.targetCalories = targetCalories;
    if (targetWeight) user.targetWeight = targetWeight;
    if (height) user.height = height;
    if (currentWeight) user.currentWeight = currentWeight;
    if (darkMode !== undefined) user.darkMode = darkMode;
    
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// PUT update dark mode preference
router.put('/theme/dark-mode', auth, async (req, res) => {
  try {
    const { darkMode } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { darkMode },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating theme' });
  }
});

// PUT unlock badge
router.put('/badges/unlock', auth, async (req, res) => {
  try {
    const { badgeId, badgeName } = req.body;
    
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Check if badge already unlocked
    const badgeExists = user.badges.find(b => b.id === badgeId);
    if (!badgeExists) {
      user.badges.push({
        id: badgeId,
        name: badgeName,
        unlocked: true,
        unlockedDate: new Date()
      });
      await user.save();
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error unlocking badge' });
  }
});

module.exports = router;
