import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { profileAPI } from '../services/api';
import BMI from '../components/BMI';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await profileAPI.getProfile();
      setProfile(data);
      setFormData(data);
    } catch (err) {
      setError('Error loading profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: isNaN(value) ? value : Number(value)
    });
  };

  const handleSave = async () => {
    try {
      const updated = await profileAPI.updateProfile(formData);
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      setError('Error updating profile');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="profile page">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!profile) {
    return <div className="profile page"><p>Error loading profile</p></div>;
  }

  return (
    <div className="profile page">
      <div className="container">
        <div className="page-header">
          <h1>My Profile</h1>
          <p>Manage your fitness settings and personal information</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Profile Card */}
        <section className="profile-section">
          <div className="profile-card card">
            <div className="profile-header">
              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
              </div>
              {!editing && (
                <button
                  className="btn btn-primary"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>

            {!editing ? (
              <div className="profile-details">
                <div className="detail-row">
                  <span className="detail-label">Fitness Goal:</span>
                  <span className="detail-value">{profile.fitnessGoal || 'Not set'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Target Calories:</span>
                  <span className="detail-value">{profile.targetCalories} cal/day</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Current Weight:</span>
                  <span className="detail-value">{profile.currentWeight ? `${profile.currentWeight} kg` : 'Not set'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Height:</span>
                  <span className="detail-value">{profile.height ? `${profile.height} cm` : 'Not set'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Target Weight:</span>
                  <span className="detail-value">{profile.targetWeight ? `${profile.targetWeight} kg` : 'Not set'}</span>
                </div>
              </div>
            ) : (
              <div className="profile-edit">
                <div className="edit-form">
                  <div className="form-group">
                    <label>Fitness Goal</label>
                    <select
                      name="fitnessGoal"
                      value={formData.fitnessGoal || ''}
                      onChange={handleInputChange}
                    >
                      <option value="General Fitness">General Fitness</option>
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Muscle Gain">Muscle Gain</option>
                      <option value="Endurance">Endurance</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Target Calories (per day)</label>
                    <input
                      type="number"
                      name="targetCalories"
                      value={formData.targetCalories || 2000}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Height (cm)</label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height || ''}
                        onChange={handleInputChange}
                        placeholder="e.g. 175"
                      />
                    </div>
                    <div className="form-group">
                      <label>Current Weight (kg)</label>
                      <input
                        type="number"
                        name="currentWeight"
                        value={formData.currentWeight || ''}
                        onChange={handleInputChange}
                        placeholder="e.g. 75"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Target Weight (kg)</label>
                    <input
                      type="number"
                      name="targetWeight"
                      value={formData.targetWeight || ''}
                      onChange={handleInputChange}
                      placeholder="e.g. 70"
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      className="btn btn-primary"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditing(false);
                        setFormData(profile);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* BMI Calculator */}
        <section className="profile-section">
          <BMI currentProfile={profile} />
        </section>

        {/* Achievements */}
        {profile.badges && profile.badges.length > 0 && (
          <section className="profile-section">
            <div className="achievements card">
              <h3>🏆 Your Achievements</h3>
              <div className="badges-grid">
                {profile.badges.filter(b => b.unlocked).map(badge => (
                  <div key={badge.id} className="badge-item">
                    <div className="badge-icon">🏆</div>
                    <div className="badge-name">{badge.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Profile;
