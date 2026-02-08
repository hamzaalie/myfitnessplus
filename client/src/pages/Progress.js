import React from 'react';
import { progressData } from '../data/mockData';
import './Progress.css';

const Progress = () => {
  const { overall, categories } = progressData;

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
          <h2>Category Breakdown</h2>
          <div className="categories-grid grid-2">
            {categories.map((category) => (
              <div key={category.id} className={`category-card card ${category.status}`}>
                <div className="category-header">
                  <div className="category-title">
                    <div className={`status-badge ${category.status}`}>
                      {getStatusIcon(category.status)}
                    </div>
                    <h3>{category.name}</h3>
                  </div>
                  <span className={`status-label ${category.status}`}>
                    {getStatusLabel(category.status)}
                  </span>
                </div>

                <div className="category-progress">
                  <div className="progress-header">
                    <span className="current-value">{category.current}</span>
                    <span className="target-value">/ {category.target} {category.unit}</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className={`progress-fill ${category.status}`}
                      style={{ width: `${Math.min(category.score, 100)}%` }}
                    ></div>
                  </div>
                  <div className="progress-percentage">{category.score}%</div>
                </div>

                <p className="category-description">{category.description}</p>
              </div>
            ))}
          </div>
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
