import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Palette, Star, Sparkles, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(''); // For backend error messages
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(''); // Clear previous server errors
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/handicraft-owners/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle server-side errors (e.g., "Invalid credentials")
        throw new Error(data.msg || 'Login failed. Please try again.');
      }

      // --- SUCCESS ---
      // 1. Store the token in localStorage
      if (data.token) {
        localStorage.setItem('handicraft_owner_token', data.token);
      }

      // 2. Redirect to the admin dashboard
      navigate('/handicraft-dashboard'); // Or your desired dashboard route

    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative z-10">
        <div className={`max-w-md w-full space-y-8`}>
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600">Jharkhand Handicrafts Admin Panel</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <User className={`h-5 w-5 ${formData.email ? 'text-amber-500' : 'text-gray-400'}`} />
                   </div>
                   <input
                     id="email" name="email" type="email"
                     value={formData.email} onChange={handleInputChange}
                     className={`w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                     placeholder="Enter your email"
                   />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${formData.password ? 'text-amber-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="password" name="password" type={showPassword ? 'text' : 'password'}
                    value={formData.password} onChange={handleInputChange}
                    className={`w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Enter your password"
                  />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>

            {/* Server Error Message */}
            {serverError && (
                <div className="flex items-center p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 mr-2"/>
                    <span className="text-sm">{serverError}</span>
                </div>
            )}

            <div className="flex items-center justify-between">
              {/* Remember Me & Forgot Password */}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700'}`}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in to Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600">
        {/* Decorative elements */}
      </div>
    </div>
  );
};

export default LoginPage;