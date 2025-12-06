const mongoose = require('mongoose');

const connectDB = async (retries = 5) => {
    // Validate MONGODB_URI exists
    if (!process.env.MONGODB_URI) {
        console.error('❌ MONGODB_URI environment variable is not defined!');
        console.error('Please set MONGODB_URI in your Railway environment variables.');
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error(`❌ MongoDB connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️  MongoDB disconnected');
        });

    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);

        if (retries > 0) {
            console.log(`🔄 Retrying connection... (${retries} attempts remaining)`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            return connectDB(retries - 1);
        }

        console.error('❌ Failed to connect to MongoDB after multiple attempts');
        process.exit(1);
    }
};

module.exports = connectDB;
