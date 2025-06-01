const Customer = require('../models/Customer');

const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({ message: 'Customer created', data: customer });
  } catch (error) {
    res.status(400).json({ message: 'Error creating customer', error: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customers', error: error.message });
  }
};

module.exports = { createCustomer, getAllCustomers };
