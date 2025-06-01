import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="font-bold text-xl">Mini CRM</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/campaigns" className="hover:underline">Campaigns</Link>
        <Link to="/segments" className="hover:underline">Segments</Link>
      </div>
    </nav>
  );
}
