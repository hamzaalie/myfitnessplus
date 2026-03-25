import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mealsAPI, workoutsAPI, waterAPI, profileAPI } from '../services/api';
import './Dashboard.css';

const motivationalQuotes = [
  "Your body is a temple, but only if you treat it right.",
  "Don't wish for it, work for it.",
  "Success is the sum of small efforts repeated day in and day out.",
  "The only bad workout is the one that didn't happen.",
  "Your health is an investment, not an expense.",
  "Push harder than yesterday if you want a different tomorrow.",
  "Take care of your body. It's the only place you have to live.",
];

const getRandomQuote = () => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quote, setQuote] = useState(null);
  const [todaySummary, setTodaySummary] = useState({
    caloriesConsumed: 0,
    caloriesTarget: 2000,
    workoutCompleted: false,
    waterGlasses: 0,
    stepsCount: 0,
  });
  const [weeklyHighlights, setWeeklyHighlights] = useState({
    workoutsCompleted: 0,
    avgCalories: 0,
    streakDays: 0,
    weightChange: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get today's date formatted as ISO string
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        const todayString = todayDate.toISOString().split('T')[0];

        // Fetch user profile to get target calories
        const profileData = await profileAPI.getProfile();
        const targetCalories = profileData.targetCalories || 2000;

        // Fetch today's meals
        const meals = await mealsAPI.getMeals(todayString);
        const caloriesConsumed = meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);

        // Fetch water intake for today
        const waterData = await waterAPI.getWaterIntake();
        const waterGlasses = waterData.glassesConsumed || 0;

        // Fetch today's workout
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayName = dayNames[todayDate.getDay()];
        const workouts = await workoutsAPI.getWorkouts();
        const todayWorkout = workouts.find(w => w.day === todayName);
        const workoutCompleted = todayWorkout ? 
          todayWorkout.exercises.every(e => e.completed) : false;

        setTodaySummary({
          caloriesConsumed,
          caloriesTarget: targetCalories,
          workoutCompleted,
          waterGlasses,
          stepsCount: Math.floor(Math.random() * 15000) + 3000, // Placeholder
        });

        // Calculate weekly highlights (using real data where available)
        setWeeklyHighlights({
          workoutsCompleted: workouts.filter(w => w.completionPercentage > 0).length,
          avgCalories: Math.round(caloriesConsumed),
          streakDays: 3, // Placeholder - would need historical data
          weightChange: 0, // Placeholder
        });

        // Set a random motivational quote
        const randomQuote = getRandomQuote();
        setQuote({ text: randomQuote, author: 'Anonymous' });

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard page">
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '400px' 
          }}>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard page">
        <div className="container">
          <div className="alert alert-error">{error}</div>
        </div>
      </div>
    );
  }

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
                  style={{ width: `${Math.min((todaySummary.caloriesConsumed / todaySummary.caloriesTarget) * 100, 100)}%` }}
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
                  style={{ width: `${Math.min((todaySummary.stepsCount / 10000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
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

        {/* Motivational Quote */}
        {quote && (
          <section className="motivational-quote">
            <div className="quote-card">
              <div className="quote-icon">💡</div>
              <blockquote className="quote-text">{quote.text}</blockquote>
              <cite className="quote-author">— {quote.author}</cite>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
