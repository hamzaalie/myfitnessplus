import React, { useState, useEffect } from 'react';
import { goalsAPI } from '../services/api';
import './Progress.css';

const Progress = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError('Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'green': return 'On Track';
      case 'amber': return 'Needs Attention';
      case 'red': return 'Behind';
      default: return 'Unknown';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'green': return '✓';
      case 'amber': return '!';
      case 'red': return '✗';
      default: return '?';
    }
  };

  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (goals.length === 0) return { score: 0, status: 'amber', message: 'No goals set yet' };
    
    const totalProgress = goals.reduce((sum, goal) => {
      const progress = Math.min((goal.current / goal.target) * 100, 100);
      return sum + progress;
    }, 0);
    
    const avgProgress = Math.round(totalProgress / goals.length);
    let status = 'green';
    if (avgProgress < 50) status = 'red';
    else if (avgProgress < 80) status = 'amber';

    let message = '';
    if (avgProgress >= 80) message = 'Great job! You\'re on track with your fitness goals.';
    else if (avgProgress >= 50) message = 'You\'re making progress! Keep pushing to reach your goals.';
    else message = 'You\'re behind on your goals. Let\'s pick up the pace!';

    return { score: avgProgress, status, message };
  };

  const calculateStatus = (goal) => {
    const progress = Math.min((goal.current / goal.target) * 100, 100);
    if (progress >= 80) return 'green';
    if (progress >= 50) return 'amber';
    return 'red';
  };

  const overall = calculateOverallProgress();

  if (loading) {
    return (
      <div className="progress-page page">
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '400px' 
          }}>
            <p>Loading progress data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="progress-page page">
        <div className="container">
          <div className="alert alert-error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="progress-page page">
      <div className="container">
        <div className="page-header">
          <h1>Personal Progress</h1>
          <p>Track your fitness journey with our traffic light system</p>
        </div>

        {/* Overall Status */}
        <section className="overall-status">
          <div className="overall-card card">
            <div className="overall-header">
              <h2>Overall Progress</h2>
              <div className={`traffic-light ${overall.status}`}>
                <div className="light red"></div>
                <div className="light amber"></div>
                <div className="light green"></div>
              </div>
            </div>
            <div className="overall-content">
              <div className="overall-score">
                <span className="score-number">{overall.score}</span>
                <span className="score-suffix">%</span>
              </div>
              <p className="overall-message">{overall.message}</p>
            </div>
          </div>
        </section>

        {/* Traffic Light Legend */}
        <section className="legend-section">
          <div className="legend">
            <div className="legend-item">
              <span className="status-indicator status-green"></span>
              <span>On Track (80%+)</span>
            </div>
            <div className="legend-item">
              <span className="status-indicator status-amber"></span>
              <span>Needs Attention (50-79%)</span>
            </div>
            <div className="legend-item">
              <span className="status-indicator status-red"></span>
              <span>Behind (&lt;50%)</span>
            </div>
          </div>
        </section>

        {/* Category Progress */}
        <section className="categories-section">
          <h2>Your Goals Progress</h2>
          {goals.length === 0 ? (
            <p className="no-goals">No goals created yet. Head to the Goals page to set your fitness targets!</p>
          ) : (
            <div className="categories-grid grid-2">
              {goals.map((goal) => {
                const status = calculateStatus(goal);
                const progress = Math.min((goal.current / goal.target) * 100, 100);
                return (
                  <div key={goal._id} className={`category-card card ${status}`}>
                    <div className="category-header">
                      <div className="category-title">
                        <div className={`status-badge ${status}`}>
                          {getStatusIcon(status)}
                        </div>
                        <h3>{goal.title}</h3>
                      </div>
                      <span className={`status-label ${status}`}>
                        {getStatusLabel(status)}
                      </span>
                    </div>

                    <div className="category-progress">
                      <div className="progress-header">
                        <span className="current-value">{goal.current}</span>
                        <span className="target-value">/ {goal.target} {goal.category}</span>
                      </div>
                      <div className="progress-track">
                        <div 
                          className={`progress-fill ${status}`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                      <div className="progress-percentage">{Math.round(progress)}%</div>
                    </div>

                    <p className="category-description">
                      <strong>{goal.category}</strong> Goal • {goal.status || 'In progress'}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Tips Section */}
        <section className="tips-section">
          <h2>Tips for Improvement</h2>
          <div className="tips-grid grid-3">
            <div className="tip-card card">
              <div className="tip-icon">💡</div>
              <h3>Stay Consistent</h3>
              <p>Small daily actions lead to big results. Focus on building habits rather than perfection.</p>
            </div>
            <div className="tip-card card">
              <div className="tip-icon">📝</div>
              <h3>Track Everything</h3>
              <p>Log your meals and workouts daily to get accurate progress insights and stay accountable.</p>
            </div>
            <div className="tip-card card">
              <div className="tip-icon">🎯</div>
              <h3>Adjust Goals</h3>
              <p>If you're consistently behind, consider adjusting your targets to be more realistic.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Progress;
