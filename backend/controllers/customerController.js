const Customer = require('../models/Customer');

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, totalSpend, visitCount, lastActive, age, city, gender } = req.body;

    // Make sure customer email is unique for this user
    const existingCustomer = await Customer.findOne({ email, createdBy: req.user.email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer with this email already exists.' });
    }

    const customer = new Customer({
      name,
      email,
      phone,
      totalSpend,
      visitCount,
      lastActive,
      age,
      city,
      gender,
      createdBy: req.user.email,
    });

    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all customers for logged-in user
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ createdBy: req.user.email });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get customers by segment filter (example: spend > X, visits < Y, inactive > Z days)
const getSegmentedCustomers = async (req, res) => {
  try {
    // You can receive filter params from req.query or req.body
    // Example filters: spendGT, visitsLT, inactiveDaysGT
    const { spendGT, visitsLT, inactiveDaysGT } = req.query;

    const filters = { createdBy: req.user.email };

    if (spendGT) filters.totalSpend = { $gt: Number(spendGT) };
    if (visitsLT) filters.visitCount = { $lt: Number(visitsLT) };
    if (inactiveDaysGT) {
      const inactiveDate = new Date();
      inactiveDate.setDate(inactiveDate.getDate() - Number(inactiveDaysGT));
      filters.lastActive = { $lt: inactiveDate };
    }

    const customers = await Customer.find(filters);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getSegmentedCustomers,
};
