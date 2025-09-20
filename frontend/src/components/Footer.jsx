import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Jharkhand Tourism</h3>
            <p className="text-gray-400">
              Discover the natural beauty, rich culture, and warm hospitality of Jharkhand.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/home" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/explore" className="text-gray-400 hover:text-white">Destinations</Link></li>
              <li><Link to="/homestay" className="text-gray-400 hover:text-white">Homestay</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white">Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Hotel Booking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Tour Packages</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Transport</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Guide Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-gray-400">+91-651-2444444</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-gray-400">info@jharkhndtourism.gov.in</span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-gray-400">Ranchi, Jharkhand</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Jharkhand Tourism Department. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;