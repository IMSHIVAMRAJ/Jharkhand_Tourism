import React, { useState, useEffect } from 'react';
import { Star, MapPin, Users, Calendar, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import LatestGalleryHighlights from '../pages/LatestGalleryHighlights';
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner5 from "../assets/banner5.jpg";
import heroVideo from "../assets/heroVideo.mp4";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import LatestUpdates from "../pages/LatestUpdates";
import { websiteData } from '../data/CategoryData';
import jharkhandHero from '../assets/jharkhand-hero.jpg';
import TrendingSection from "../pages/TrendingSection";
import PhotoVideoGallery from '../components/PhotoVideoGallery';
import PrideOfJharkhand from "../pages/PrideOfJharkhand";
import TouristTestimonials from "../pages/TouristTestimonials";

const CategoryCard = ({ category, index }) => (
  <Link
    to={`/category/${category.id}`} // Changed from /explore/ to /category/
    className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-700 hover:scale-105 hover:shadow-2xl group ${
      true ? 'animate-in slide-in-from-bottom-8' : 'opacity-0'
    }`}
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="h-56 relative overflow-hidden">
      <img
        src={category.image}
        alt={category.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="200" y="150" text-anchor="middle" fill="%23374151" font-size="16">' + category.title + '</text></svg>';
        }}
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
      <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg transform transition-transform group-hover:scale-110">
        {category.icon}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-gray-900 transition-colors">
        {category.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {category.description}
      </p>
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <span className="mr-2">Explore</span>
        <div className={`w-8 h-0.5 bg-gradient-to-r ${category.color} transform transition-all group-hover:w-12`}></div>
      </div>
    </div>
  </Link>
);

const ExploreSection = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-blend-multiply bg-gray-400 z-0"
        style={{ backgroundImage: `url(${jharkhandHero})` }}
      ></div>
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Explore Jharkhand
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {websiteData.categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const banners = [
  {
    type: 'image',
    title: 'TREK OF THE YEAR',
    subtitle: '2025',
    description: 'Adventure begins when the road ends and the trail calls.',
    cta: 'First Come,\nFirst Serve Basis',
    image: banner1,
    location: 'BANKATIYA BASE CAMP',
    locationDetails: 'PITHORAGARH 3,600 M. | 11,811 FT.',
    duration: 'September 2025\nTo\nMarch 2026'
  },
  {
    type: 'video',
    video: heroVideo,
    title: 'EXPLORE WILDLIFE',
    subtitle: 'Into the Wilderness',
    description: 'Witness the untouched beauty and diverse fauna.',
    cta: 'Plan Your Safari',
    location: 'BETLA NATIONAL PARK',
    locationDetails: 'PALAMAU, JHARKHAND'
  },
  {
    type: 'image',
    title: 'RIVER RAFTING',
    subtitle: 'Adventure Awaits',
    description: 'Conquer the rapids and experience an adrenaline rush.',
    cta: 'Book Your Raft',
    image: banner2,
    location: 'SUBARNAREKHA RIVER',
    locationDetails: 'RANCHI, JHARKHAND'
  },
  {
    type: 'image',
    title: 'CULTURAL JOURNEY',
    subtitle: 'Tradition & Festivities',
    description: 'Immerse yourself in the vibrant local culture.',
    cta: 'Attend a Festival',
    image: banner3,
    location: 'VARIOUS LOCATIONS',
    locationDetails: 'JHARKHAND, INDIA'
  },
  {
    type: 'image',
    title: 'WATERFALLS GALORE',
    subtitle: 'Nature\'s Cascades',
    description: 'Discover the majestic waterfalls of Jharkhand.',
    cta: 'Visit Hundru Falls',
    image: banner4,
    location: 'HUNDRU & JONHA FALLS',
    locationDetails: 'RANCHI, JHARKHAND'
  },
  {
    type: 'image',
    title: 'SERENE LAKES',
    subtitle: 'Tranquility & Beauty',
    description: 'Relax by the peaceful lakes and enjoy the views.',
    cta: 'Discover Your Calm',
    image: banner5,
    location: 'KANKI DAM',
    locationDetails: 'HAZARIBAGH, JHARKHAND'
  }
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [heroHeight, setHeroHeight] = useState('80vh');
  const initialVh = 80;
  const minVh = 40;

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newHeightVh = Math.max(minVh, initialVh - scrollY / 5);
      setHeroHeight(`${newHeightVh}vh`);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const activeBanner = banners[activeIndex];

  return (
    <div className="relative w-full overflow-hidden transition-all duration-300 ease-out" style={{ height: heroHeight }}>
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {banner.type === 'video' ? (
            <video
              src={banner.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-8 md:p-16">
        {activeBanner.title === 'TREK OF THE YEAR' && activeBanner.duration && (
          <div className="absolute top-8 right-8 md:top-16 md:right-16 transform-gpu rotate-0 md:rotate-6">
            <div className="relative w-28 h-28 bg-transparent">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-red-600 rounded-t-lg"></div>
              <div className="absolute top-2.5 w-full h-full bg-white text-black rounded-lg shadow-lg flex flex-col items-center justify-center p-2">
                <span className="text-sm font-semibold text-red-600 rotate-[270deg] origin-center -translate-x-3 mt-2">Duration:</span>
                <pre className="text-xs text-center leading-tight mt-2">{activeBanner.duration}</pre>
              </div>
            </div>
          </div>
        )}

        <div className="w-full h-full flex flex-col justify-end items-center text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="flex flex-col justify-end items-start text-left p-4 md:p-0">
              <p className="text-lg md:text-2xl font-semibold mb-2 drop-shadow-md border-b-2 border-yellow-400">
                {activeBanner.description}
              </p>
              {activeBanner.cta && (
                <div className="flex items-center text-yellow-400 mt-4">
                  <Star className="w-4 h-4 fill-current mr-2" />
                  <pre className="text-sm font-bold">{activeBanner.cta}</pre>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-end items-center text-center">
              <h1 className="text-5xl md:text-8xl font-extrabold mb-2 drop-shadow-lg text-white">
                {activeBanner.title}
              </h1>
              <div className="w-2/3 md:w-1/2 h-2 bg-yellow-400"></div>
              <h2 className="text-4xl md:text-6xl font-extrabold mt-2 mb-8 drop-shadow-lg text-white">
                {activeBanner.subtitle}
              </h2>
              {activeBanner.location && (
                <div className="text-white text-lg font-bold">
                  <p>{activeBanner.location}</p>
                  <p className="text-sm font-normal">{activeBanner.locationDetails}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-end items-end text-right p-4 md:p-0">
              {activeBanner.title === 'TREK OF THE YEAR' && (
                <>
                  <p className="text-sm md:text-base mb-2 drop-shadow">
                    Contact your nearest adventure tour operator for booking
                  </p>
                  <p className="text-xs italic drop-shadow">*T&C Apply</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors z-10"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors z-10"
        aria-label="Next Slide"
      >
        <ChevronRight size={32} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};


// const SocialMedia = () => (
//   <section className="py-16">
//     <div className="container mx-auto px-4">
//       <h2 className="text-3xl font-bold text-center mb-12">Follow Us</h2>
//       <div className="flex justify-center space-x-6">
//         <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
//           <span className="text-lg font-semibold">f</span>
//         </a>
//         <a href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors">
//           <span className="text-lg font-semibold">t</span>
//         </a>
//         <a href="#" className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors">
//           <span className="text-lg font-semibold">i</span>
//         </a>
//         <a href="#" className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors">
//           <span className="text-lg font-semibold">y</span>
//         </a>
//       </div>
//     </div>
//   </section>
// );
import SocialMedia from '../pages/FollowUs';


const Home = () => {
  return (
    <div>
      <HeroSection />
      <LatestUpdates />
      <LatestGalleryHighlights />
      <ExploreSection />
      <TrendingSection />
      <PhotoVideoGallery />
      <PrideOfJharkhand />
      <TouristTestimonials />
      <SocialMedia/>
    </div>
  );
};

export default Home;