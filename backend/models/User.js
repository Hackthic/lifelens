const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    // Basic Information
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // Don't include password in queries by default
    },

    // Personal Details
    age: {
        type: Number,
        min: [1, 'Age must be at least 1'],
        max: [150, 'Age must be less than 150']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'prefer-not-to-say']
    },
    phone: {
        type: String,
        trim: true
    },

    // Health Profile (collected during signup)
    healthProfile: {
        height: {
            type: Number, // in cm
            min: [50, 'Height must be at least 50 cm']
        },
        weight: {
            type: Number, // in kg
            min: [10, 'Weight must be at least 10 kg']
        },
        bloodGroup: {
            type: String,
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']
        },
        preExistingConditions: [{
            type: String
        }],
        allergies: [{
            type: String
        }],
        medications: [{
            type: String
        }]
    },

    // Lifestyle Information
    lifestyle: {
        activityLevel: {
            type: String,
            enum: ['sedentary', 'light', 'moderate', 'active', 'very-active']
        },
        dietaryPreference: {
            type: String,
            enum: ['vegetarian', 'non-vegetarian', 'vegan', 'eggetarian']
        },
        smokingStatus: {
            type: String,
            enum: ['never', 'former', 'current']
        },
        alcoholConsumption: {
            type: String,
            enum: ['never', 'occasionally', 'regularly']
        }
    },

    // Location (for AQI data)
    location: {
        city: String,
        state: String,
        country: {
            type: String,
            default: 'India'
        }
    },

    // Account Status
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    // Only hash if password is modified
    if (!this.isModified('password')) {
        return next();
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};

module.exports = mongoose.model('User', userSchema);
