const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  totalSpend: { type: Number, default: 0 },
  visitCount: { type: Number, default: 0 },
  lastActive: { type: Date },
  age: { type: Number },
  city: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  createdBy: { type: String, required: true }, // usually from req.user.email
});

module.exports = mongoose.model('Customer', customerSchema);
