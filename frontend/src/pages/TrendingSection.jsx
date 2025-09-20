import React, { useState } from 'react';
import { TreePine, Compass, Leaf, Users, MapPin } from 'lucide-react';
import banner1 from "../assets/banner1.jpg"; // Placeholder image
import destination7 from "../assets/destination7.jpg"
import destination2 from "../assets/destination2.jpg"
import wildlifebanner from "../assets/wildlife-banner.jpg"
import Adventure from "../assets/Adventure.jpg"

const TrendingSection = () => {
  // Mock data structure that would come from your backend
  const [trendingData, setTrendingData] = useState({
    categories: [
      { id: 'wildlife', name: 'Wildlife', icon: TreePine, active: false },
      { id: 'adventure', name: 'Adventure', icon: Compass, active: false },
      { id: 'wellness', name: 'Wellness', icon: Leaf, active: false },
      { id: 'spirituality', name: 'Spirituality', icon: Users, active: false },
      { id: 'leisure', name: 'Leisure', icon: MapPin, active: true }
    ],
    activeContent: {
      title: 'Leisure',
      description: 'Untouched nature in all its splendour is what Uttarakhand offers visitors. The state has been blessed with gorgeous natural beauty. The fact that almost 45.43 per cent of its geographical area has a dense forest cover, makes it all the more remarkable. The state is host to the mighty Himalayas, which guarantee a rich growth of flora and fauna, a pleasant climate and a peaceful and serene environment. The many glaciers here are sources of some of the major rivers of India, including the Ganga and the Yamuna. Snow-covered mountain peaks, like Nanda Devi, Badrinath, and Kamet, offer stunning views, while oak, rhododendron, deodar, and pine forests leave one in awe.',
      image: destination7
    }
  });

  const handleCategoryClick = (categoryId) => {
    // Update active category
    const updatedCategories = trendingData.categories.map(cat => ({
      ...cat,
      active: cat.id === categoryId
    }));

    // Mock content for different categories (in real app, this would come from backend)
    const contentMap = {
      wildlife: {
        title: 'Wildlife',
        description: 'Discover the incredible wildlife sanctuaries and national parks of Uttarakhand. From the majestic Royal Bengal Tigers in Jim Corbett National Park to the diverse bird species in Rajaji National Park, experience nature at its finest. The state is home to over 600 bird species and numerous mammals including elephants, leopards, and the elusive snow leopard in higher altitudes.',
        image: wildlifebanner
      },
      adventure: {
        title: 'Adventure',
        description: 'Uttarakhand is an adventurer\'s paradise offering thrilling activities like white water rafting in Rishikesh, trekking to Valley of Flowers, rock climbing in Dehradun, and skiing in Auli. The challenging mountain terrain provides perfect conditions for mountaineering, paragliding, and bungee jumping, making it a hotspot for adrenaline seekers.',
        image: Adventure
      },
      wellness: {
        title: 'Wellness',
        description: 'Find your inner peace in the spiritual capital of India. Uttarakhand offers numerous wellness retreats, yoga ashrams, and meditation centers. The pristine mountain air, natural hot springs in places like Yamunotri, and ancient Ayurvedic treatments provide the perfect environment for rejuvenation and healing.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      spirituality: {
        title: 'Spirituality',
        description: 'Embark on a spiritual journey through the sacred Char Dham Yatra visiting Yamunotri, Gangotri, Kedarnath, and Badrinath. Uttarakhand is dotted with ancient temples, meditation caves, and holy ghats along the Ganges. Experience the divine energy in Rishikesh and Haridwar, where spirituality meets natural beauty.',
        image: 'https://images.unsplash.com/photo-1518098268045-3164a2f8d37f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      leisure: {
        title: 'Leisure',
        description: 'Untouched nature in all its splendour is what Uttarakhand offers visitors. The state has been blessed with gorgeous natural beauty. The fact that almost 45.43 per cent of its geographical area has a dense forest cover, makes it all the more remarkable. The state is host to the mighty Himalayas, which guarantee a rich growth of flora and fauna, a pleasant climate and a peaceful and serene environment. The many glaciers here are sources of some of the major rivers of India, including the Ganga and the Yamuna. Snow-covered mountain peaks, like Nanda Devi, Badrinath, and Kamet, offer stunning views, while oak, rhododendron, deodar, and pine forests leave one in awe.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    };

    setTrendingData({
      categories: updatedCategories,
      activeContent: contentMap[categoryId]
    });
  };

  const jaggedBorderSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 100' preserveAspectRatio='none'%3E%3Cpath fill='%23fff' d='M0 100V0l1000 0v100H0z'/%3E%3C/svg%3E")`;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900">
      
      {/* Top Jagged Border */}
      <div
        className="absolute top-0 w-full h-16 z-20"
        style={{
          backgroundImage: jaggedBorderSvg,
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          transform: 'translateY(-50%)' // Move it up to sit on the edge
        }}
      ></div>

      {/* Background pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-blend-multiply bg-gray-400 z-0"
        style={{ backgroundImage: `url(${banner1})` }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="h-1 w-16 bg-green-400 mr-4"></div>
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              What's Trending
            </h1>
            <div className="h-1 w-16 bg-green-400 ml-4"></div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-1">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
            <div className="flex flex-wrap justify-center gap-8">
              {trendingData.categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      category.active
                        ? 'bg-green-100 text-green-700 shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent
                      size={32}
                      className={`mb-2 ${category.active ? 'text-green-600' : 'text-gray-500'}`}
                    />
                    <span className="text-sm font-semibold">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-95">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 md:h-full min-h-96">
                <img
                  src={trendingData.activeContent.image}
                  alt={trendingData.activeContent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
                
                {/* Decorative elements on image */}
                <div className="absolute top-4 left-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
                  <MapPin className="text-white" size={24} />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  {trendingData.activeContent.title}
                </h2>
                
                <p className="text-gray-600 leading-relaxed text-lg mb-8 line-clamp-6">
                  {trendingData.activeContent.description}
                </p>
                
                <div className="flex items-center">
                  {/* <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    Read more
                  </button> */}
                  
                  {/* Decorative arrow */}
                  <div className="ml-4 text-green-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Jagged Border */}
      <div
        className="absolute bottom-0 w-full h-16 z-20"
        style={{
          backgroundImage: jaggedBorderSvg,
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'top',
          transform: 'translateY(50%) rotate(180deg)' // Move it down and flip it
        }}
      ></div>
    </div>
  );
};

export default TrendingSection;