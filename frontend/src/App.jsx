import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthStatus from './components/AuthStatus';
import Home from "./pages/Home";
import CreateCustomer from './pages/CreateCustomer';
import CustomerList from './pages/CustomerList';
function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Ideally, check session here or lift this logic to a shared place (you can adapt)
    const checkSession = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/check-session`, {
          credentials: 'include'
        });
        const data = await res.json();
        setUser(data.authenticated ? data.user : null);
      } catch (error) {
        setUser(null);
      } finally {
        setAuthChecked(true);
      }
    };

    checkSession();
  }, []);

  if (!authChecked) return <p>Loading...</p>;

  return (
    <Routes>
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/" replace />}
      />
      <Route path="/" element={<AuthStatus setUser={setUser} />} />
      <Route path="/create-customer" element={<CreateCustomer/>} />
      <Route path="/customers" element={<CustomerList/>} />
    </Routes>
  );
}

export default App;
