import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/customers`);
        setCustomers(res.data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>
      <ul className="space-y-2">
        {customers.map((customer) => (
          <li key={customer._id} className="border p-4 rounded shadow">
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
