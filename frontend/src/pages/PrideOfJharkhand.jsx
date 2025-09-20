import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import medle from "../assets/medle.jpg"

// Sample data with placeholder images - replace these with your actual images
const prideData = [
  {
    name: 'Mahendra Singh Dhoni',
    description: 'Legendary Indian cricketer and former captain, born in Ranchi. Known as Captain Cool for his calm demeanor and exceptional leadership skills.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Sports',
  },
  {
    name: 'Deepika Kumari',
    description: 'World-class archer, once ranked No. 1 globally. Multiple-time Olympian and World Championship medalist.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Sports',
  },
  {
    name: 'Arjun Munda',
    description: 'Union Minister of Tribal Affairs, born in Jamshedpur. Former Chief Minister of Jharkhand and prominent tribal leader.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Politics',
  },
  {
    name: 'Madhumita Kumari',
    description: 'Asian Games silver medalist in compound archery. Rising star in Indian archery with multiple national records.',
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Sports',
  },
  {
    name: 'Purnima Mahato',
    description: 'National archery champion and Commonwealth Games silver medalist. One of the most consistent performers in Indian archery.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Sports',
  },
  {
    name: 'Birsa Munda',
    description: 'Revered tribal leader and freedom fighter who led the Ulgulan rebellion against British rule. Icon of tribal resistance.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'History',
  },
  {
        name: 'Jaipal Singh Munda',
    description: 'Olympic gold medalist in hockey (1928) and a prominent tribal leader. He played a key role in the formation of Jharkhand and was a strong advocate for tribal rights.',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'History',
  },
  {
    name: 'Lance Naik Albert Ekka',
    description: 'Param Vir Chakra awardee for bravery in the 1971 Indo-Pak war. His heroic sacrifice is commemorated at Albert Ekka Chowk in Ranchi.',
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'History',
  },
  {
    name: 'Ashunta Lakra',
    description: 'Indian women’s hockey player from Jharkhand. Known for her leadership and contribution to national and international tournaments.',
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Sports',
  },
  {
    name: 'Laxmi Padiya',
    description: 'Boxer from Jharkhand who has represented India in various national and international competitions. A rising star in Indian boxing.',
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Sports',
  },
  {
    name: 'Balbir Dutt',
    description: 'Veteran journalist and founder-editor of the Hindi daily Deshpran. Known for his fearless reporting and contribution to media in Jharkhand.',
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Arts & Media',
  }
];

const PrideOfJharkhand = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === prideData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? prideData.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5 seconds
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === prideData.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5 seconds
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5 seconds
  };

  return (
    <>
      <div className="text-center mb-8 mt-8">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-green-600 to-orange-600">
            Pride of Jharkhand
          </span>
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-green-600 mx-auto rounded-full"></div>
      </div>
      <div 
        className="min-h-screen py-0 px-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${medle})` }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Carousel Container */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-yellow-200">
            <div className="relative overflow-hidden rounded-2xl">
              {/* Carousel Track */}
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100/3)}%)`,
                }}
              >
                {/* Duplicate cards for seamless infinite scroll */}
                {[...prideData, ...prideData].map((person, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 group w-1/3 px-2"
                  >
                    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] h-full">
                      {/* Image Container */}
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:blur-sm group-hover:scale-110"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Hover Details Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                          <div className="text-center text-white p-4 max-w-xs">
                            <h3 className="text-xl font-bold mb-2 drop-shadow-lg">{person.name}</h3>
                            <p className="text-xs leading-relaxed drop-shadow-md line-clamp-4">{person.description}</p>
                            <div className="mt-3">
                              <span className="inline-block bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                {person.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-4 bg-gradient-to-r from-yellow-50 to-green-50">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{person.name}</h3>
                        <p className="text-gray-600 text-xs line-clamp-2">{person.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            {person.category}
                          </span>
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">★</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl z-10"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {prideData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-yellow-500 scale-125 shadow-lg'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`text-sm px-3 py-1 rounded-full transition-colors duration-300 ${
                  isAutoPlaying
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
            </div>
          </div>

          {/* Statistics */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-yellow-600">{prideData.length}</div>
              <div className="text-gray-600">Personalities</div>
            </div>
            <div className="text-center bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600">🏆</div>
              <div className="text-gray-600">Achievements</div>
            </div>
            <div className="text-center bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-600">✨</div>
              <div className="text-gray-600">Pride & Glory</div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default PrideOfJharkhand;