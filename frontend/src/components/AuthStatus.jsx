import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkSession } from '../services/authService';

const AuthStatus = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await checkSession();
        if (res.authenticated) {
          navigate('/home');
        } else {
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    };

    verifySession();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Mini CRM</h2>
        <p className="text-gray-600 mb-6">Please sign in to continue</p>
        <a
          href={`${import.meta.env.VITE_API_BASE_URL}/auth/google`}
          className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <svg className="w-5 h-5" viewBox="0 0 488 512" fill="currentColor">
            <path d="M488 261.8c0-17.8-1.5-35-4.3-51.7H249v98h135.7c-5.9 31-23.6 57.3-50.5 75.1l81.9 63.7C459.7 408 488 341.2 488 261.8zM249 480c65.7 0 120.8-21.7 161.1-58.9l-81.9-63.7c-22.7 15.2-51.6 24.2-79.2 24.2-60.8 0-112.3-41.1-130.7-96.3H33.9v60.5C74.5 429.5 155.8 480 249 480zM118.3 285.3C110.7 263.3 106 239.7 106 215.4s4.7-47.9 12.3-69.9V84.9H33.9C12.4 124.6 0 168.3 0 215.4s12.4 90.8 33.9 130.5l84.4-60.6zM249 96c35.7 0 67.6 12.4 92.7 33.1l69.6-69.6C371.5 25.6 312.7 0 249 0 155.8 0 74.5 50.5 33.9 130.5l84.4 60.6C136.7 137.1 188.2 96 249 96z" />
          </svg>
          Login with Google
        </a>
      </div>
    </div>
  );
};

export default AuthStatus;
