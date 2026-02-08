import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dashboardData, progressData } from '../data/mockData';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { todaySummary, weeklyHighlights } = dashboardData;

  // Get status color class
  const getStatusClass = (status) => {
    switch (status) {
      case 'green': return 'status-green';
      case 'amber': return 'status-amber';
      case 'red': return 'status-red';
      default: return 'status-amber';
    }
  };

  return (
    <div className="dashboard page">
      <div className="container">
        <div className="page-header">
          <h1>Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p>Here's your fitness overview for today</p>
        </div>

        {/* Today's Summary */}
        <section className="dashboard-section">
          <h2>Today's Summary</h2>
          <div className="summary-cards grid-4">
            <div className="summary-card">
              <div className="summary-icon">🔥</div>
              <div className="summary-info">
                <h3>{todaySummary.caloriesConsumed}</h3>
                <p>of {todaySummary.caloriesTarget} cal</p>
              </div>
              <div className="summary-progress">
                <div 
                  className="progress-bar"
                  style={{ width: `${(todaySummary.caloriesConsumed / todaySummary.caloriesTarget) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">💪</div>
              <div className="summary-info">
                <h3>{todaySummary.workoutCompleted ? 'Done!' : 'Pending'}</h3>
                <p>Today's Workout</p>
              </div>
              <div className={`workout-status ${todaySummary.workoutCompleted ? 'completed' : ''}`}>
                {todaySummary.workoutCompleted ? '✓' : '○'}
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">💧</div>
              <div className="summary-info">
                <h3>{todaySummary.waterGlasses}/8</h3>
                <p>Glasses of Water</p>
              </div>
              <div className="water-drops">
                {[...Array(8)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`drop ${i < todaySummary.waterGlasses ? 'filled' : ''}`}
                  >
                    💧
                  </span>
                ))}
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">👟</div>
              <div className="summary-info">
                <h3>{todaySummary.stepsCount.toLocaleString()}</h3>
                <p>Steps Today</p>
              </div>
              <div className="summary-progress">
                <div 
                  className="progress-bar steps"
                  style={{ width: `${(todaySummary.stepsCount / 10000) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Analytics */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Progress Overview</h2>
            <Link to="/progress" className="view-all">View Details →</Link>
          </div>
          <div className="analytics-cards grid-3">
            {progressData.categories.slice(0, 6).map((category) => (
              <Link to="/progress" key={category.id} className="analytics-card card">
                <div className="analytics-header">
                  <span className={`status-indicator ${getStatusClass(category.status)}`}></span>
                  <span className="analytics-title">{category.name}</span>
                </div>
                <div className="analytics-score">
                  <span className="score-value">{category.score}%</span>
                </div>
                <div className="analytics-bar">
                  <div 
                    className={`bar-fill ${category.status}`}
                    style={{ width: `${category.score}%` }}
                  ></div>
                </div>
                <p className="analytics-detail">
                  {category.current} / {category.target} {category.unit}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Weekly Highlights */}
        <section className="dashboard-section">
          <h2>This Week</h2>
          <div className="highlights-grid grid-4">
            <div className="highlight-card">
              <div className="highlight-value">{weeklyHighlights.workoutsCompleted}</div>
              <div className="highlight-label">Workouts</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-value">{weeklyHighlights.avgCalories}</div>
              <div className="highlight-label">Avg. Calories</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-value">{weeklyHighlights.streakDays}🔥</div>
              <div className="highlight-label">Day Streak</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-value">{weeklyHighlights.weightChange} lbs</div>
              <div className="highlight-label">Weight Change</div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-links grid-4">
            <Link to="/meals" className="quick-link-card">
              <span className="quick-icon">🍽️</span>
              <span className="quick-text">Meal Prep</span>
            </Link>
            <Link to="/workout" className="quick-link-card">
              <span className="quick-icon">🏋️</span>
              <span className="quick-text">Workout Plan</span>
            </Link>
            <Link to="/progress" className="quick-link-card">
              <span className="quick-icon">📊</span>
              <span className="quick-text">Progress</span>
            </Link>
            <Link to="/goals" className="quick-link-card">
              <span className="quick-icon">🎯</span>
              <span className="quick-text">Goals</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
