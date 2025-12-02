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
        meals: [{
            name: String,
            time: String,
            items: [String],
            calories: Number
        }],
        totalCalories: {
            type: Number,
            min: 0
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
