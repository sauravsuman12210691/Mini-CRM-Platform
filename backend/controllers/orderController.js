const Order = require('../models/Order');
const Customer = require('../models/Customer');

const createOrder = async (req, res) => {
  try {
    const { customerId, amount } = req.body;

    // Save order
    const order = await Order.create(req.body);

    // Update customer's total spend and visit count
    await Customer.findByIdAndUpdate(customerId, {
      $inc: { totalSpend: amount, visitCount: 1 },
      lastActive: new Date()
    });

    res.status(201).json({ message: 'Order created', data: order });
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

module.exports = { createOrder, getAllOrders };
