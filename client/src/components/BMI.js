import React, { useState } from 'react';
import { calculateBMI, getBMICategory } from '../utils/fitness';
import './BMI.css';

const BMI = ({ currentProfile }) => {
  const [height, setHeight] = useState(currentProfile?.height || '');
  const [weight, setWeight] = useState(currentProfile?.currentWeight || '');
  const [bmi, setBmi] = useState(null);

  const handleCalculate = () => {
    if (height && weight) {
      const calculatedBmi = calculateBMI(weight, height);
      setBmi(calculatedBmi);
    }
  };

  const getBMIColor = () => {
    if (!bmi) return '#95a5a6';
    const category = getBMICategory(bmi);
    return category.color;
  };

  return (
    <div className="bmi-calculator card">
      <h3>BMI Calculator</h3>
      <div className="bmi-inputs">
        <div className="input-group">
          <label>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 175"
          />
        </div>
        <div className="input-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 75"
          />
        </div>
      </div>
      <button onClick={handleCalculate} className="btn btn-primary">
        Calculate BMI
      </button>

      {bmi && (
        <div className="bmi-result">
          <div className="bmi-circle" style={{ borderColor: getBMIColor() }}>
            <span className="bmi-value">{bmi}</span>
            <span className="bmi-unit">BMI</span>
          </div>
          <div className="bmi-category" style={{ color: getBMIColor() }}>
            {getBMICategory(bmi).category}
          </div>
          <p className="bmi-interpretation">
            {getBMICategory(bmi).category === 'Underweight' && 'Eat more nutritious foods and consider strength training.'}
            {getBMICategory(bmi).category === 'Normal' && 'Great! Maintain your current fitness level.'}
            {getBMICategory(bmi).category === 'Overweight' && 'Consider increasing exercise and improving diet.'}
            {getBMICategory(bmi).category === 'Obese' && 'Consult a doctor and start a fitness program.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default BMI;
