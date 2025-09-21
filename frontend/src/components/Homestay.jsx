import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Star, 
  Loader, 
  SlidersHorizontal 
} from 'lucide-react';

const Homestay = () => {
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Other state variables for filters, view mode etc. can be added here
  
  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/homestays/');
        if (!response.ok) throw new Error('Failed to fetch homestays');
        const data = await response.json();
        setHomestays(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomestays();
  }, []);

  // FIXED FILTERING LOGIC
  const filteredHomestays = useMemo(() => {
    if (!homestays) return [];
    return homestays.filter(homestay =>
      (homestay.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (homestay.location || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [homestays, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=400&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Homestay</h1>
            <p className="text-xl">Experience authentic local hospitality in beautiful locations</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-lg -mt-12 relative z-10 mx-auto max-w-4xl rounded-xl p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by homestay name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Search Results ({filteredHomestays.length})
          </h2>
          {/* You can add your filter/view mode buttons here */}
        </div>

        {filteredHomestays.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHomestays.map((homestay) => (
              <Link 
                to={`/homestay/${homestay._id}`} 
                key={homestay._id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <img 
                    src={homestay.thumbnailImage || 'https://via.placeholder.com/400x300?text=No+Image'} 
                    alt={homestay.name} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-lg flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{homestay.rating || 'N/A'}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">{homestay.name}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{homestay.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      {homestay.originalPrice && <span className="text-gray-500 line-through">₹{homestay.originalPrice}/-</span>}
                      <span className="text-2xl font-bold text-gray-800 ml-2">₹{homestay.discountedPrice || homestay.price}/-</span>
                      <p className="text-xs text-gray-500">(Price for 1 Night)</p>
                    </div>
                    <span className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600">No homestays found</h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homestay;