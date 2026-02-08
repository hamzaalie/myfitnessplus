import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-content">
          <h1>Transform Your Fitness Journey</h1>
          <p>
            Track your meals, plan your workouts, monitor your progress, and achieve your 
            fitness goals with MyFitnessPlus - your personal health companion.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary btn-large">
              Get Started Free
            </Link>
            <Link to="/login" className="btn btn-secondary btn-large">
              Sign In
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-visual">
            <div className="floating-card card-1">
              <span className="card-icon">🍎</span>
              <span>Meal Tracking</span>
            </div>
            <div className="floating-card card-2">
              <span className="card-icon">💪</span>
              <span>Workout Plans</span>
            </div>
            <div className="floating-card card-3">
              <span className="card-icon">📈</span>
              <span>Progress</span>
            </div>
            <div className="floating-card card-4">
              <span className="card-icon">🎯</span>
              <span>Goals</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Everything You Need to Succeed</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🍽️</div>
            <h3>Meal Prep Planning</h3>
            <p>Plan and organize your meals for the week with our intuitive meal prep system.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏋️</div>
            <h3>Workout Routines</h3>
            <p>Access structured workout plans designed to help you reach your fitness goals.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your journey with visual indicators showing where you stand.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Set Goals</h3>
            <p>Define and track your personal fitness goals to stay motivated.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Start Your Transformation?</h2>
        <p>Join thousands of users who are already achieving their fitness goals.</p>
        <Link to="/signup" className="btn btn-primary btn-large">
          Create Free Account
        </Link>
      </section>

      <footer className="footer">
        <p>&copy; 2024 MyFitnessPlus. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
