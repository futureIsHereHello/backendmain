const mongoose = require('mongoose');

const connectDB = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB connected...');
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
};

module.exports = connectDB;
