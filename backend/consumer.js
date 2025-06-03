// consumer.js
const mongoose = require('mongoose');
const { Kafka } = require('kafkajs');
const Customer = require('./models/Customer');
const Order = require('./models/Order');

const kafka = new Kafka({
  clientId: 'crm-consumer',
  brokers: ['localhost:9092'], // Your Kafka brokers
});

const consumer = kafka.consumer({ groupId: 'crm-group' });

const MONGO_URI = 'mongodb://localhost:27017/crm-app';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  await consumer.connect();
  await consumer.subscribe({ topic: 'customers', fromBeginning: false });
  await consumer.subscribe({ topic: 'orders', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const data = JSON.parse(message.value.toString());

      try {
        if (topic === 'customers') {
          const existing = await Customer.findOne({ email: data.email });
          if (!existing) {
            await Customer.create(data);
            console.log('Customer saved:', data.email);
          } else {
            console.log('Customer already exists:', data.email);
          }
        } else if (topic === 'orders') {
          await Order.create(data);
          console.log('Order saved for customer:', data.customerId);
        }
      } catch (error) {
        console.error('Error saving to DB:', error);
      }
    },
  });
}

run().catch(console.error);
