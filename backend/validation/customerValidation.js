// validation/customerValidation.js
const Joi = require('joi');

const customerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  totalSpend: Joi.number().optional(),
  visitCount: Joi.number().optional(),
  lastActive: Joi.date().optional(),
});

module.exports = { customerSchema };
