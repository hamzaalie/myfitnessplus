import React, { useState, useEffect } from 'react';
import { goalsAPI } from '../services/api';
import './Goals.css';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Weight',
    target: '',
    current: '',
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await goalsAPI.getGoals();
      setGoals(data);
    } catch (err) {
      console.error('Error fetching goals:', err);
      setError('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.target) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setError(null);
      const newGoal = await goalsAPI.createGoal({
        title: formData.title,
        category: formData.category,
        target: parseInt(formData.target),
        current: parseInt(formData.current) || 0,
      });

      setGoals([...goals, newGoal]);
      setFormData({ title: '', category: 'Weight', target: '', current: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding goal:', err);
      setError('Failed to add goal');
    }
  };

  const handleEditGoal = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.target) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setError(null);
      const updated = await goalsAPI.updateGoal(editingGoal._id, {
        title: formData.title,
        category: formData.category,
        target: parseInt(formData.target),
        current: parseInt(formData.current) || 0,
      });

      setGoals(goals.map(g => g._id === editingGoal._id ? updated : g));
      setEditingGoal(null);
      setFormData({ title: '', category: 'Weight', target: '', current: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error updating goal:', err);
      setError('Failed to update goal');
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;

    try {
      setError(null);
      await goalsAPI.deleteGoal(goalId);
      setGoals(goals.filter(g => g._id !== goalId));
    } catch (err) {
      console.error('Error deleting goal:', err);
      setError('Failed to delete goal');
    }
  };

  const startEdit = (goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      category: goal.category,
      target: goal.target.toString(),
      current: goal.current.toString(),
    });
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingGoal(null);
    setFormData({ title: '', category: 'Weight', target: '', current: '' });
    setError(null);
  };

  const getStatusClass = (goal) => {
    const progress = Math.min((goal.current / goal.target) * 100, 100);
    if (progress >= 80) return 'on-track';
    if (progress >= 50) return 'needs-attention';
    return 'behind';
  };

  const getStatusLabel = (goal) => {
    const status = getStatusClass(goal);
    switch (status) {
      case 'on-track': return 'On Track';
      case 'needs-attention': return 'Needs Attention';
      case 'behind': return 'Behind';
      default: return '';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Weight': return '⚖️';
      case 'Cardio': return '🏃';
      case 'Strength': return '💪';
      case 'Habits': return '✅';
      default: return '🎯';
    }
  };

  const onTrackCount = goals.filter(g => getStatusClass(g) === 'on-track').length;
  const needsAttention = goals.filter(g => getStatusClass(g) !== 'on-track').length;

  if (loading) {
    return (
      <div className="goals-page page">
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '300px' 
          }}>
            <p>Loading goals...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="goals-page page">
      <div className="container">
        <div className="page-header">
          <h1>Your Fitness Goals</h1>
          <p>Track your objectives, stay motivated, and achieve success</p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '12px 16px',
            marginBottom: '20px',
            backgroundColor: '#ff6b6b',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* Goal Summary */}
        <section className="goal-summary">
          <div className="summary-stats grid-4">
            <div className="summary-stat">
              <div className="stat-icon">🎯</div>
              <div className="stat-value">{goals.length}</div>
              <div className="stat-label">Active Goals</div>
            </div>
            <div className="summary-stat">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{onTrackCount}</div>
              <div className="stat-label">On Track</div>
            </div>
            <div className="summary-stat">
              <div className="stat-icon">⚠️</div>
              <div className="stat-value">{needsAttention}</div>
              <div className="stat-label">Need Attention</div>
            </div>
            <div className="summary-stat">
              <div className="stat-icon">➕</div>
              <button 
                className="add-goal-btn"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? 'Cancel' : 'Add Goal'}
              </button>
            </div>
          </div>
        </section>

        {/* Add/Edit Goal Form */}
        {showForm && (
          <section className="goal-form-section card">
            <h2>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</h2>
            <form onSubmit={editingGoal ? handleEditGoal : handleAddGoal} className="goal-form">
              <div className="form-group">
                <label htmlFor="title">Goal Title *</label>
                <input
                  type="text"
                  id="title"
                  placeholder="e.g., Lose 10 pounds"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option>Weight</option>
                    <option>Cardio</option>
                    <option>Strength</option>
                    <option>Habits</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="target">Target Value *</label>
                  <input
                    type="number"
                    id="target"
                    placeholder="e.g., 150"
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="current">Current Progress</label>
                <input
                  type="number"
                  id="current"
                  placeholder="e.g., 160"
                  value={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.value })}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingGoal ? 'Update Goal' : 'Create Goal'}
                </button>
                <button type="button" className="btn-secondary" onClick={cancelForm}>
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Main Goals */}
        {goals.length > 0 ? (
          <section className="main-goals">
            <h2>Your Goals</h2>
            <div className="goals-grid grid-2">
              {goals.map((goal) => {
                const progress = Math.min((goal.current / goal.target) * 100, 100);
                return (
                  <div key={goal._id} className={`goal-card card ${getStatusClass(goal)}`}>
                    <div className="goal-header">
                      <div className="goal-category">
                        <span className="category-icon">{getCategoryIcon(goal.category)}</span>
                        <span className="category-name">{goal.category}</span>
                      </div>
                      <span className={`goal-status-badge ${getStatusClass(goal)}`}>
                        {getStatusLabel(goal)}
                      </span>
                    </div>

                    <h3 className="goal-title">{goal.title}</h3>

                    <div className="goal-progress">
                      <div className="progress-info">
                        <span className="progress-current">{goal.current}</span>
                        <span className="progress-target">/ {goal.target}</span>
                      </div>
                      <div className="progress-bar-track">
                        <div 
                          className={`progress-bar-fill ${getStatusClass(goal)}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="progress-percentage">{Math.round(progress)}% complete</div>
                    </div>

                    <div className="goal-actions">
                      <button 
                        className="btn-edit"
                        onClick={() => startEdit(goal)}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDeleteGoal(goal._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="main-goals">
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#666',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              marginTop: '20px'
            }}>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>No goals yet. Start your fitness journey today!</p>
              {!showForm && (
                <button 
                  className="btn-primary"
                  onClick={() => setShowForm(true)}
                >
                  Create Your First Goal
                </button>
              )}
            </div>
          </section>
        )}

        {/* Motivation Section */}
        <section className="motivation">
          <div className="motivation-card card">
            <div className="motivation-content">
              <div className="quote-icon">"</div>
              <p className="quote-text">
                Success is the sum of small efforts repeated day in and day out. Your goals are your roadmap to greatness!
              </p>
              <span className="quote-author">— MyFitnessPlus Team</span>
            </div>
          </div>
        </section>

        {/* Tips for Goals */}
        <section className="goal-tips">
          <h2>Tips for Success</h2>
          <div className="tips-grid grid-3">
            <div className="tip-box card">
              <div className="tip-number">1</div>
              <h3>Set SMART Goals</h3>
              <p>Make goals Specific, Measurable, Achievable, Relevant, and Time-bound for maximum success.</p>
            </div>
            <div className="tip-box card">
              <div className="tip-number">2</div>
              <h3>Track Consistently</h3>
              <p>Update your progress regularly to stay accountable and maintain momentum toward your targets.</p>
            </div>
            <div className="tip-box card">
              <div className="tip-number">3</div>
              <h3>Celebrate Progress</h3>
              <p>Acknowledge every milestone and achievement, no matter how small—they all add up!</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Goals;
