import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, ChevronDown, MapPin, Star, Search, User, Heart,
  Home, Mountain, ShoppingBag, Building, Images, FileText,
  UserPlus, Briefcase, Palette, LogIn, UserPlus as SignupIcon
} from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  const [isApplyDropdownOpen, setIsApplyDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Explore', path: '/explore', hasDropdown: true, dropdownType: 'explore', icon: Mountain },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Homestay', path: '/homestay', icon: Building },
    { name: 'Gallery', path: '/gallery', icon: Images },
    { name: 'Apply', path: '/apply', hasDropdown: true, dropdownType: 'apply', icon: FileText }
  ];

  const applyOptions = [
    {
      name: 'Become a Guide',
      path: '/apply-guide',
      icon: UserPlus,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Register Homestay',
      path: '/apply-homestay',
      icon: Building,
      color: 'from-teal-500 to-emerald-500'
    },
    {
      name: 'Sell Handicrafts',
      path: '/apply-handicraft',
      icon: Palette,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const profileOptions = [
    { name: 'Login', path: '/login', icon: LogIn },
    { name: 'Sign Up', path: '/signup', icon: SignupIcon }
  ];

  const isActive = (path) => {
    if (path === '/home') return location.pathname === '/' || location.pathname === '/home';
    if (path === '/explore') return location.pathname.startsWith('/explore');
    if (path === '/apply') return location.pathname.startsWith('/apply');
    if (path === '/profile') return location.pathname.startsWith('/profile');
    return location.pathname === path;
  };

  const handleExploreMouseEnter = () => setIsExploreDropdownOpen(true);
  const handleExploreMouseLeave = () => setIsExploreDropdownOpen(false);
  const handleApplyMouseEnter = () => setIsApplyDropdownOpen(true);
  const handleApplyMouseLeave = () => setIsApplyDropdownOpen(false);
  const handleProfileMouseEnter = () => setIsProfileDropdownOpen(true);
  const handleProfileMouseLeave = () => setIsProfileDropdownOpen(false);
  
  const handleDropdownItemClick = () => {
    setIsExploreDropdownOpen(false);
    setIsApplyDropdownOpen(false);
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-2xl py-2'
        : 'bg-gradient-to-r from-green-50 via-white to-green-50 shadow-xl py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-4 transform transition-all duration-500 hover:scale-105 group"
          >
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-green-300/50 transition-shadow duration-300">
                <span className="text-white font-bold text-2xl">J</span>
              </div>
              <div className="absolute -inset-2 bg-green-300/20 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
                Jharkhand Tourism
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wider">Land of Forests & Traditions</span>
            </div>
          </Link>

          {/* Desktop Navigation & Profile Icon */}
          <div className="hidden lg:flex items-center space-x-1">
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={
                      item.dropdownType === 'explore' ? handleExploreMouseEnter :
                      item.dropdownType === 'apply' ? handleApplyMouseEnter :
                      undefined
                    }
                    onMouseLeave={
                      item.dropdownType === 'explore' ? handleExploreMouseLeave :
                      item.dropdownType === 'apply' ? handleApplyMouseLeave :
                      undefined
                    }
                  >
                    {item.hasDropdown ? (
                      <div className="flex items-center">
                        <div className={`
                          px-2 m-2 py-4 rounded-2xl text-sm font-semibold cursor-pointer
                          transition-all duration-500 flex items-center space-x-3 relative
                          ${isActive(item.path)
                            ? 'text-green-700 bg-green-100/80 shadow-inner'
                            : 'text-gray-700 hover:text-green-800 hover:bg-white/80'
                          }
                          group-hover:scale-105 group-hover:shadow-2xl
                        `}>
                          <IconComponent className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`
                              w-5 h-5 transition-transform duration-500
                              ${(item.dropdownType === 'explore' && isExploreDropdownOpen) ||
                                (item.dropdownType === 'apply' && isApplyDropdownOpen) ? 'rotate-180' : ''}
                            `}
                          />
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 group-hover:w-3/4"></div>
                        </div>

                        {/* Explore Dropdown */}
                        {item.dropdownType === 'explore' && isExploreDropdownOpen && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[900px] bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-green-100/50 py-6 z-10 max-h-96 overflow-y-auto animate-fade-in-down">
                            <div className="px-8 pb-4 border-b border-green-100/50">
                              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent mb-2">
                                Explore Destinations
                              </h3>
                              <p className="text-sm text-gray-600 flex items-center">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                Discover the breathtaking beauty of Jharkhand
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 p-6">
                              {loading ? (
                                <div className="col-span-2 text-center py-8">
                                  <div className="inline-flex items-center space-x-2 text-green-600">
                                    <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce"></div>
                                    <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                  </div>
                                </div>
                              ) : (
                                destinations.slice(0, 4).map((dest) => (
                                  <Link
                                    key={dest._id}
                                    to={`/explore/${dest._id}`}
                                    onClick={handleDropdownItemClick}
                                    className="group relative bg-gradient-to-br from-white to-green-50 rounded-2xl p-4 hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-green-100/50 overflow-hidden"
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-600/0 group-hover:from-green-500/5 group-hover:to-green-600/10 transition-all duration-500"></div>
                                    <div className="flex items-center space-x-4 relative z-10">
                                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                        <img
                                          src={dest.thumbnailImage}
                                          alt={dest.name}
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-lg text-gray-800 group-hover:text-green-700 transition-colors duration-300 flex items-center">
                                          {dest.name}
                                          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Popular</span>
                                        </h4>
                                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                                          {dest.description?.substring(0, 70) || 'Explore this beautiful destination...'}
                                        </p>
                                        <div className="flex items-center space-x-3 mt-2">
                                          <div className="flex items-center text-xs text-gray-500">
                                            <MapPin className="w-3 h-3 mr-1 text-green-500" />
                                            <span>{dest.address?.location?.split(',')[0] || 'Jharkhand'}</span>
                                          </div>
                                          <div className="flex items-center text-xs text-gray-500">
                                            <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                                            <span>{dest.rating || '4.5'}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                ))
                              )}
                            </div>
                            <div className="border-t border-green-100/50 mt-2 pt-4 px-8">
                              <Link
                                to="/explore"
                                onClick={handleDropdownItemClick}
                                className="group flex items-center justify-center w-full py-3 text-lg font-semibold text-green-600 hover:text-green-800 transition-all duration-300 bg-green-50/50 rounded-xl hover:bg-green-100/80"
                              >
                                <span className="group-hover:translate-x-2 transition-transform duration-300">
                                  View All Destinations
                                </span>
                                <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                              </Link>
                            </div>
                          </div>
                        )}

                        {/* Apply Dropdown */}
                        {item.dropdownType === 'apply' && isApplyDropdownOpen && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[200px] bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-green-100/50 z-10 animate-fade-in-down">
                            <div className="space-y-3 p-6">
                              {applyOptions.map((option) => {
                                const IconComponent = option.icon;
                                return (
                                  <Link
                                    key={option.name}
                                    to={option.path}
                                    onClick={handleDropdownItemClick}
                                    className="group relative bg-gradient-to-br from-white to-green-50 rounded-2xl p-4 hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-green-100/50 overflow-hidden block"
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-600/0 group-hover:from-green-500/5 group-hover:to-green-600/10 transition-all duration-500"></div>
                                    <div className="flex items-center space-x-4 relative z-10">
                                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                                        <IconComponent className="w-7 h-7 text-white" />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="font-bold text-lg text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                                          {option.name}
                                        </h4>
                                      </div>
                                      <div className="text-green-500 group-hover:text-green-700 group-hover:translate-x-2 transition-all duration-300">
                                        →
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={handleDropdownItemClick}
                        className={`
                          group relative px-6 py-4 m-0 rounded-2xl text-sm font-semibold
                          transition-all duration-500 flex items-center space-x-3
                          ${isActive(item.path)
                            ? 'text-green-700 bg-green-100/80 shadow-inner p-2'
                            : 'text-gray-700 hover:text-green-800 hover:bg-white/80'
                          }
                          hover:scale-105 hover:shadow-2xl
                        `}
                      >
                        <IconComponent className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
                        <span>{item.name}</span>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 group-hover:w-3/4"></div>
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Profile Icon with Dropdown */}
            <div
              className="relative group ml-4"
              onMouseEnter={handleProfileMouseEnter}
              onMouseLeave={handleProfileMouseLeave}
            >
              <div
                className={`
                  p-3 rounded-2xl cursor-pointer transition-all duration-300 flex items-center space-x-2
                  ${isProfileDropdownOpen ? 'bg-green-100/80' : 'hover:bg-green-100/50'}
                `}
              >
                <User size={24} className="text-gray-700 group-hover:text-green-700" />
                <ChevronDown
                  className={`
                    w-4 h-4 text-gray-700 transition-transform duration-300
                    ${isProfileDropdownOpen ? 'rotate-180' : ''}
                  `}
                />
              </div>

              {isProfileDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-48 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-green-100/50 py-2 z-20 animate-fade-in-down">
                  {profileOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <Link
                        key={option.name}
                        to={option.path}
                        onClick={handleDropdownItemClick}
                        className="flex items-center space-x-3 p-3 text-sm font-medium text-gray-700 hover:bg-green-50/50 hover:text-green-700 transition-colors duration-200"
                      >
                        <IconComponent className="w-5 h-5" />
                        <span>{option.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 rounded-2xl hover:bg-green-100/50 transition-all duration-300 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={32} className="text-green-700 group-hover:scale-110 transition-transform" />
            ) : (
              <Menu size={32} className="text-gray-700 group-hover:text-green-700 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-2xl border-t border-green-100 animate-slide-down">
            <div className="p-6 space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                if (item.hasDropdown && item.dropdownType === 'apply') {
                  return (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center space-x-4 p-4 rounded-2xl text-lg font-semibold text-gray-700 bg-green-50/50">
                        <IconComponent className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      <div className="ml-4 space-y-1">
                        {applyOptions.map((option) => {
                          const OptionIcon = option.icon;
                          return (
                            <Link
                              key={option.name}
                              to={option.path}
                              onClick={handleDropdownItemClick}
                              className="flex items-center space-x-3 p-3 rounded-xl text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-50/50 transition-all duration-300"
                            >
                              <OptionIcon className="w-4 h-4" />
                              <span>{option.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={handleDropdownItemClick}
                    className={`
                      flex items-center space-x-4 p-4 rounded-2xl text-lg font-semibold
                      transition-all duration-300 hover:scale-105 hover:shadow-lg
                      ${isActive(item.path)
                        ? 'text-green-700 bg-green-100/80'
                        : 'text-gray-700 hover:text-green-800 hover:bg-green-50/50'
                      }
                    `}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Profile options for mobile */}
              <div className="space-y-2 border-t pt-4 mt-4 border-green-100/50">
                {profileOptions.map((option) => {
                  const OptionIcon = option.icon;
                  return (
                    <Link
                      key={option.name}
                      to={option.path}
                      onClick={handleDropdownItemClick}
                      className="flex items-center space-x-4 p-4 rounded-2xl text-lg font-semibold text-gray-700 hover:text-green-800 hover:bg-green-50/50 transition-all duration-300"
                    >
                      <OptionIcon className="w-5 h-5" />
                      <span>{option.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;