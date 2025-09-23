import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors like "Invalid credentials" from the server
        throw new Error(data.message || 'Failed to log in');
      }

      // **IMPORTANT**: Store the authentication token from the server
      // The backend should return a token in the response data, e.g., data.token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Redirect to the home page or a dashboard on successful login
      navigate('/');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-green-100/50 animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">Welcome Back!</h1>
          <p className="text-sm text-gray-500 mt-2">Log in to discover more of Jharkhand's beauty.</p>
        </div>

        {/* Display Error Message */}
        {error && <div className="mb-4 text-center p-3 bg-red-100 text-red-700 rounded-xl">{error}</div>}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all duration-300"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all duration-300"
                placeholder="********"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input type="checkbox" id="remember-me" className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500" />
              <label htmlFor="remember-me" className="ml-2 text-gray-600">Remember me</label>
            </div>
            <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-700">
              Forgot password?
            </Link>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-green-800 shadow-lg hover:from-green-700 hover:to-green-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-green-600 hover:text-green-700">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;