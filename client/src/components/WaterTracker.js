import React, { useState, useEffect } from 'react';
import { waterAPI } from '../services/api';
import './WaterTracker.css';

const WaterTracker = () => {
  const [water, setWater] = useState({ glassesConsumed: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWaterIntake();
  }, []);

  const fetchWaterIntake = async () => {
    try {
      const data = await waterAPI.getWaterIntake();
      setWater(data);
    } catch (err) {
      console.error('Error fetching water intake:', err);
    }
  };

  const handleAddWater = async () => {
    setLoading(true);
    try {
      const updated = await waterAPI.addWater();
      setWater(updated);
    } catch (err) {
      console.error('Error adding water:', err);
    }
    setLoading(false);
  };

  const handleRemoveWater = async () => {
    setLoading(true);
    try {
      const updated = await waterAPI.removeWater();
      setWater(updated);
    } catch (err) {
      console.error('Error removing water:', err);
    }
    setLoading(false);
  };

  const target = 8;
  const percentage = (water.glassesConsumed / target) * 100;

  return (
    <div className="water-tracker card">
      <h3>💧 Water Intake</h3>
      <p className="water-subtitle">Goal: {target} glasses/day</p>

      <div className="water-display">
        <div className="water-glasses">
          {[...Array(target)].map((_, i) => (
            <div
              key={i}
              className={`water-glass ${i < water.glassesConsumed ? 'filled' : ''}`}
              title={`Glass ${i + 1}`}
            >
              💧
            </div>
          ))}
        </div>
        <div className="water-stats">
          <span className="water-count">{water.glassesConsumed}</span>
          <span className="water-target">/ {target}</span>
        </div>
      </div>

      <div className="water-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: percentage >= 100 ? '#2ecc71' : '#3498db'
            }}
          ></div>
        </div>
        <p className="progress-text">
          {percentage >= 100
            ? '✓ Goal reached!'
            : `${target - water.glassesConsumed} glasses to go`}
        </p>
      </div>

      <div className="water-controls">
        <button
          onClick={handleRemoveWater}
          disabled={water.glassesConsumed === 0 || loading}
          className="btn btn-secondary"
        >
          − Remove
        </button>
        <button
          onClick={handleAddWater}
          disabled={water.glassesConsumed >= 12 || loading}
          className="btn btn-primary"
        >
          + Add Water
        </button>
      </div>
    </div>
  );
};

export default WaterTracker;
