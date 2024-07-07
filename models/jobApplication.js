// models/JobApplication.js
const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expectedAmount: { type: Number, required: true },
  expectedDuration: { type: String, enum: ['hour', 'month', 'year'], required: true },
  expectedCurrency: { type: String, required: true },
  fitDescription: { type: String, required: true },
  bidAmount: { type: Number, required: true },
  bidRank: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
