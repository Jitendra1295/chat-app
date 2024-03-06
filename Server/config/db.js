const mongoose = require('mongoose');

// Replace 'YOUR_CONNECTION_STRING' with your actual MongoDB connection string
const connectionString = 'mongodb://localhost:27017/chat-app';

// Connect to MongoDB
const connectDB = async () => {
    mongoose.connect(connectionString)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
};

module.exports = connectDB;
