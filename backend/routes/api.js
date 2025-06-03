// routes/api.js
const express = require('express');
const router = express.Router();

const { customerSchema } = require('../validation/customerValidation');
const { orderSchema } = require('../validation/orderValidation');


router.post('/customers', async (req, res) => {
  try {
    const value = await customerSchema.validateAsync(req.body);
    await publishMessage('customers', value);
    res.status(202).json({ message: 'Customer data accepted for processing' });
  } catch (error) {
    res.status(400).json({ message: 'Validation failed', error: error.message });
  }
});

router.post('/orders', async (req, res) => {
  try {
    const value = await orderSchema.validateAsync(req.body);
    await publishMessage('orders', value);
    res.status(202).json({ message: 'Order data accepted for processing' });
  } catch (error) {
    res.status(400).json({ message: 'Validation failed', error: error.message });
  }
});

module.exports = router;
