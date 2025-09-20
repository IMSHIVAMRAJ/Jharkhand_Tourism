import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Camera, Mountain, Heart, Sparkles, X, Info, Calendar, Users, Star } from 'lucide-react';
import { websiteData } from '../data/CategoryData';  // Import websiteData from the main component file

// ImageModal component (can be shared)
const ImageModal = ({ image, onClose, accentColor }) => (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
    <div className="relative max-w-4xl w-full max-h-full overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="relative">
        <img
          src={image.src}
          alt={image.title}
          className="w-full h-96 object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><rect width="800" height="400" fill="%23f3f4f6"/><text x="400" y="200" text-anchor="middle" fill="%23374151" font-size="20">' + image.title + '</text></svg>';
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`}></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-3xl font-bold mb-2">{image.title}</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{image.location}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{image.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              About This Place
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {image.description}
            </p>
            
            <div className={`bg-${accentColor}-50 rounded-lg p-4`}>
              <h4 className="font-semibold mb-3">Quick Info</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Season:</span>
                  <span className="font-medium">{image.season}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{image.rating}/5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Visit Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 mt-1 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Best Time to Visit</p>
                  <p className="text-gray-600 text-sm">{image.season}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Recommended For</p>
                  <p className="text-gray-600 text-sm">All age groups, Adventure seekers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 mt-1 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Location</p>
                  <p className="text-gray-600 text-sm">{image.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const category = websiteData.categories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">Category not found!</h1>
        <button
          onClick={() => navigate('/home')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-white/90 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-10 border-b">
        <button 
          onClick={() => navigate('/home')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 hover:translate-x-1"
        >
          <ChevronLeft className="w-5 h-5 mr-1 transition-transform" />
          Back to Categories
        </button>
      </div>

      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={category.bannerImage} 
          alt={category.content.title}
          className="w-full h-full object-cover animate-in zoom-in-105 duration-1000"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><rect width="1200" height="400" fill="%23f3f4f6"/><text x="600" y="200" text-anchor="middle" fill="%23374151" font-size="24">' + category.content.title + '</text></svg>';
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-70`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-300">
            <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">{category.content.title}</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">{category.content.subtitle}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="animate-in slide-in-from-left-8 duration-1000">
            <h2 className="text-4xl font-bold mb-8 text-gray-800">
              {category.content.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              {category.content.description}
            </p>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-inner">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Highlights</h3>
              <div className="grid grid-cols-2 gap-4">
                {category.content.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center group hover:transform hover:translate-x-2 transition-all duration-300">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color} mr-4 group-hover:scale-110 transition-transform shadow-lg`}></div>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative animate-in slide-in-from-right-8 duration-1000">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src={category.content.galleries[0].src} 
                alt="Featured"
                className="w-full h-96 object-cover cursor-pointer"
                onClick={() => setSelectedImage(category.content.galleries[0])}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23f3f4f6"/><text x="300" y="200" text-anchor="middle" fill="%23374151" font-size="18">Featured Image</text></svg>';
                }}
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="bg-white rounded-full p-3 shadow-lg">
                  <Info className="w-6 h-6 text-gray-700" />
                </div>
              </div>
            </div>
            <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${category.color} rounded-full opacity-20 animate-pulse`}></div>
          </div>
        </div>

        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Discover More</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Click on any image to explore detailed information and insider tips</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.content.galleries.map((image, index) => (
              <div 
                key={index} 
                className={`group cursor-pointer animate-in slide-in-from-bottom-4 duration-700`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="200" y="150" text-anchor="middle" fill="%23374151" font-size="14">' + image.title + '</text></svg>';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                  
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white rounded-full p-3 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                      <Info className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-bold text-lg mb-1 drop-shadow-md">{image.title}</h4>
                    <div className="flex items-center justify-between text-sm opacity-90">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{image.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <span>{image.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${category.color} rounded-full opacity-80 transform scale-0 group-hover:scale-100 transition-all duration-300 delay-200`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-24 bg-gradient-to-r ${category.color} rounded-3xl p-12 text-center text-white relative overflow-hidden`}>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Ready to Explore?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Discover the beauty and adventure that {category.title.toLowerCase()} in Jharkhand has to offer
            </p>
            <button className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Plan Your Journey
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        </div>
      </div>

      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)}
          accentColor={category.accentColor}
        />
      )}
    </div>
  );
};

export default CategoryPage;