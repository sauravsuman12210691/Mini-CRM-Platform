import React, { useState } from 'react';
import axios from 'axios';

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    totalSpend: '',
    visitCount: '',
    lastActive: '',
    age: '',
    city: '',
    gender: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert totalSpend, visitCount, age to numbers and lastActive to Date if needed
    const payload = {
      ...formData,
      totalSpend: Number(formData.totalSpend),
      visitCount: Number(formData.visitCount),
      age: Number(formData.age),
      lastActive: formData.lastActive ? new Date(formData.lastActive) : null,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/customers`,
        payload,
        { withCredentials: true }
      );
      setMessage('Customer created successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        totalSpend: '',
        visitCount: '',
        lastActive: '',
        age: '',
        city: '',
        gender: '',
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating customer');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Customer</h2>
      {message && <p className="mb-4 text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Customer Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="totalSpend"
          placeholder="Total Spend"
          value={formData.totalSpend}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="visitCount"
          placeholder="Visit Count"
          value={formData.visitCount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="lastActive"
          placeholder="Last Active Date"
          value={formData.lastActive}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCustomer;
