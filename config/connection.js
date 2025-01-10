const mongoose = require('mongoose');

// Simplified connection without deprecated options
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB');

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('✓ MongoDB connection established successfully');
});

module.exports = db;
