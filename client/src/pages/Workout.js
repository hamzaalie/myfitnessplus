import React, { useState, useEffect } from 'react';
import { workoutsAPI } from '../services/api';
import './Workout.css';

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editWorkoutId, setEditWorkoutId] = useState(null);
  const [formData, setFormData] = useState({
    day: 'Monday',
    name: '',
    duration: '',
    isRest: false,
    exercises: [{ name: '', sets: '', reps: '' }]
  });

  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await workoutsAPI.getWorkouts();
      setWorkouts(data);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError('Failed to load workouts');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleExercise = async (workoutId, exerciseIndex) => {
    try {
      console.log('Toggling exercise - workoutId:', workoutId, 'index:', exerciseIndex);
      const updated = await workoutsAPI.toggleExercise(workoutId, exerciseIndex);
      console.log('Toggle successful, updated workout:', updated);
      setWorkouts(workouts.map(w => w._id === workoutId ? updated : w));
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error toggling exercise:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      setError(err.response?.data?.message || 'Failed to update exercise');
    }
  };

  const handleCreateWorkout = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Please enter a workout name');
      return;
    }

    if (!formData.isRest && formData.exercises.some(ex => !ex.name.trim())) {
      setError('Please fill in all exercise names or remove empty rows');
      return;
    }

    // Check for duplicate day (only when creating, not editing)
    if (!editMode) {
      const existingWorkout = workouts.find(w => w.day === formData.day);
      if (existingWorkout) {
        setError(`A workout already exists for ${formData.day}. Please edit the existing workout or choose a different day.`);
        return;
      }
    }

    try {
      const workoutData = {
        day: formData.day,
        name: formData.name,
        duration: formData.duration || '60 mins',
        isRest: formData.isRest,
        exercises: formData.isRest ? [] : formData.exercises
          .filter(ex => ex.name.trim())
          .map(ex => ({
            name: ex.name,
            sets: parseInt(ex.sets) || 3,
            reps: ex.reps || '8-10',
            completed: false
          }))
      };

      if (editMode) {
        // Update existing workout
        const updatedWorkout = await workoutsAPI.updateWorkout(editWorkoutId, workoutData);
        setWorkouts(workouts.map(w => w._id === editWorkoutId ? updatedWorkout : w));
      } else {
        // Create new workout
        const newWorkout = await workoutsAPI.createWorkout(workoutData);
        setWorkouts([...workouts, newWorkout]);
      }

      closeModal();
      setError(null);
    } catch (err) {
      console.error('Error saving workout:', err);
      setError(err.response?.data?.message || 'Failed to save workout');
    }
  };

  const handleEditWorkout = (workout) => {
    setEditMode(true);
    setEditWorkoutId(workout._id);
    setFormData({
      day: workout.day,
      name: workout.name,
      duration: workout.duration?.replace(' min', '').replace(' mins', '') || '',
      isRest: workout.isRest || false,
      exercises: workout.exercises && workout.exercises.length > 0
        ? workout.exercises.map(ex => ({
            name: ex.name,
            sets: ex.sets.toString(),
            reps: ex.reps
          }))
        : [{ name: '', sets: '', reps: '' }]
    });
    setShowCreateModal(true);
  };

  const handleDeleteWorkout = async (workoutId) => {
    if (!window.confirm('Are you sure you want to delete this workout?')) {
      return;
    }

    try {
      await workoutsAPI.deleteWorkout(workoutId);
      setWorkouts(workouts.filter(w => w._id !== workoutId));
      setError(null);
    } catch (err) {
      console.error('Error deleting workout:', err);
      setError(err.response?.data?.message || 'Failed to delete workout');
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setEditMode(false);
    setEditWorkoutId(null);
    setFormData({
      day: 'Monday',
      name: '',
      duration: '',
      isRest: false,
      exercises: [{ name: '', sets: '', reps: '' }]
    });
  };

  const addExerciseRow = () => {
    setFormData({
      ...formData,
      exercises: [...formData.exercises, { name: '', sets: '', reps: '' }]
    });
  };

  const removeExerciseRow = (index) => {
    setFormData({
      ...formData,
      exercises: formData.exercises.filter((_, i) => i !== index)
    });
  };

  const updateExercise = (index, field, value) => {
    const updatedExercises = [...formData.exercises];
    updatedExercises[index][field] = value;
    setFormData({ ...formData, exercises: updatedExercises });
  };

  const selectedDayWorkout = workouts.find(w => w.day === selectedDay);
  const sortedWorkouts = [...workouts].sort((a, b) => 
    dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
  );

  const getCompletionPercentage = (workout) => {
    if (!workout.exercises || workout.exercises.length === 0) return 0;
    const completed = workout.exercises.filter(e => e.completed).length;
    return Math.round((completed / workout.exercises.length) * 100);
  };

  const getTotalExercises = () => {
    return workouts.reduce((sum, w) => sum + (w.exercises?.length || 0), 0);
  };

  const getCompletedWorkoutDays = () => {
    return workouts.filter(w => getCompletionPercentage(w) === 100).length;
  };

  if (loading) {
    return (
      <div className="workout-page page">
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '300px' 
          }}>
            <p>Loading workouts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="workout-page page">
        <div className="container">
          <div className="alert alert-error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="workout-page page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Workout Plan</h1>
            <p>Your structured weekly training program</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            + Create Workout
          </button>
        </div>

        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        {/* Weekly Stats */}
        <section className="workout-stats">
          <div className="stats-grid grid-3">
            <div className="stat-box">
              <div className="stat-number">{workouts.length}</div>
              <div className="stat-text">Workouts/Week</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{getTotalExercises()}</div>
              <div className="stat-text">Total Exercises</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{getCompletedWorkoutDays()}</div>
              <div className="stat-text">Completed Days</div>
            </div>
          </div>
        </section>

        {/* Day Selector */}
        <section className="day-selector">
          <div className="days-pills">
            {sortedWorkouts.map(workout => {
              const completion = getCompletionPercentage(workout);
              return (
                <button
                  key={workout.day}
                  className={`day-pill ${selectedDay === workout.day ? 'active' : ''} ${workout.isRest ? 'rest' : ''}`}
                  onClick={() => setSelectedDay(workout.day)}
                  title={`${workout.day} - ${completion}% complete`}
                >
                  <span className="pill-day">{workout.day.substring(0, 3)}</span>
                  <span className="pill-completion">{completion}%</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected Day Workout */}
        <section className="day-workout">
          {selectedDayWorkout ? (
            <>
              <div className="workout-header">
                <div className="workout-title">
                  <h2>{selectedDayWorkout.name || selectedDayWorkout.day}</h2>
                  {selectedDayWorkout.duration && (
                    <span className="workout-duration">⏱️ {selectedDayWorkout.duration} min</span>
                  )}
                </div>
                <div className="workout-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${getCompletionPercentage(selectedDayWorkout)}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{getCompletionPercentage(selectedDayWorkout)}% Complete</span>
                </div>
              </div>

              {selectedDayWorkout.isRest ? (
                <div className="rest-day-card card">
                  <div className="rest-icon">😴</div>
                  <h3>Rest & Recovery Day</h3>
                  <p>Take time to let your muscles recover. Suggested activities:</p>
                  <ul className="rest-activities">
                    <li>Light stretching or yoga</li>
                    <li>Walking or leisurely activity</li>
                    <li>Meal planning and prep</li>
                    <li>Stay hydrated and sleep well</li>
                  </ul>
                </div>
              ) : (
                <div className="exercises-list">
                  <div className="exercises-header">
                    <span className="header-status"></span>
                    <span className="header-exercise">Exercise</span>
                    <span className="header-sets">Sets</span>
                    <span className="header-reps">Reps</span>
                  </div>
                  {selectedDayWorkout.exercises && selectedDayWorkout.exercises.length > 0 ? (
                    selectedDayWorkout.exercises.map((exercise, index) => (
                      <div 
                        key={index} 
                        className={`exercise-card card ${exercise.completed ? 'completed' : ''}`}
                      >
                        <button
                          className="exercise-checkbox"
                          onClick={() => handleToggleExercise(selectedDayWorkout._id, index)}
                          title={exercise.completed ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {exercise.completed ? '✅' : '⭕'}
                        </button>
                        <div className="exercise-name">{exercise.name}</div>
                        <div className="exercise-sets">{exercise.sets}</div>
                        <div className="exercise-reps">{exercise.reps}</div>
                      </div>
                    ))
                  ) : (
                    <p className="no-exercises">No exercises listed for this day. Add exercises to get started!</p>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="no-workout-card card">
              <p>No workout data for {selectedDay}</p>
            </div>
          )}
        </section>

        {/* Weekly Schedule Overview */}
        <section className="schedule-overview">
          <h2>Weekly Schedule</h2>
          <div className="schedule-grid">
            {sortedWorkouts.map(workout => {
              const completion = getCompletionPercentage(workout);
              return (
                <div 
                  key={workout.day}
                  className={`schedule-card ${workout.isRest ? 'rest' : ''} ${selectedDay === workout.day ? 'selected' : ''}`}
                >
                  <div className="schedule-card-content" onClick={() => setSelectedDay(workout.day)}>
                    <div className="schedule-day">{workout.day}</div>
                    <div className="schedule-name">{workout.name || 'Workout'}</div>
                    <div className="schedule-stat">
                      {workout.isRest ? 'Rest' : `${completion}%`}
                    </div>
                    {!workout.isRest && (
                      <div className="schedule-exercises">{workout.exercises?.length || 0} exercises</div>
                    )}
                  </div>
                  <div className="schedule-actions">
                    <button 
                      className="btn-icon btn-edit" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditWorkout(workout);
                      }}
                      title="Edit workout"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-icon btn-delete" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWorkout(workout._id);
                      }}
                      title="Delete workout"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Create/Edit Workout Modal */}
        {showCreateModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editMode ? 'Edit Workout' : 'Create Custom Workout'}</h2>
                <button className="modal-close" onClick={closeModal}>×</button>
              </div>

              <form onSubmit={handleCreateWorkout} className="workout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Day *</label>
                    <select 
                      value={formData.day} 
                      onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                      required
                    >
                      {dayOrder.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Workout Name *</label>
                    <input
                      type="text"
                      placeholder="e.g., Chest & Triceps"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Duration (mins)</label>
                    <input
                      type="text"
                      placeholder="60"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>

                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.isRest}
                        onChange={(e) => setFormData({ ...formData, isRest: e.target.checked })}
                      />
                      Rest Day
                    </label>
                  </div>
                </div>

                {!formData.isRest && (
                  <>
                    <div className="exercises-section">
                      <h3>Exercises</h3>
                      {formData.exercises.map((exercise, index) => (
                        <div key={index} className="exercise-row">
                          <input
                            type="text"
                            placeholder="Exercise name *"
                            value={exercise.name}
                            onChange={(e) => updateExercise(index, 'name', e.target.value)}
                            className="exercise-name-input"
                          />
                          <input
                            type="number"
                            placeholder="Sets"
                            value={exercise.sets}
                            onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                            className="exercise-sets-input"
                            min="1"
                          />
                          <input
                            type="text"
                            placeholder="Reps (e.g., 8-10)"
                            value={exercise.reps}
                            onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                            className="exercise-reps-input"
                          />
                          {formData.exercises.length > 1 && (
                            <button
                              type="button"
                              className="btn-remove"
                              onClick={() => removeExerciseRow(index)}
                              title="Remove exercise"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={addExerciseRow}
                      >
                        + Add Exercise
                      </button>
                    </div>
                  </>
                )}

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editMode ? 'Update Workout' : 'Create Workout'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workout;
