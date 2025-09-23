import React, { useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight, MapPin, Calendar, Camera, Users, Star, Clock } from 'lucide-react';
import destination3 from '../assets/destination3.jpg';
import destination1 from '../assets/destination1.jpg';
import destination2 from '../assets/destination2.jpg';
// import destination3 from '../assets/destination3.jpg';
import destination4 from '../assets/destination4.jpg';
import destination5 from '../assets/destination5.jpg';
import destination6 from '../assets/destination6.jpg';
import destination7 from '../assets/destination7.jpg';
import temple from '../assets/temple.png';
import wildlife from '../assets/wildlife.jpg';



const JharkhandGallery = () => {
  const [activeTab, setActiveTab] = useState('images');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Enhanced images data with more details
  const images = [
    {
      id: 1,
      src: destination1,
      title: 'Hundru Falls',
      location: 'Ranchi',
      description: 'A spectacular 98-meter high waterfall cascading down from the Subarnarekha River, creating a mesmerizing natural wonder.',
      bestTime: 'October to February',
      category: 'Waterfall',
      rating: 4.8,
      photographer: 'Nature Explorer'
    },
    {
      id: 2,
      src: destination2,
      title: 'Betla National Park',
      location: 'Latehar',
      description: 'Home to tigers, elephants, and diverse wildlife spread across 979 sq km of pristine forest landscape.',
      bestTime: 'November to May',
      category: 'Wildlife Sanctuary',
      rating: 4.6,
      photographer: 'Wildlife Photographer'
    },
    {
      id: 3,
      src: temple,
      title: 'Jagannath Temple',
      location: 'Ranchi',
      description: 'A magnificent temple complex inspired by the famous Puri Jagannath Temple, featuring traditional Kalinga architecture.',
      bestTime: 'Year Round',
      category: 'Religious Site',
      rating: 4.7,
      photographer: 'Heritage Lens'
    },
    {
      id: 4,
      src: destination4,
      title: 'Patratu Valley',
      location: 'Ramgarh',
      description: 'A breathtaking valley offering panoramic views of rolling hills, perfect for sunrise and sunset photography.',
      bestTime: 'October to March',
      category: 'Hill Station',
      rating: 4.9,
      photographer: 'Mountain Views'
    },
    {
      id: 5,
      src: destination5,
      title: 'Jonha Falls',
      location: 'Ranchi',
      description: 'Also known as Gautamdhara, this 43-meter waterfall is surrounded by dense forests and ancient caves.',
      bestTime: 'July to January',
      category: 'Waterfall',
      rating: 4.5,
      photographer: 'Adventure Seeker'
    },
    {
      id: 6,
      src: wildlife,
      title: 'Dalma Wildlife Sanctuary',
      location: 'Jamshedpur',
      description: 'A 195 sq km sanctuary known for its elephant population and rich biodiversity in the Eastern Ghats.',
      bestTime: 'November to June',
      category: 'Wildlife Sanctuary',
      rating: 4.4,
      photographer: 'Wildlife Explorer'
    }
  ];

  // Enhanced videos data with more details
  const videos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1598282361139-813c0b05374e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Hundru Falls Drone View',
      duration: '3:45',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Aerial cinematography showcasing the majestic Hundru Falls from breathtaking angles.',
      views: '125K',
      uploadedBy: 'Jharkhand Tourism',
      category: 'Nature Documentary'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1598282361139-813c0b05374e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Jharkhand\'s Tribal Culture',
      duration: '2:30',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Experience the rich traditions, dances, and festivals of Jharkhand\'s indigenous communities.',
      views: '89K',
      uploadedBy: 'Cultural Heritage',
      category: 'Cultural'
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1598282361139-813c0b05374e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Jamshedpur City Tour',
      duration: '5:20',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Explore India\'s first planned industrial city with its beautiful parks and modern infrastructure.',
      views: '203K',
      uploadedBy: 'City Explorer',
      category: 'Urban Tourism'
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1598282361139-813c0b05374e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Betla National Park Safari',
      duration: '4:15',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Join us on an exciting wildlife safari through one of India\'s premier tiger reserves.',
      views: '156K',
      uploadedBy: 'Wildlife Adventures',
      category: 'Wildlife Safari'
    }
  ];

  const openModal = (media, index) => {
    setSelectedMedia(media);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const navigateMedia = (direction) => {
    const currentData = activeTab === 'images' ? images : videos;
    let newIndex = currentIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % currentData.length;
    } else {
      newIndex = currentIndex === 0 ? currentData.length - 1 : currentIndex - 1;
    }
    
    setCurrentIndex(newIndex);
    setSelectedMedia(currentData[newIndex]);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Animated Background */}
       {/* Background Banner */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-80"
        style={{
          backgroundImage: `url(${destination3})`,
        }}
      />
      
      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" /> */}
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-white mb-6 drop-shadow-2xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Discover Jharkhand
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
            Experience the rich culture and natural beauty of the land of forests through our curated collection of images and videos
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-full p-2 border border-white/20 shadow-2xl">
            <button
              onClick={() => setActiveTab('images')}
              className={`px-10 py-4 rounded-full font-bold transition-all duration-500 transform ${
                activeTab === 'images'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl scale-105'
                  : 'text-white hover:bg-white/10 hover:scale-105'
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-10 py-4 rounded-full font-bold transition-all duration-500 transform ${
                activeTab === 'videos'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-2xl scale-105'
                  : 'text-white hover:bg-white/10 hover:scale-105'
              }`}
            >
              Videos
            </button>
          </div>
        </div>

        {/* Gallery Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {activeTab === 'images' && images.map((image, index) => (
            <div
              key={image.id}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              onClick={() => openModal(image, index)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-500">
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                      {image.category}
                    </span>
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs font-semibold">{image.rating}</span>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                      {image.title}
                    </h3>
                    <Camera className="w-5 h-5 text-blue-400" />
                  </div>
                  
                  <div className="flex items-center text-blue-200 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{image.location}</span>
                  </div>

                  {/* Hover details */}
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                      {image.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center text-green-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{image.bestTime}</span>
                      </div>
                      <div className="text-purple-400">
                        By {image.photographer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'videos' && videos.map((video, index) => (
            <div
              key={video.id}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              onClick={() => openModal(video, index)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-500">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Video overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-full p-6 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 shadow-lg">
                      <Play className="text-white w-8 h-8 ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3 text-white" />
                    <span className="text-white text-xs font-semibold">{video.duration}</span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg">
                      {video.category}
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors duration-300">
                      {video.title}
                    </h3>
                    <Play className="w-5 h-5 text-red-400" />
                  </div>
                  
                  <div className="flex items-center text-red-200 mb-3">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{video.views} views</span>
                  </div>

                  {/* Hover details */}
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                      {video.description}
                    </p>
                    
                    <div className="text-xs text-orange-400">
                      By {video.uploadedBy}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="relative max-w-6xl w-full">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 z-10 bg-red-500/20 backdrop-blur-md rounded-full p-3 text-white hover:bg-red-500/30 transition-all duration-300 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={() => navigateMedia('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={() => navigateMedia('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Media content */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              {activeTab === 'images' ? (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.title}
                  className="w-full max-h-96 object-contain"
                />
              ) : (
                <div className="aspect-video">
                  <iframe
                    src={selectedMedia.videoUrl}
                    title={selectedMedia.title}
                    className="w-full h-full rounded-t-2xl"
                    allowFullScreen
                  />
                </div>
              )}
              
              <div className="p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {selectedMedia.title}
                  </h3>
                  {selectedMedia.rating && (
                    <div className="flex items-center space-x-1 bg-yellow-500/20 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{selectedMedia.rating}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                  {selectedMedia.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {selectedMedia.location && (
                    <div className="flex items-center text-blue-300">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="font-semibold">{selectedMedia.location}</span>
                    </div>
                  )}
                  {selectedMedia.duration && (
                    <div className="flex items-center text-red-300">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-semibold">{selectedMedia.duration}</span>
                    </div>
                  )}
                  {selectedMedia.bestTime && (
                    <div className="flex items-center text-green-300">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span className="font-semibold">{selectedMedia.bestTime}</span>
                    </div>
                  )}
                  {selectedMedia.views && (
                    <div className="flex items-center text-purple-300">
                      <Users className="w-5 h-5 mr-2" />
                      <span className="font-semibold">{selectedMedia.views} views</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default JharkhandGallery;