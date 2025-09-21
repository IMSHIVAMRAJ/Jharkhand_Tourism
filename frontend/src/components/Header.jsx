import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, MapPin, Star } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/destinations/');
        if (!response.ok) throw new Error('Failed to fetch destinations');
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Explore', path: '/explore', hasDropdown: true },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Homestay', path: '/homestay' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Apply', path: '/apply' }
  ];

  const isActive = (path) => {
    if (path === '/home') return location.pathname === '/' || location.pathname === '/home';
    if (path === '/explore') return location.pathname.startsWith('/explore');
    return location.pathname === path;
  };

  const handleMouseEnter = () => setIsExploreDropdownOpen(true);
  const handleMouseLeave = () => setIsExploreDropdownOpen(false);
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
                    <span className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors flex items-center space-x-1 ${isActive(item.path) ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-700'}`}>
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExploreDropdownOpen ? 'rotate-180' : ''}`} />
                    </span>
                    
                    {isExploreDropdownOpen && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-white rounded-xl shadow-2xl border border-gray-100 py-6 z-10 max-h-96 overflow-y-auto">
                        <div className="px-6 pb-4">
                          <h3 className="text-lg font-bold text-gray-800 mb-2">Explore Destinations</h3>
                          <p className="text-sm text-gray-600">Discover the beauty of Jharkhand</p>
                        </div>
                        <div className="space-y-3 px-6">
                          {loading ? <p>Loading...</p> : destinations.map((dest) => (
                            <Link
                              key={dest._id}
                              to={`/explore/${dest._id}`}
                              onClick={handleDestinationClick}
                              className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300 group border border-transparent hover:border-green-200"
                            >
                              <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                                <img
                                  src={dest.thumbnailImage}
                                  alt={dest.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-800 group-hover:text-green-700">{dest.name}</h4>
                                
                                {/* FIXED LINE: Using optional chaining (?.) and a fallback message */}
                                <p className="text-sm text-gray-600 truncate mt-1">
                                  {dest.description?.substring(0, 80) || 'No description available'}...
                                </p>
                                
                                <div className="flex items-center space-x-4 mt-2">
                                  <div className="flex items-center text-xs text-gray-500">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    <span>{dest.address?.location?.split(',')[0]}</span>
                                  </div>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                                    <span>{dest.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-gray-100 mt-6 pt-4 px-6">
                          <Link
                            to="/explore"
                            onClick={handleDestinationClick}
                            className="flex items-center justify-center w-full py-2 text-sm font-medium text-green-600 hover:text-green-700"
                          >
                            View All Destinations →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={item.path} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.path) ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-700'}`}>
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

        {/* Mobile Menu logic... */}
      </div>
    </header>
  );
};

export default Header;