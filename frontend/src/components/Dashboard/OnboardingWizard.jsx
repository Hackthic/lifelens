import React, { useState } from 'react';
import './OnboardingWizard.css';

const OnboardingWizard = ({ onComplete, existingData }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        age: existingData?.age || '',
        gender: existingData?.gender || '',
        phone: existingData?.phone || '',
        healthProfile: {
            height: existingData?.healthProfile?.height || '',
            weight: existingData?.healthProfile?.weight || '',
            bloodGroup: existingData?.healthProfile?.bloodGroup || '',
        },
        lifestyle: {
            activityLevel: existingData?.lifestyle?.activityLevel || '',
            dietaryPreference: existingData?.lifestyle?.dietaryPreference || '',
            smokingStatus: existingData?.lifestyle?.smokingStatus || 'never',
            alcoholConsumption: existingData?.lifestyle?.alcoholConsumption || 'never',
        },
        location: {
            city: existingData?.location?.city || '',
            state: existingData?.location?.state || '',
        },
        goals: existingData?.goals || [],
        baselines: {
            dailyStepTarget: 10000,
            dailyWaterTarget: 2000,
            dailyCalorieTarget: 2000,
        },
        workInfo: {
            occupationType: '',
            sleepSchedule: '',
        },
    });

    const totalSteps = 5;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            const [section, field] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: type === 'number' && value ? parseFloat(value) : value
                }
            }));
        } else if (name === 'goals') {
            if (checked) {
                setFormData(prev => ({
                    ...prev,
                    goals: [...prev.goals, value]
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    goals: prev.goals.filter(g => g !== value)
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'number' && value ? parseFloat(value) : value
            }));
        }
    };

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onComplete(formData);
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-wizard">
                <div className="wizard-header">
                    <h1>Welcome to LifeLens! 🌟</h1>
                    <p>Let's set up your health profile</p>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        />
                    </div>
                    <p className="step-indicator">Step {step} of {totalSteps}</p>
                </div>

                <form onSubmit={handleSubmit} className="wizard-form">
                    {step === 1 && (
                        <div className="wizard-step">
                            <h2>Basic Information</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Age *</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        max="150"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Gender *</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        <option value="prefer-not-to-say">Prefer not to say</option>
                                    </select>
                                </div>
                                <div className="form-group full-width">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 1234567890"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="wizard-step">
                            <h2>Health Profile</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Height (cm) *</label>
                                    <input
                                        type="number"
                                        name="healthProfile.height"
                                        value={formData.healthProfile.height}
                                        onChange={handleChange}
                                        required
                                        min="50"
                                        placeholder="170"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Weight (kg) *</label>
                                    <input
                                        type="number"
                                        name="healthProfile.weight"
                                        value={formData.healthProfile.weight}
                                        onChange={handleChange}
                                        required
                                        min="10"
                                        placeholder="70"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Blood Group</label>
                                    <select
                                        name="healthProfile.bloodGroup"
                                        value={formData.healthProfile.bloodGroup}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="Unknown">Unknown</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="wizard-step">
                            <h2>Lifestyle</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Activity Level *</label>
                                    <select
                                        name="lifestyle.activityLevel"
                                        value={formData.lifestyle.activityLevel}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="sedentary">Sedentary (little to no exercise)</option>
                                        <option value="light">Light (1-3 days/week)</option>
                                        <option value="moderate">Moderate (3-5 days/week)</option>
                                        <option value="active">Active (6-7 days/week)</option>
                                        <option value="very-active">Very Active (intense daily)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Dietary Preference *</label>
                                    <select
                                        name="lifestyle.dietaryPreference"
                                        value={formData.lifestyle.dietaryPreference}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="vegetarian">Vegetarian</option>
                                        <option value="non-vegetarian">Non-Vegetarian</option>
                                        <option value="vegan">Vegan</option>
                                        <option value="eggetarian">Eggetarian</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Occupation Type</label>
                                    <select
                                        name="workInfo.occupationType"
                                        value={formData.workInfo.occupationType}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="desk-job">Desk Job</option>
                                        <option value="active-job">Active Job</option>
                                        <option value="student">Student</option>
                                        <option value="retired">Retired</option>
                                        <option value="homemaker">Homemaker</option>
                                        <option value="entrepreneur">Entrepreneur</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Sleep Schedule</label>
                                    <select
                                        name="workInfo.sleepSchedule"
                                        value={formData.workInfo.sleepSchedule}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="early-bird">Early Bird (sleep early, wake early)</option>
                                        <option value="night-owl">Night Owl (sleep late, wake late)</option>
                                        <option value="irregular">Irregular</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="wizard-step">
                            <h2>Your Health Goals</h2>
                            <p className="step-description">Select all that apply</p>
                            <div className="goals-grid">
                                {[
                                    { value: 'weight-loss', label: '🏃 Weight Loss', icon: '🏃' },
                                    { value: 'weight-gain', label: '💪 Weight Gain', icon: '💪' },
                                    { value: 'muscle-building', label: '🏋️ Muscle Building', icon: '🏋️' },
                                    { value: 'better-sleep', label: '😴 Better Sleep', icon: '😴' },
                                    { value: 'stress-reduction', label: '🧘 Stress Reduction', icon: '🧘' },
                                    { value: 'improved-fitness', label: '🎯 Improved Fitness', icon: '🎯' },
                                    { value: 'better-nutrition', label: '🥗 Better Nutrition', icon: '🥗' },
                                    { value: 'mental-wellness', label: '💆‍♀️ Mental Wellness', icon: '💆‍♀️' },
                                ].map(goal => (
                                    <label key={goal.value} className="goal-option">
                                        <input
                                            type="checkbox"
                                            name="goals"
                                            value={goal.value}
                                            checked={formData.goals.includes(goal.value)}
                                            onChange={handleChange}
                                        />
                                        <span className="goal-card">
                                            <span className="goal-icon">{goal.icon}</span>
                                            <span className="goal-label">{goal.label.replace(/^[^ ]+ /, '')}</span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="wizard-step">
                            <h2>Location & Daily Targets</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>City *</label>
                                    <input
                                        type="text"
                                        name="location.city"
                                        value={formData.location.city}
                                        onChange={handleChange}
                                        required
                                        placeholder="Delhi"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>State *</label>
                                    <input
                                        type="text"
                                        name="location.state"
                                        value={formData.location.state}
                                        onChange={handleChange}
                                        required
                                        placeholder="Delhi"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Daily Step Target</label>
                                    <input
                                        type="number"
                                        name="baselines.dailyStepTarget"
                                        value={formData.baselines.dailyStepTarget}
                                        onChange={handleChange}
                                        min="1000"
                                        placeholder="10000"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Daily Water Target (ml)</label>
                                    <input
                                        type="number"
                                        name="baselines.dailyWaterTarget"
                                        value={formData.baselines.dailyWaterTarget}
                                        onChange={handleChange}
                                        min="500"
                                        placeholder="2000"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Daily Calorie Target</label>
                                    <input
                                        type="number"
                                        name="baselines.dailyCalorieTarget"
                                        value={formData.baselines.dailyCalorieTarget}
                                        onChange={handleChange}
                                        min="1000"
                                        placeholder="2000"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="wizard-actions">
                        {step > 1 && (
                            <button type="button" onClick={prevStep} className="btn-secondary">
                                ← Previous
                            </button>
                        )}
                        {step < totalSteps ? (
                            <button type="button" onClick={nextStep} className="btn-primary">
                                Next →
                            </button>
                        ) : (
                            <button type="submit" className="btn-primary">
                                Complete Setup ✓
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OnboardingWizard;
