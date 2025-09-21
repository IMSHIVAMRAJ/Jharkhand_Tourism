import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight, Loader, AlertTriangle } from 'lucide-react';
import destinationBackground from "../assets/destination6.jpg";

const ExplorePage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/destinations/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDestinations(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch destinations:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <Loader className="w-12 h-12 animate-spin text-green-600" />
          <p className="mt-4 text-lg text-gray-700">Loading Destinations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
         <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">
          <AlertTriangle className="w-12 h-12 text-red-500" />
          <p className="mt-4 text-lg text-red-700 font-semibold">Failed to load data</p>
          <p className="text-gray-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-12" 
      style={{
        backgroundImage: `url(${destinationBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Jharkhand
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            Discover the hidden gems, rich culture, and natural beauty of Jharkhand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => {
            const description = destination.description || 'No description available.';
            
            return (
              <Link
                key={destination._id}
                to={`/explore/${destination._id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.thumbnailImage}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {destination.name}
                    </h3>
                    <div className="flex items-center text-white/90">
                      <Star className="w-4 h-4 fill-current text-yellow-400 mr-1" />
                      <span className="text-sm">{destination.rating}</span>
                      <span className="text-sm ml-1">({destination.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {description.substring(0, 150)}...
                  </p>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {/* ✅ FIXED LINE: Accessing the .location property */}
                    <span>{destination.address?.location?.split(',')[0]}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {(destination.placesToVisit || []).length} attractions
                    </div>
                    <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                      <span className="text-sm mr-1">Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        
        {/* ... Call to Action Section ... */}
      </div>
    </div>
  );
};

export default ExplorePage;