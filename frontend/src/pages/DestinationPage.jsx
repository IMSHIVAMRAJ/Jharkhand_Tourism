import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Star, Calendar, Utensils, Plane, Train, Car, Camera, Clock, Users, X, Loader } from 'lucide-react';

const DestinationPage = () => {
  const { destinationId } = useParams();
  
  // State for the single destination data
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for UI interactions
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  // Fetch the specific destination data when the component mounts or the ID changes
  useEffect(() => {
    if (!destinationId) return;

    const fetchDestination = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/destinations/${destinationId}`);
        if (!response.ok) {
          throw new Error('Destination not found');
        }
        const data = await response.json();
        setDestination(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [destinationId]); // Re-run effect if destinationId changes

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-green-600" />
        <p className="ml-4 text-lg">Loading Destination...</p>
      </div>
    );
  }

  if (error || !destination) {
    return <Navigate to="/explore" replace />;
  }

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowAllImages(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[500px] overflow-hidden">
        <img src={destination.heroImage} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{destination.name}</h1>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <Star className="w-5 h-5 fill-current text-yellow-400" />
              <span>{destination.rating}</span>
              <span>({destination.totalReviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About {destination.name}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{destination.description}</p>
        </section>

        {/* Location Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-green-600" />
            Location & Address
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
              <p className="text-gray-600">{destination.address.location}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Nearest Airport</h3>
              <p className="text-gray-600">{destination.address.nearbyAirport}</p>
            </div>
          </div>
        </section>

        {/* Gallery and Places to Visit Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Camera className="w-6 h-6 mr-2 text-green-600" />
            Gallery & Attractions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            {destination.gallery.slice(0, 8).map((image, index) => (
              <div key={index} className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg" onClick={() => handleImageClick(index)}>
                <img src={image} alt={`${destination.name} ${index + 1}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold">View</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Places to Visit</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {destination.placesToVisit.map((place, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium">{place}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-green-600" />
            Events & Festivals
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.events.map((event, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{event.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                <div className="flex items-center text-green-600 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{event.month}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Popular Food Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Utensils className="w-6 h-6 mr-2 text-green-600" />
                Popular Food & Cuisine
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {destination.popularFood.map((food, index) => (
                    <div key={index} className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm text-gray-800 font-medium">{food}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* How to Reach Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Reach</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Plane className="w-6 h-6 text-blue-600" /></div>
                    <h3 className="font-semibold text-gray-800 mb-2">By Air</h3>
                    <p className="text-gray-600 text-sm">{destination.howToReach.byAir}</p>
                </div>
                <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Train className="w-6 h-6 text-green-600" /></div>
                    <h3 className="font-semibold text-gray-800 mb-2">By Train</h3>
                    <p className="text-gray-600 text-sm">{destination.howToReach.byTrain}</p>
                </div>
                <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><Car className="w-6 h-6 text-purple-600" /></div>
                    <h3 className="font-semibold text-gray-800 mb-2">By Road</h3>
                    <p className="text-gray-600 text-sm">{destination.howToReach.byRoad}</p>
                </div>
            </div>
        </section>

      </div>

      {/* Image Modal */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={() => setShowAllImages(false)}>
          <div className="relative max-w-4xl max-h-[90vh]">
            <button className="absolute -top-8 right-0 text-white hover:text-gray-300 z-10">
              <X className="w-8 h-8" />
            </button>
            <img
              src={destination.gallery[selectedImageIndex]}
              alt={`${destination.name} ${selectedImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationPage;