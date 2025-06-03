const express = require('express');
const router = express.Router();
const { createCustomer, getAllCustomers, getSegmentedCustomers } = require('../controllers/customerController');

router.post('/', createCustomer);
router.get('/', getAllCustomers);
router.get('/segments', getSegmentedCustomers);

module.exports = router;
