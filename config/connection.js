const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Database connected!');
});

module.exports = db;
