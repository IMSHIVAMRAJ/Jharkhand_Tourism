import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import galleryBg from '../assets/gallery-bg.jpg'; 
import galleryImg1 from '../assets/destination2.jpg'; 
import galleryImg2 from '../assets/gallery-2.jpg'; 
import galleryImg3 from '../assets/destination7.jpg'; 
import galleryImg4 from '../assets/destination5.jpg'; 
import galleryImg5 from '../assets/destination3.jpg'; 

// Data for the carousel items
const galleryItems = [
  { id: 1, tag: 'Wildlife', title: 'Betla National Park', image: galleryImg1 },
  { id: 2, tag: 'Adventure', title: 'Hundru Falls', image: galleryImg2 },
  { id: 3, tag: 'Nature', title: 'Netarhat Sunrise', image: galleryImg3 },
  { id: 4, tag: 'Events', title: 'Jonha Falls', image: galleryImg4 },
  { id: 5, tag: 'Nature', title: 'Dassam Falls', image: galleryImg5 },
];

const LatestGalleryHighlights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showScroll, setShowScroll] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section
      className="relative py-16 text-white overflow-hidden"
      style={{
        backgroundImage: `url(${galleryBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center mx-10">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 relative">
          Latest Gallery Highlights
          <div className="absolute w-20 h-1 bg-green-500 rounded-full left-1/2 transform -translate-x-1/2 bottom-[-1rem]"></div>
        </h2>
        <p className="text-xl mb-12">Discover our most recent stunning visuals.</p>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {galleryItems.map((item) => (
              <div key={item.id} className="w-full md:w-1/3 flex-shrink-0 p-2">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {item.tag}
                    </div>
                  </div>
                  <div className="p-4 text-center text-gray-800">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute top-1/2 left-0 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute top-1/2 right-0 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-gray-400'
              }`}
            ></button>
          ))}
        </div>

        {/* View All Button */}
        <a
          href="/gallery"
          className="inline-block mt-12 bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-colors"
        >
          VIEW ALL
        </a>
      </div>

      {/* Back to Top Button */}
      {showScroll && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 bg-white text-green-600 p-4 rounded-full shadow-lg transition-opacity duration-300 opacity-100 hover:scale-110"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </section>
  );
};

export default LatestGalleryHighlights;
