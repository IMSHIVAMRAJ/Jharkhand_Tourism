import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, Home, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomestaysLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // State for client-side validation errors
  const [errors, setErrors] = useState({});
  // State for errors returned from the server (e.g., "Invalid credentials")
  const [serverError, setServerError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

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

    // Re-enabled client-side validation
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/homestay/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If response is not 2xx, throw an error with the message from the backend
        throw new Error(data.msg || 'An unknown error occurred.');
      }

      // --- SUCCESS ---
      // Store the token in localStorage to keep the user logged in
      if (data.token) {
        localStorage.setItem('owner_token', data.token);
      }
      
      // Redirect to the admin dashboard
      navigate("/homestaysadmin");

    } catch (error) {
      // Catch errors from the fetch call or the thrown error above
      setServerError(error.message);
      console.error('Login failed:', error.message);
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
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative z-10">
        <div className={`max-w-md w-full space-y-8 transform transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
          {/* Header */}
          <div className="text-center">
             <div className="mx-auto h-16 w-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
               <Home className="h-8 w-8 text-white" />
             </div>
             <h2 className="text-3xl font-bold text-gray-900">Welcome Home</h2>
             <p className="text-gray-600">Homestays Admin Dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${formData.email ? 'text-emerald-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="email" name="email" type="email"
                    value={formData.email} onChange={handleInputChange}
                    className={`w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${formData.password ? 'text-emerald-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="password" name="password" type={showPassword ? 'text' : 'password'}
                    value={formData.password} onChange={handleInputChange}
                    className={`w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
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
              {/* ... Remember Me & Forgot Password ... */}
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" disabled={isSubmitting} className={`w-full flex justify-center py-3 px-4 rounded-lg text-white font-medium transition-colors ${isSubmitting ? 'bg-gray-400' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700'}`}>
                {isSubmitting ? 'Signing in...' : 'Access Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Right Side Decorative Panel */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600">
        {/* ... your decorative elements ... */}
      </div>
    </div>
  );
};

export default HomestaysLoginPage;