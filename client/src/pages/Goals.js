import React from 'react';
import { goalsData } from '../data/mockData';
import './Goals.css';

const Goals = () => {
  const { mainGoals, achievements } = goalsData;

  const getStatusClass = (status) => {
    switch (status) {
      case 'on-track': return 'on-track';
      case 'needs-attention': return 'needs-attention';
      case 'behind': return 'behind';
      default: return '';
    }
  };

  const getStatusLabel = (status) => {
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

  return (
    <div className="goals-page page">
      <div className="container">
        <div className="page-header">
          <h1>Goals</h1>
          <p>Track your fitness objectives and celebrate achievements</p>
        </div>

        {/* Goal Summary */}
        <section className="goal-summary">
          <div className="summary-stats grid-4">
            <div className="summary-stat">
              <div className="stat-icon">🎯</div>
              <div className="stat-value">{mainGoals.length}</div>
              <div className="stat-label">Active Goals</div>
            </div>
            <div className="summary-stat">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{mainGoals.filter(g => g.status === 'on-track').length}</div>
              <div className="stat-label">On Track</div>
            </div>
            <div className="summary-stat">
              <div className="stat-icon">⚠️</div>
              <div className="stat-value">{mainGoals.filter(g => g.status !== 'on-track').length}</div>
              <div className="stat-label">Need Attention</div>
            </div>
            <div className="summary-stat">
              <div className="stat-icon">🏆</div>
              <div className="stat-value">{achievements.length}</div>
              <div className="stat-label">Achievements</div>
            </div>
          </div>
        </section>

        {/* Main Goals */}
        <section className="main-goals">
          <h2>Your Goals</h2>
          <div className="goals-grid grid-2">
            {mainGoals.map((goal) => (
              <div key={goal.id} className={`goal-card card ${getStatusClass(goal.status)}`}>
                <div className="goal-header">
                  <div className="goal-category">
                    <span className="category-icon">{getCategoryIcon(goal.category)}</span>
                    <span className="category-name">{goal.category}</span>
                  </div>
                  <span className={`goal-status-badge ${getStatusClass(goal.status)}`}>
                    {getStatusLabel(goal.status)}
                  </span>
                </div>

                <h3 className="goal-title">{goal.title}</h3>

                <div className="goal-progress">
                  <div className="progress-info">
                    <span className="progress-current">{goal.current} {goal.unit}</span>
                    <span className="progress-target">Goal: {goal.target} {goal.unit}</span>
                  </div>
                  <div className="progress-bar-track">
                    <div 
                      className={`progress-bar-fill ${getStatusClass(goal.status)}`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-percentage">{goal.progress}% complete</div>
                </div>

                <div className="goal-footer">
                  <span className="goal-started">Started: {goal.startValue} {goal.unit}</span>
                  <span className="goal-deadline">
                    {goal.deadline === 'Ongoing' ? '🔄 Ongoing' : `📅 ${goal.deadline}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="achievements">
          <h2>Achievements</h2>
          <div className="achievements-grid grid-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card card">
                <div className="achievement-icon">{achievement.icon}</div>
                <h3 className="achievement-name">{achievement.name}</h3>
                <p className="achievement-description">{achievement.description}</p>
                <span className="achievement-date">{achievement.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Motivation Section */}
        <section className="motivation">
          <div className="motivation-card card">
            <div className="motivation-content">
              <div className="quote-icon">"</div>
              <p className="quote-text">
                The only bad workout is the one that didn't happen. Stay consistent, stay focused, and your goals will become your reality.
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
              <p>Make your goals Specific, Measurable, Achievable, Relevant, and Time-bound.</p>
            </div>
            <div className="tip-box card">
              <div className="tip-number">2</div>
              <h3>Track Daily</h3>
              <p>Log your progress every day to stay accountable and motivated.</p>
            </div>
            <div className="tip-box card">
              <div className="tip-number">3</div>
              <h3>Celebrate Wins</h3>
              <p>Acknowledge your achievements, no matter how small they may seem.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Goals;
