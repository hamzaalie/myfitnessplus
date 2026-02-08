import React, { useState } from 'react';
import { workoutData } from '../data/mockData';
import './Workout.css';

const Workout = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const { weekPlan, stats } = workoutData;

  const selectedDayData = weekPlan.find(day => day.day === selectedDay);

  return (
    <div className="workout-page page">
      <div className="container">
        <div className="page-header">
          <h1>Workout Plan</h1>
          <p>Your structured weekly training program</p>
        </div>

        {/* Weekly Stats */}
        <section className="workout-stats">
          <div className="stats-grid grid-3">
            <div className="stat-box">
              <div className="stat-number">{stats.totalWorkouts}</div>
              <div className="stat-text">Workouts/Week</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{stats.totalDuration}</div>
              <div className="stat-text">Total Duration</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{stats.muscleGroups.length}</div>
              <div className="stat-text">Muscle Groups</div>
            </div>
          </div>
        </section>

        {/* Day Selector */}
        <section className="day-selector">
          <div className="days-pills">
            {weekPlan.map(day => (
              <button
                key={day.day}
                className={`day-pill ${selectedDay === day.day ? 'active' : ''} ${day.isRest ? 'rest' : ''}`}
                onClick={() => setSelectedDay(day.day)}
              >
                <span className="pill-day">{day.day.substring(0, 3)}</span>
                <span className="pill-name">{day.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Selected Day Workout */}
        <section className="day-workout">
          <div className="workout-header">
            <div className="workout-title">
              <h2>{selectedDayData.name}</h2>
              {!selectedDayData.isRest && (
                <span className="workout-duration">⏱️ {selectedDayData.duration}</span>
              )}
            </div>
          </div>

          {selectedDayData.isRest ? (
            <div className="rest-day-card card">
              <div className="rest-icon">😴</div>
              <h3>Rest & Recovery Day</h3>
              <p>Take time to let your muscles recover. Here are some suggested activities:</p>
              <ul className="rest-activities">
                {selectedDayData.restActivities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="exercises-list">
              <div className="exercises-header">
                <span className="header-exercise">Exercise</span>
                <span className="header-sets">Sets</span>
                <span className="header-reps">Reps</span>
                <span className="header-rest">Rest</span>
              </div>
              {selectedDayData.exercises.map((exercise, index) => (
                <div key={index} className="exercise-card card">
                  <div className="exercise-number">{index + 1}</div>
                  <div className="exercise-name">{exercise.name}</div>
                  <div className="exercise-sets">{exercise.sets}</div>
                  <div className="exercise-reps">{exercise.reps}</div>
                  <div className="exercise-rest">{exercise.rest}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Weekly Schedule Overview */}
        <section className="schedule-overview">
          <h2>Weekly Schedule</h2>
          <div className="schedule-grid">
            {weekPlan.map(day => (
              <div 
                key={day.day}
                className={`schedule-card ${day.isRest ? 'rest' : ''} ${selectedDay === day.day ? 'selected' : ''}`}
                onClick={() => setSelectedDay(day.day)}
              >
                <div className="schedule-day">{day.day}</div>
                <div className="schedule-name">{day.name}</div>
                {!day.isRest && (
                  <div className="schedule-exercises">{day.exercises.length} exercises</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Muscle Groups */}
        <section className="muscle-groups">
          <h2>Target Muscle Groups</h2>
          <div className="muscles-grid">
            {stats.muscleGroups.map((muscle, index) => (
              <div key={index} className="muscle-tag">
                {muscle}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Workout;
