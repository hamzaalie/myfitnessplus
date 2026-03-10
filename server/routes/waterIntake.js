const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const WaterIntake = require('../models/WaterIntake');

// GET water intake for today (or specific date)
router.get('/', auth, async (req, res) => {
  try {
    const { date } = req.query;
    let targetDate = new Date();
    
    if (date) {
      targetDate = new Date(date);
    }
    targetDate.setHours(0, 0, 0, 0);
    
    let waterIntake = await WaterIntake.findOne({
      userId: req.user.id,
      date: targetDate
    });
    
    if (!waterIntake) {
      waterIntake = new WaterIntake({
        userId: req.user.id,
        date: targetDate,
        glassesConsumed: 0
      });
      await waterIntake.save();
    }
    
    res.json(waterIntake);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching water intake' });
  }
});

// PUT add water glass
router.put('/add', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let waterIntake = await WaterIntake.findOne({
      userId: req.user.id,
      date: today
    });
    
    if (!waterIntake) {
      waterIntake = new WaterIntake({
        userId: req.user.id,
        date: today,
        glassesConsumed: 1
      });
    } else {
      if (waterIntake.glassesConsumed < 12) {
        waterIntake.glassesConsumed += 1;
      }
    }
    
    await waterIntake.save();
    res.json(waterIntake);
  } catch (err) {
    res.status(500).json({ message: 'Error updating water intake' });
  }
});

// PUT remove water glass
router.put('/remove', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let waterIntake = await WaterIntake.findOne({
      userId: req.user.id,
      date: today
    });
    
    if (!waterIntake) {
      waterIntake = new WaterIntake({
        userId: req.user.id,
        date: today,
        glassesConsumed: 0
      });
    } else {
      if (waterIntake.glassesConsumed > 0) {
        waterIntake.glassesConsumed -= 1;
      }
    }
    
    await waterIntake.save();
    res.json(waterIntake);
  } catch (err) {
    res.status(500).json({ message: 'Error updating water intake' });
  }
});

// PUT set water intake to specific value
router.put('/set', auth, async (req, res) => {
  try {
    const { glasses, date } = req.body;
    let targetDate = new Date();
    
    if (date) {
      targetDate = new Date(date);
    }
    targetDate.setHours(0, 0, 0, 0);
    
    let waterIntake = await WaterIntake.findOne({
      userId: req.user.id,
      date: targetDate
    });
    
    if (!waterIntake) {
      waterIntake = new WaterIntake({
        userId: req.user.id,
        date: targetDate,
        glassesConsumed: Math.min(glasses || 0, 12)
      });
    } else {
      waterIntake.glassesConsumed = Math.min(glasses || 0, 12);
    }
    
    await waterIntake.save();
    res.json(waterIntake);
  } catch (err) {
    res.status(500).json({ message: 'Error setting water intake' });
  }
});

module.exports = router;
