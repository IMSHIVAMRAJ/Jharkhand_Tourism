import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mountain, TreePine, Waves, Mail, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState(''); // Changed from username to email
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // ✅ FIXED: Sending 'email' instead of 'username'
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.msg || 'Invalid credentials.');
      }

      if (data.token) {
        localStorage.setItem('admin_token', data.token);
      }
      
      navigate("/dashBoard");

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 400" className="w-full h-auto opacity-20">
            <path d="M0,400 L200,200 L400,300 L600,150 L800,250 L1000,100 L1200,200 L1200,400 Z" fill="rgba(34, 197, 94, 0.3)"/>
            <path d="M0,400 L150,250 L350,320 L550,180 L750,280 L950,120 L1200,220 L1200,400 Z" fill="rgba(34, 197, 94, 0.2)"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-green-700 px-8 py-10 text-center relative">
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mountain className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Jharkhand Tourism</h1>
                <p className="text-emerald-100 text-sm">Admin Portal</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome Back</h2>
                <p className="text-gray-500 text-sm">Sign in to manage tourism data</p>
              </div>

              {error && (
                <div className="flex items-center p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 mr-2"/>
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* ✅ FIXED: Changed from Username to Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your email" required
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 pr-12"
                    placeholder="Enter your password" required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit" disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}