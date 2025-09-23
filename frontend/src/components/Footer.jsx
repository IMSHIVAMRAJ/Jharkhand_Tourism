import React from 'react';
import { Phone, Mail, MapPin, Mountain, Leaf, Camera, Home, Navigation, Trees, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-green-900 to-gray-900  text-white pt-4 pb-8 overflow-hidden mt-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
      
      {/* Animated Orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-600/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-lime-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-green-600/20 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="relative">
                <Trees className="w-10 h-10 text-emerald-400" />
                <Sprout className="w-5 h-5 text-lime-400 absolute -top-1 -right-1" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent ml-2">
                Jharkhand Tourism
              </h3>
            </div>
            <p className="text-green-100 leading-relaxed mb-6">
              Discover the natural beauty, rich culture, and warm hospitality of Jharkhand. 
              Experience untouched landscapes and authentic tribal heritage.
            </p>
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-10 h-10 bg-gradient-to-br from-emerald-600/20 to-lime-600/20 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center hover:from-emerald-600/30 hover:to-lime-600/30 transition-all duration-300 cursor-pointer hover:scale-110"
                >
                  <Leaf className="w-4 h-4 text-emerald-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center">
              <Navigation className="w-5 h-5 mr-2 text-emerald-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { path: '/home', label: 'Home', icon: Home },
                { path: '/explore', label: 'Destinations', icon: Mountain },
                { path: '/homestay', label: 'Homestay', icon: Home },
                { path: '/gallery', label: 'Gallery', icon: Camera }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="flex items-center text-green-200 hover:text-emerald-400 transition-all duration-300 group py-2"
                  >
                    <link.icon className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-lime-400" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                'Hotel Booking',
                'Tour Packages',
                'Transport',
                'Guide Services',
                'Adventure Tours',
                'Cultural Experiences'
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="text-green-200 hover:text-lime-400 transition-all duration-300 group flex items-center py-2"
                  >
                    <div className="w-1.5 h-1.5 bg-lime-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></div>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {service}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-emerald-400" />
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-600/20 to-green-600/20 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-100">Phone</p>
                    <p className="text-green-200 group-hover:text-emerald-300 transition-colors">
                      +91-651-2444444
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600/20 to-lime-600/20 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-lime-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-100">Email</p>
                    <p className="text-green-200 group-hover:text-lime-300 transition-colors break-all">
                      info@jharkhndtourism.gov.in
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-lime-600/20 to-emerald-600/20 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5 text-lime-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-100">Address</p>
                    <p className="text-green-200 group-hover:text-lime-300 transition-colors">
                      Ranchi, Jharkhand 834001
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-green-800/50 to-emerald-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-2">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="font-bold text-lg mb-2 text-white">Stay Updated</h4>
              <p className="text-green-200">Get the latest travel updates and offers</p>
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-green-800/50 border border-white/10 rounded-lg text-white placeholder-green-300 focus:outline-none focus:border-lime-400 transition-colors"
              />
              <button className="px-6 py-2 bg-gradient-to-r  text-white rounded-lg hover:from-emerald-600  transition-all duration-300 transform hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        {/* <div className="border-t border-green-700/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-green-300 text-sm mb-4 md:mb-0">
              © 2024 Jharkhand Tourism Department. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-green-300 hover:text-lime-400 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-green-300 hover:text-lime-400 transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-green-300 hover:text-lime-400 transition-colors text-sm">Accessibility</a>
            </div>
          </div>
        </div> */}
      </div>

      {/* Floating Elements */}
      {/* <div className="absolute bottom-20 left-5 w-2 h-2 bg-lime-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-1/3 right-10 w-1 h-1 bg-emerald-400 rounded-full opacity-60 animate-bounce delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full opacity-60 animate-bounce delay-2000"></div>
       */}
      {/* Forest Pattern Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-green-800 to-transparent"></div>
    </footer>
  );
};

export default Footer;