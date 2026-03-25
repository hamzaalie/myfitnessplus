import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-shell">
          <div className="hero-content">
            <span className="hero-kicker">Personal Fitness Command Center</span>
            <h1>Build Better Habits. Track Real Progress.</h1>
            <p>
              MyFitnessPlus helps you manage meals, workouts, goals, and daily metrics in one
              focused space so your progress is measurable, consistent, and easy to maintain.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">
                Start Free
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                Sign In
              </Link>
            </div>
            <div className="hero-metrics">
              <div className="metric-card">
                <span className="metric-value">7</span>
                <span className="metric-label">Core pages</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">24/7</span>
                <span className="metric-label">Progress visibility</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">RAG</span>
                <span className="metric-label">Smart status system</span>
              </div>
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
        </div>
      </section>

      <section className="features">
        <div className="section-heading">
          <span className="section-kicker">All-in-One Experience</span>
          <h2>Everything You Need to Succeed</h2>
        </div>
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
        <div className="cta-shell">
          <h2>Ready to Start Your Transformation?</h2>
          <p>Set your plan today and turn your fitness goals into a repeatable system.</p>
          <div className="cta-actions">
            <Link to="/signup" className="btn btn-primary btn-large">
              Create Free Account
            </Link>
            <Link to="/login" className="btn btn-secondary btn-large cta-secondary">
              I Already Have an Account
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 MyFitnessPlus. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
