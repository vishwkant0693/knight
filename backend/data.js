const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/Knight"; // Replace 'your-database-name' with your actual database name

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

module.exports = connectToMongo;

