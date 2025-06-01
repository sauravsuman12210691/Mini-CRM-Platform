const express = require('express');
const router = express.Router();
const { handleDeliveryReceipt } = require('../controllers/deliveryController');

// POST endpoint to receive delivery receipt updates
router.post('/receipt', handleDeliveryReceipt);

module.exports = router;
