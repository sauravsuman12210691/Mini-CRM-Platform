// validation/orderValidation.js
const Joi = require('joi');

const orderSchema = Joi.object({
  customerId: Joi.string().required(),
  amount: Joi.number().required(),
  orderDate: Joi.date().optional(),
  status: Joi.string().valid('pending', 'completed', 'cancelled').optional(),
});

module.exports = { orderSchema };
