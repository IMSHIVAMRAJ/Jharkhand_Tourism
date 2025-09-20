import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MapPin, Star } from 'lucide-react';

// Import images
import destination1 from "../assets/destination1.jpg";
import destination2 from "../assets/destination2.jpg";
import destination7 from "../assets/destination7.jpg";
import destination8 from "../assets/destination8.jpg";
import spirituality from "../assets/spirituality.jpg";
import steel from "../assets/steel.jpg";

// Inline destinations data
const destinationsData = {
  'ranchi': {
    id: 'ranchi',
    name: 'Ranchi',
    thumbnailImage: destination7,
    description: 'The capital city of Jharkhand, Ranchi is known as the "City of Waterfalls" and offers a perfect blend of natural beauty and urban amenities. Surrounded by hills, rocks, and waterfalls, Ranchi serves as a gateway to explore the tribal culture and natural wonders of Jharkhand.',
    address: {
      location: 'Ranchi District, Jharkhand, India',
      nearbyAirport: 'Birsa Munda Airport, Ranchi (5 km from city center)'
    },
    rating: 4.2
  },
  'jamshedpur': {
    id: 'jamshedpur',
    name: 'Jamshedpur',
    thumbnailImage: destination8,
    description: 'Known as the "Steel City of India", Jamshedpur is a planned industrial city founded by Jamsetji Tata. It offers a unique combination of industrial heritage, well-planned infrastructure, and natural attractions with beautiful lakes and parks.',
    address: {
      location: 'East Singhbhum District, Jharkhand, India',
      nearbyAirport: 'Sonari Airport, Jamshedpur (12 km from city center)'
    },
    rating: 4.0
  },
  'deoghar': {
    id: 'deoghar',
    name: 'Deoghar',
    thumbnailImage: spirituality,
    description: 'Known as the "Abode of Gods", Deoghar is one of the most sacred pilgrimage sites in India, famous for the Baba Baidyanath Temple, one of the twelve Jyotirlingas. The town attracts millions of devotees, especially during the holy month of Shravan.',
    address: {
      location: 'Deoghar District, Jharkhand, India',
      nearbyAirport: 'Deoghar Airport (8 km from city center)'
    },
    rating: 4.5
  },
  'hazaribagh': {
    id: 'hazaribagh',
    name: 'Hazaribagh',
    thumbnailImage: destination1,
    description: 'Known for its scenic beauty and wildlife, Hazaribagh offers beautiful lakes, dense forests, and the famous Hazaribagh National Park. The name literally means "Land of a Thousand Gardens", reflecting its natural beauty and pleasant climate.',
    address: {
      location: 'Hazaribagh District, Jharkhand, India',
      nearbyAirport: 'Ranchi Airport (90 km from city center)'
    },
    rating: 4.1
  },
  'netarhat': {
    id: 'netarhat',
    name: 'Netarhat',
    thumbnailImage: '/assets/destination2.jpg',
    description: 'Known as the "Queen of Chotanagpur", Netarhat is a beautiful hill station offering spectacular sunrises and sunsets. Located at an altitude of 1070 meters, it provides a cool climate and panoramic views of the surrounding valleys and forests.',
    address: {
      location: 'Latehar District, Jharkhand, India',
      nearbyAirport: 'Ranchi Airport (156 km from hill station)'
    },
    rating: 4.6
  },
  'bokaro': {
    id: 'bokaro',
    name: 'Bokaro',
    thumbnailImage: '/assets/steel.jpg',
    description: 'Known as "Steel City", Bokaro is famous for Bokaro Steel Plant, one of the largest steel plants in India. The planned city offers modern amenities, beautiful parks, and is a perfect example of industrial development with environmental consciousness.',
    address: {
      location: 'Bokaro District, Jharkhand, India',
      nearbyAirport: 'Ranchi Airport (110 km from city center)'
    },
    rating: 3.9
  }
};

const getDestinationsList = () => {
  return Object.values(destinationsData).map(dest => ({
    id: dest.id,
    name: dest.name
  }));
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  const location = useLocation();
  
  const destinations = getDestinationsList();

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Explore', path: '/explore', hasDropdown: true },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Homestay', path: '/homestay' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Apply', path: '/apply' }
  ];

  const isActive = (path) => {
    if (path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    if (path === '/explore') {
      return location.pathname.startsWith('/explore');
    }
    return location.pathname === path;
  };

  const handleMouseEnter = () => {
    setIsExploreDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsExploreDropdownOpen(false);
  };

  const handleDestinationClick = () => {
    setIsExploreDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="text-xl font-bold text-green-700">Jharkhand Tourism</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={item.hasDropdown ? handleMouseEnter : undefined}
                onMouseLeave={item.hasDropdown ? handleMouseLeave : undefined}
              >
                {item.hasDropdown ? (
                  <div className="flex items-center">
                    <span
                      className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors flex items-center space-x-1 ${
                        isActive(item.path)
                          ? 'text-green-700 bg-green-50'
                          : 'text-gray-700 hover:text-green-700'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExploreDropdownOpen ? 'rotate-180' : ''}`} />
                    </span>
                    
                    {/* Dropdown Menu */}
                    {isExploreDropdownOpen && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-white rounded-xl shadow-2xl border border-gray-100 py-6 z-10 max-h-96 overflow-y-auto">
                        <div className="px-6 pb-4">
                          <h3 className="text-lg font-bold text-gray-800 mb-2">Explore Destinations</h3>
                          <p className="text-sm text-gray-600">Discover the beauty of Jharkhand</p>
                        </div>
                        <div className="space-y-3 px-6">
                          {destinations.map((destination) => {
                            const destData = destinationsData[destination.id];
                            return (
                              <Link
                                key={destination.id}
                                to={`/explore/${destination.id}`}
                                onClick={handleDestinationClick}
                                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300 group border border-transparent hover:border-green-200"
                              >
                                <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                                  <img
                                    src={destData.thumbnailImage}
                                    alt={destination.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                                    {destination.name}
                                  </h4>
                                  <p className="text-sm text-gray-600 truncate mt-1">
                                    {destData.description.substring(0, 80)}...
                                  </p>
                                  <div className="flex items-center space-x-4 mt-2">
                                    <div className="flex items-center text-xs text-gray-500">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      <span>{destData.address.location.split(',')[0]}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                      <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                                      <span>{destData.rating}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center transition-colors">
                                    <ChevronDown className="w-4 h-4 text-green-600 rotate-[-90deg]" />
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="border-t border-gray-100 mt-6 pt-4 px-6">
                          <Link
                            to="/explore"
                            onClick={handleDestinationClick}
                            className="flex items-center justify-center w-full py-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                          >
                            View All Destinations →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-700 hover:text-green-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                        isActive(item.path)
                          ? 'text-green-700 bg-green-50'
                          : 'text-gray-700 hover:text-green-700'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExploreDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isExploreDropdownOpen && (
                      <div className="pl-6 py-2 space-y-1">
                        {destinations.map((destination) => (
                          <Link
                            key={destination.id}
                            to={`/explore/${destination.id}`}
                            onClick={handleDestinationClick}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-green-700 transition-colors"
                          >
                            {destination.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.path)
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-700 hover:text-green-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;