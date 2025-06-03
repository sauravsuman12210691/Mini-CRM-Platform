import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkSession, logoutUser } from '../services/authService';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await checkSession();
        if (!data.authenticated) {
          navigate('/'); // redirect if not logged in
        } else {
          setUser(data.user);
        }
      } catch (err) {
        navigate('/'); // fallback redirect on error
      }
    };

    fetchSession();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (!user) {
    return <p className="p-6 text-gray-600">Loading user...</p>;
  }

  return (
    <div className="p-6">
     

      <div className="flex items-center mb-6">
        <img src={user.photo || user.photos?.[0]?.value} alt="User" className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-2xl font-bold">Welcome, {user.displayName}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <p className="mb-4">Manage customers, create campaigns, and analyze data all in one place.</p>

      <div className="flex space-x-4">
        <Link
          to="/create-customer"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Customer
        </Link>
        <Link
          to="/customers"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          View Customers
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
