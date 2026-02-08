import React, { useState } from 'react';
import { mealPrepData } from '../data/mockData';
import './MealPrep.css';

const MealPrep = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const { weekPlan, dailySummary } = mealPrepData;

  const selectedDayData = weekPlan.find(day => day.day === selectedDay);

  const getDayTotal = (day) => {
    return day.meals.reduce((acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein
    }), { calories: 0, protein: 0 });
  };

  const getMealIcon = (type) => {
    switch (type) {
      case 'Breakfast': return '🌅';
      case 'Lunch': return '☀️';
      case 'Dinner': return '🌙';
      case 'Snack': return '🍎';
      default: return '🍽️';
    }
  };

  return (
    <div className="mealprep-page page">
      <div className="container">
        <div className="page-header">
          <h1>Meal Prep</h1>
          <p>Your weekly meal plan for optimal nutrition</p>
        </div>

        {/* Daily Summary Stats */}
        <section className="meal-summary">
          <div className="summary-grid grid-4">
            <div className="stat-card">
              <div className="stat-value">{dailySummary.targetCalories}</div>
              <div className="stat-label">Target Calories</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{dailySummary.targetProtein}g</div>
              <div className="stat-label">Target Protein</div>
            </div>
            <div className="stat-card highlight">
              <div className="stat-value">{dailySummary.averageCalories}</div>
              <div className="stat-label">Avg. Calories</div>
            </div>
            <div className="stat-card highlight">
              <div className="stat-value">{dailySummary.averageProtein}g</div>
              <div className="stat-label">Avg. Protein</div>
            </div>
          </div>
        </section>

        {/* Day Selector */}
        <section className="day-selector">
          <div className="days-tabs">
            {weekPlan.map(day => (
              <button
                key={day.day}
                className={`day-tab ${selectedDay === day.day ? 'active' : ''}`}
                onClick={() => setSelectedDay(day.day)}
              >
                <span className="day-short">{day.day.substring(0, 3)}</span>
                <span className="day-full">{day.day}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Selected Day Meals */}
        <section className="day-meals">
          <div className="day-header">
            <h2>{selectedDay}'s Meals</h2>
            <div className="day-totals">
              <span className="total-item">
                <strong>{getDayTotal(selectedDayData).calories}</strong> calories
              </span>
              <span className="total-divider">|</span>
              <span className="total-item">
                <strong>{getDayTotal(selectedDayData).protein}g</strong> protein
              </span>
            </div>
          </div>

          <div className="meals-list">
            {selectedDayData.meals.map((meal, index) => (
              <div key={index} className="meal-card card">
                <div className="meal-icon">{getMealIcon(meal.type)}</div>
                <div className="meal-info">
                  <span className="meal-type">{meal.type}</span>
                  <h3 className="meal-name">{meal.name}</h3>
                </div>
                <div className="meal-nutrition">
                  <div className="nutrition-item">
                    <span className="nutrition-value">{meal.calories}</span>
                    <span className="nutrition-label">cal</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-value">{meal.protein}g</span>
                    <span className="nutrition-label">protein</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Overview */}
        <section className="weekly-overview">
          <h2>Weekly Overview</h2>
          <div className="week-grid">
            {weekPlan.map(day => {
              const totals = getDayTotal(day);
              const caloriePercent = (totals.calories / dailySummary.targetCalories) * 100;
              return (
                <div 
                  key={day.day} 
                  className={`week-day-card ${selectedDay === day.day ? 'selected' : ''}`}
                  onClick={() => setSelectedDay(day.day)}
                >
                  <div className="week-day-name">{day.day.substring(0, 3)}</div>
                  <div className="week-day-bar">
                    <div 
                      className="bar-fill"
                      style={{ height: `${Math.min(caloriePercent, 100)}%` }}
                    ></div>
                  </div>
                  <div className="week-day-cal">{totals.calories}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Nutrition Tips */}
        <section className="nutrition-tips">
          <h2>Nutrition Tips</h2>
          <div className="tips-grid grid-3">
            <div className="tip-card card">
              <div className="tip-icon">🥗</div>
              <h3>Eat Your Greens</h3>
              <p>Include vegetables in every meal for essential vitamins and fiber.</p>
            </div>
            <div className="tip-card card">
              <div className="tip-icon">💧</div>
              <h3>Stay Hydrated</h3>
              <p>Drink water before meals to help with portion control.</p>
            </div>
            <div className="tip-card card">
              <div className="tip-icon">⏰</div>
              <h3>Meal Timing</h3>
              <p>Eat protein within 30 minutes after your workout for best results.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MealPrep;
