const mongoose = require('mongoose');

const dailyTrackingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    // Nutrition
    nutrition: {
        waterIntake: {
            type: Number, // in ml
            min: 0
        },
        glassesCount: {
            type: Number, // easier for users
            min: 0
        },
        caffeineIntake: {
            type: Number, // cups of coffee/tea
            min: 0
        },
        meals: [{
            name: String,
            time: String,
            items: [String],
            calories: Number
        }],
        totalCalories: {
            type: Number,
            min: 0
        },
        vegetableServings: {
            type: Number,
            min: 0
        },
        fruitServings: {
            type: Number,
            min: 0
        },
        proteinType: {
            type: String,
            enum: ['plant-based', 'animal-based', 'mixed', 'none']
        },
        junkFoodConsumed: {
            type: Boolean,
            default: false
        }
    },

    // Sleep
    sleep: {
        duration: {
            type: Number, // in hours
            min: 0,
            max: 24
        },
        quality: {
            type: String,
            enum: ['poor', 'fair', 'good', 'excellent']
        },
        bedTime: String,
        wakeTime: String
    },

    // Physical Activity
    activity: {
        steps: {
            type: Number,
            min: 0
        },
        exerciseDuration: {
            type: Number, // in minutes
            min: 0
        },
        exerciseType: [String],
        caloriesBurned: {
            type: Number,
            min: 0
        }
    },

    // Screen Time
    screenTime: {
        total: {
            type: Number, // in minutes
            min: 0
        },
        devices: [{
            type: String,
            duration: Number
        }]
    },

    // Environmental
    environment: {
        aqi: {
            type: Number,
            min: 0,
            max: 500
        },
        timeOutdoors: {
            type: Number, // in minutes
            min: 0
        },
        sunlightExposure: {
            type: Number, // in minutes
            min: 0
        },
        noiseLevel: {
            type: String,
            enum: ['quiet', 'moderate', 'loud']
        },
        indoorAirQuality: {
            type: String,
            enum: ['good', 'moderate', 'poor']
        }
    },

    // Physical Wellness
    wellness: {
        bodyPain: {
            present: {
                type: Boolean,
                default: false
            },
            location: [String], // e.g., ['back', 'neck', 'knee']
            severity: {
                type: Number,
                min: 1,
                max: 10
            }
        },
        energyLevel: {
            type: Number,
            min: 1,
            max: 10
        },
        meditationDuration: {
            type: Number, // in minutes
            min: 0
        }
    },

    // Productivity & Focus
    productivity: {
        productiveHours: {
            type: Number,
            min: 0,
            max: 24
        },
        focusQuality: {
            type: Number,
            min: 1,
            max: 10
        },
        tasksCompleted: {
            type: Number,
            min: 0
        }
    },

    // Social & Relationships
    social: {
        interactionQuality: {
            type: Number,
            min: 1,
            max: 10
        },
        timeWithLovedOnes: {
            type: Number, // in minutes
            min: 0
        }
    },

    // Mental Health
    mental: {
        mood: {
            type: String,
            enum: ['very-poor', 'poor', 'neutral', 'good', 'excellent']
        },
        stressLevel: {
            type: Number,
            min: 1,
            max: 10
        },
        notes: String
    },

    // Vitals (optional daily measurements)
    vitals: {
        heartRate: Number, // bpm
        bloodPressure: {
            systolic: Number,
            diastolic: Number
        },
        temperature: Number, // in Celsius
        weight: Number // in kg
    }
}, {
    timestamps: true
});

// Index for faster queries
dailyTrackingSchema.index({ user: 1, date: -1 });

// Ensure one entry per user per day
dailyTrackingSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyTracking', dailyTrackingSchema);
