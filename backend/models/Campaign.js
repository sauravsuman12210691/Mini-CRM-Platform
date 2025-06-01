const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  segmentRules: { type: Object, required: true }, // e.g., { "$and": [ { spend: { $gt: 10000 } } ] }
  createdBy: String, // Google OAuth email or userId
  createdAt: { type: Date, default: Date.now },
  audienceSize: Number
});

module.exports = mongoose.model('Campaign', campaignSchema);
