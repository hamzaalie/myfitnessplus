import React, { useState, useEffect } from 'react';
import { mealsAPI, profileAPI } from '../services/api';
import './MealPrep.css';

const MealPrep = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [targetCalories, setTargetCalories] = useState(2000);
  const [formData, setFormData] = useState({
    type: 'Breakfast',
    name: '',
    calories: '',
    protein: '',
  });

  // Load meals and profile data
  useEffect(() => {
    fetchMealsAndProfile();
  }, []);

  const fetchMealsAndProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get today's date as YYYY-MM-DD
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      
      console.log('Fetching meals for date:', todayString);

      // Fetch meals for today
      const mealsData = await mealsAPI.getMeals(todayString);
      console.log('Fetched meals:', mealsData);
      setMeals(mealsData);

      // Fetch profile to get target calories
      const profileData = await profileAPI.getProfile();
      setTargetCalories(profileData.targetCalories || 2000);
    } catch (err) {
      console.error('Error fetching meals:', err);
      setError('Failed to load meals');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMeal = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.calories) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setError(null);
      
      // Get today's date as YYYY-MM-DD string
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
      
      console.log('Creating meal for date:', dateString);
      
      const newMeal = await mealsAPI.createMeal({
        type: formData.type,
        name: formData.name,
        calories: parseInt(formData.calories),
        protein: parseInt(formData.protein) || 0,
        date: dateString + 'T00:00:00.000Z', // UTC midnight
      });

      console.log('Meal created:', newMeal);
      setMeals([...meals, newMeal]);
      setFormData({
        type: 'Breakfast',
        name: '',
        calories: '',
        protein: '',
      });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding meal:', err);
      setError('Failed to add meal');
    }
  };

  const handleEditMeal = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.calories) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setError(null);
      const updatedMeal = await mealsAPI.updateMeal(editingMeal._id, {
        type: formData.type,
        name: formData.name,
        calories: parseInt(formData.calories),
        protein: parseInt(formData.protein) || 0,
      });

      setMeals(meals.map(m => m._id === editingMeal._id ? updatedMeal : m));
      setEditingMeal(null);
      setFormData({
        type: 'Breakfast',
        name: '',
        calories: '',
        protein: '',
      });
      setShowForm(false);
    } catch (err) {
      console.error('Error updating meal:', err);
      setError('Failed to update meal');
    }
  };

  const handleDeleteMeal = async (mealId) => {
    if (!window.confirm('Are you sure you want to delete this meal?')) return;

    try {
      setError(null);
      await mealsAPI.deleteMeal(mealId);
      setMeals(meals.filter(m => m._id !== mealId));
    } catch (err) {
      console.error('Error deleting meal:', err);
      setError('Failed to delete meal');
    }
  };

  const startEdit = (meal) => {
    setEditingMeal(meal);
    setFormData({
      type: meal.type,
      name: meal.name,
      calories: meal.calories.toString(),
      protein: meal.protein.toString(),
    });
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingMeal(null);
    setFormData({
      type: 'Breakfast',
      name: '',
      calories: '',
      protein: '',
    });
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

  const getTotalCalories = () => {
    return meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
  };

  const getTotalProtein = () => {
    return meals.reduce((sum, meal) => sum + (meal.protein || 0), 0);
  };

  const totalCals = getTotalCalories();
  const caloriePercent = (totalCals / targetCalories) * 100;

  if (loading) {
    return (
      <div className="mealprep-page page">
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '300px' 
          }}>
            <p>Loading meals...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mealprep-page page">
      <div className="container">
        <div className="page-header">
          <h1>Meal Prep</h1>
          <p>Track and manage your daily meals</p>
        </div>

        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        {/* Daily Summary Stats */}
        <section className="meal-summary">
          <div className="summary-grid grid-4">
            <div className="stat-card">
              <div className="stat-value">{totalCals}</div>
              <div className="stat-label">Consumed Calories</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{targetCalories}</div>
              <div className="stat-label">Target Calories</div>
            </div>
            <div className="stat-card highlight">
              <div className="stat-value">{getTotalProtein()}g</div>
              <div className="stat-label">Total Protein</div>
            </div>
            <div className="stat-card highlight">
              <div className="stat-value">{Math.round(caloriePercent)}%</div>
              <div className="stat-label">Goal Progress</div>
            </div>
          </div>
        </section>

        {/* Calorie Progress Bar */}
        <section className="calorie-progress">
          <div className="progress-header">
            <h2>Today's Calorie Goal</h2>
            <span className="remaining">
              {Math.max(0, targetCalories - totalCals)} calories remaining
            </span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${Math.min(caloriePercent, 100)}%` }}
              ></div>
            </div>
            <div className="progress-labels">
              <span>{totalCals} / {targetCalories}</span>
            </div>
          </div>
        </section>

        {/* Add Meal Button */}
        <section className="add-meal-section">
          {!showForm && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              ➕ Add New Meal
            </button>
          )}

          {/* Add/Edit Meal Form */}
          {showForm && (
            <div className="meal-form-wrapper">
              <form onSubmit={editingMeal ? handleEditMeal : handleAddMeal} className="meal-form">
                <h3>{editingMeal ? 'Edit Meal' : 'Add New Meal'}</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Meal Type</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option>Breakfast</option>
                      <option>Lunch</option>
                      <option>Dinner</option>
                      <option>Snack</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Meal Name *</label>
                    <input 
                      type="text"
                      placeholder="e.g., Grilled Chicken Salad"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Calories *</label>
                    <input 
                      type="number"
                      placeholder="e.g., 350"
                      value={formData.calories}
                      onChange={(e) => setFormData({...formData, calories: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Protein (g)</label>
                    <input 
                      type="number"
                      placeholder="e.g., 25"
                      value={formData.protein}
                      onChange={(e) => setFormData({...formData, protein: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingMeal ? 'Update Meal' : 'Add Meal'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={cancelForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>

        {/* Meals List */}
        <section className="meals-section">
          <h2>Today's Meals</h2>
          {meals.length === 0 ? (
            <p className="no-meals">No meals logged yet. Add your first meal to get started!</p>
          ) : (
            <div className="meals-grid">
              {meals.map(meal => (
                <div key={meal._id} className="meal-card card">
                  <div className="meal-header">
                    <div className="meal-type-badge">
                      <span className="meal-icon">{getMealIcon(meal.type)}</span>
                      <span className="meal-type">{meal.type}</span>
                    </div>
                    <div className="meal-actions">
                      <button 
                        className="btn-icon edit"
                        onClick={() => startEdit(meal)}
                        title="Edit meal"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon delete"
                        onClick={() => handleDeleteMeal(meal._id)}
                        title="Delete meal"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="meal-name">{meal.name}</h3>
                  
                  <div className="meal-nutrition">
                    <div className="nutrition-item">
                      <span className="nutrition-label">Calories</span>
                      <span className="nutrition-value">{meal.calories}</span>
                    </div>
                    <div className="nutrition-item">
                      <span className="nutrition-label">Protein</span>
                      <span className="nutrition-value">{meal.protein}g</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
