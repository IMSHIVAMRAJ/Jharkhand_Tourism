import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight, Loader, AlertTriangle } from 'lucide-react';
// We no longer need the static data import
// import { destinationsData } from '../data/destinationsData'; 
import destinationBackground from "../assets/destination6.jpg";

const ExplorePage = () => {
  // State to store destinations from the API
  const [destinations, setDestinations] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle any potential errors
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component mounts
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
  }, []); // The empty dependency array ensures this runs only once on mount

  // --- Conditional Rendering ---
  // 1. Show a loading indicator while fetching data
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

  // 2. Show an error message if the fetch fails
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

  // 3. Render the page with the fetched data
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
        {/* Header Section */}
        <div className="text-center mb-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Jharkhand
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            Discover the hidden gems, rich culture, and natural beauty of Jharkhand. 
            From bustling cities to serene hill stations, experience the diversity 
            that makes Jharkhand truly unique.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => {
            // NOTE: The schema has `attractions` and `whatToDo`, not `placesToVisit`.
            // We can calculate the total number of attractions like this:
            const totalAttractions = (destination.attractions?.length || 0) + (destination.whatToDo?.length || 0);

            // NOTE: The schema doesn't have a `heroImage`. We'll use the first attraction's image as a fallback.
            const heroImage = destination.attractions?.[0]?.image || 'https://via.placeholder.com/400x300';
            
            // NOTE: The schema has an `about` array. We'll join it to create a description.
            const description = destination.about?.join(' ') || 'No description available.';

            return (
              <Link
                // NOTE: MongoDB uses `_id`, not `id`.
                key={destination._id}
                to={`/explore/${destination._id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={heroImage}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {destination.name}
                    </h3>
                    {/* NOTE: Rating and reviews are not in the Mongoose schema.
                        This section is commented out. You would need to add these fields to your backend.
                    <div className="flex items-center text-white/90">
                      <Star className="w-4 h-4 fill-current text-yellow-400 mr-1" />
                      <span className="text-sm">{destination.rating}</span>
                      <span className="text-sm ml-1">({destination.totalReviews} reviews)</span>
                    </div>
                    */}
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {description.substring(0, 150)}...
                  </p>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {/* Assuming address is a string like "Ranchi, Jharkhand" */}
                    <span>{destination.address?.split(',')[0]}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {totalAttractions} attractions
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

        {/* Call to Action Section (remains the same) */}
        <div className="mt-16 bg-green-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Plan Your Perfect Jharkhand Adventure
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Need help planning your trip? Our local experts are here to help you 
            create unforgettable memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/homestay"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Find Homestays
            </Link>
            <Link
              to="/apply"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors"
            >
              Get Travel Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;