import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  MapPin,
  Star,
  ArrowRight,
  Bot,
  Globe,
  Clock,
  Users,
  Lightbulb
} from 'lucide-react';
import destination3 from '../assets/destination3.jpg';

const AIExplore = () => {
  const [query, setQuery] = useState('');
  const [numberOfDestinations, setNumberOfDestinations] = useState(5);
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock destinations data - replace with actual API call
  const mockDestinations = [
    {
      _id: '1',
      name: 'Hundru Falls',
      description: 'A magnificent waterfall surrounded by lush green forests, perfect for nature lovers and photography enthusiasts.',
      thumbnailImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      rating: 4.5,
      address: { location: 'Ranchi, Jharkhand' },
      type: 'Waterfall',
      activities: ['Photography', 'Trekking', 'Sightseeing']
    },
    {
      _id: '2',
      name: 'Betla National Park',
      description: 'Home to diverse wildlife including tigers, elephants, and various bird species in their natural habitat.',
      thumbnailImage: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400',
      rating: 4.2,
      address: { location: 'Palamu, Jharkhand' },
      type: 'National Park',
      activities: ['Wildlife Safari', 'Bird Watching', 'Nature Walk']
    },
    {
      _id: '3',
      name: 'Netarhat Hill Station',
      description: 'Known as the Queen of Chotanagpur, offering breathtaking sunrise and sunset views.',
      thumbnailImage: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400',
      rating: 4.3,
      address: { location: 'Netarhat, Jharkhand' },
      type: 'Hill Station',
      activities: ['Sunrise Viewing', 'Photography', 'Hill Walking']
    },
    {
      _id: '4',
      name: 'Deoghar Baidyanath Temple',
      description: 'One of the twelve Jyotirlingas, this ancient temple holds great religious significance.',
      thumbnailImage: 'https://images.unsplash.com/photo-1582632428515-e16e7b9b3f4e?w=400',
      rating: 4.6,
      address: { location: 'Deoghar, Jharkhand' },
      type: 'Religious Site',
      activities: ['Spiritual Journey', 'Temple Visit', 'Pilgrimage']
    },
    {
      _id: '5',
      name: 'Hazaribagh Wildlife Sanctuary',
      description: 'A pristine sanctuary known for its leopards, wild boars, and scenic landscapes.',
      thumbnailImage: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400',
      rating: 4.1,
      address: { location: 'Hazaribagh, Jharkhand' },
      type: 'Wildlife Sanctuary',
      activities: ['Wildlife Spotting', 'Photography', 'Nature Trails']
    }
  ];

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Please enter a query to search for destinations');
      return;
    }

    setIsLoading(true);
    setHasSearched(false);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Filter and limit destinations based on query and numberOfDestinations
      const filteredDestinations = mockDestinations
        .filter(dest => 
          dest.name.toLowerCase().includes(query.toLowerCase()) ||
          dest.description.toLowerCase().includes(query.toLowerCase()) ||
          dest.type.toLowerCase().includes(query.toLowerCase()) ||
          dest.activities.some(activity => activity.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, numberOfDestinations);

      // If no exact matches, return random destinations based on numberOfDestinations
      if (filteredDestinations.length === 0) {
        const randomDestinations = mockDestinations
          .sort(() => Math.random() - 0.5)
          .slice(0, numberOfDestinations);
        setDestinations(randomDestinations);
      } else {
        setDestinations(filteredDestinations);
      }

      setHasSearched(true);
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
      alert('Error getting recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen to-teal-50">
      {/* Header Section (Banner) */}
      <div 
        className="relative bg-cover bg-center py-20 overflow-hidden" 
        style={{ backgroundImage:  `url(${destination3})`  }}
      >
        <div className="absolute inset-0  to-teal-600/70" />
        <div className="container mx-auto px-4 text-center relative z-10 text-white">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full mr-4">
              <Bot className="w-12 h-12" />
            </div>
            <h1 className="text-5xl font-bold">AI-Powered Exploration</h1>
          </div>
          <p className="text-xl max-w-3xl mx-auto">
            Discover Jharkhand's hidden gems with our intelligent recommendation system. 
            Tell us what you're looking for, and let AI curate the perfect destinations for you.
          </p>
        </div>
      </div>

      {/* Search Interface */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Input Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-green-100">
            <div className="flex items-center mb-8">
              <Sparkles className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                AI Travel Assistant
              </h2>
            </div>
            
            <div className="space-y-6">
              {/* Query Input */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  What are you looking for?
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., waterfalls with trekking opportunities, wildlife sanctuaries, religious places, hill stations for sunrise viewing..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 resize-none"
                    rows="3"
                  />
                </div>
                <p className="flex items-center text-sm text-gray-500 mt-2">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Be specific about activities, landscapes, or experiences you're interested in
                </p>
              </div>

              {/* Number of Destinations */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  How many destinations would you like?
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={numberOfDestinations}
                    onChange={(e) => setNumberOfDestinations(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold text-lg min-w-[60px] text-center">
                    {numberOfDestinations}
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                disabled={isLoading || !query.trim()}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span>AI is thinking...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-6 h-6" />
                    <span>Get AI Recommendations</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                  <Bot className="absolute inset-0 m-auto w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">AI is analyzing your preferences...</h3>
              <p className="text-gray-600">
                Our intelligent system is finding the perfect destinations that match your interests.
              </p>
              <div className="flex justify-center space-x-2 mt-6">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {hasSearched && destinations.length > 0 && (
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-2">
                    AI Recommendations
                  </h3>
                  <p className="text-gray-600">
                    Found {destinations.length} destinations matching "{query}"
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-xl font-semibold">
                  <Sparkles className="inline-block w-4 h-4 mr-2" /> AI Curated
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.map((dest, index) => (
                  <div key={dest._id} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100">
                    <div className="relative">
                      <img 
                        src={dest.thumbnailImage} 
                        alt={dest.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-green-700 px-3 py-1 rounded-full font-bold text-sm">
                        #{index + 1}
                      </div>
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-lg text-sm">
                        {dest.type}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300">
                        {dest.name}
                      </h4>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {dest.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1 text-green-500" />
                          <span>{dest.address.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                          <span>{dest.rating}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {dest.activities.slice(0, 2).map((activity, i) => (
                            <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                              {activity}
                            </span>
                          ))}
                          {dest.activities.length > 2 && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              +{dest.activities.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <Link
                        to={`/explore/${dest._id}`}
                        className="group/btn flex items-center justify-center w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <span className="group-hover/btn:translate-x-1 transition-transform duration-300">
                          Explore Details
                        </span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {hasSearched && destinations.length === 0 && (
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No destinations found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search query or exploring different keywords.
              </p>
              <button
                onClick={() => {setQuery(''); setHasSearched(false);}}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
              >
                Try Another Search
              </button>
            </div>
          )}

          {/* Features Section */}
          {!hasSearched && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Smart Matching</h3>
                <p className="text-gray-600">Our AI understands your preferences and finds destinations that perfectly match your interests.</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Instant Results</h3>
                <p className="text-gray-600">Get personalized recommendations in seconds, saving you hours of research time.</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Personalized Experience</h3>
                <p className="text-gray-600">Every recommendation is tailored to your specific travel style and preferences.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIExplore;