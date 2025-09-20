import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  MapPin, 
  Star, 
  Calendar,
  Users,
  X,
  SlidersHorizontal
} from 'lucide-react';
// import { homestayData } from '../data/homestayData';

// data/destinationsData.js
import destination1 from "../assets/destination1.jpg";
import destination2 from "../assets/destination2.jpg";
import destination3 from "../assets/destination3.jpg";
import destination4 from "../assets/destination4.jpg";
import destination5 from "../assets/destination5.jpg";
import destination6 from "../assets/destination6.jpg";
import destination7 from "../assets/destination7.jpg";
import destination8 from "../assets/destination8.jpg";
import spirituality from "../assets/spirituality.jpg";
import steel from "../assets/steel.jpg";
import jharkhandHero from '../assets/jharkhand-hero.jpg';
import gallery1 from '../assets/gallery-2.jpg';
import gallery2 from '../assets/gallery-2.jpg';
import gallerybg from '../assets/gallery-bg.jpg';
import wellness from '../assets/wellness.jpg';
import wildlifeBanner from '../assets/wildlife-banner.jpg';
import birds from '../assets/birds.jpg';


export const destinationsData = {
  'ranchi': {
    id: 'ranchi',
    name: 'Ranchi',
    heroImage: destination7,
    thumbnailImage: destination7,
    backgroundImage: destination7,
    description: 'The capital city of Jharkhand, Ranchi is known as the "City of Waterfalls" and offers a perfect blend of natural beauty and urban amenities. Surrounded by hills, rocks, and waterfalls, Ranchi serves as a gateway to explore the tribal culture and natural wonders of Jharkhand.',
    address: {
      location: 'Ranchi District, Jharkhand, India',
      nearbyAirport: 'Birsa Munda Airport, Ranchi (5 km from city center)'
    },
    gallery: [
      destination3,
      destination4,
      destination5,
      birds,
      wellness,
      gallerybg
    ],
    placesToVisit: [
      'Hundru Falls',
      'Dassam Falls',
      'Jonha Falls',
      'Rock Garden',
      'Tagore Hill',
      'Pahari Mandir',
      'Kanke Dam',
      'Birsa Zoological Park'
    ],
    events: [
      {
        name: 'Sarhul Festival',
        description: 'Traditional tribal festival celebrating nature and harvest',
        month: 'March-April'
      },
      {
        name: 'Karma Festival',
        description: 'Harvest festival celebrated by tribal communities',
        month: 'August-September'
      },
      {
        name: 'Ranchi Festival',
        description: 'Annual cultural festival showcasing local arts and crafts',
        month: 'December'
      }
    ],
    popularFood: [
      'Litti Chokha',
      'Dhuska',
      'Pittha',
      'Thekua',
      'Arsa Roti',
      'Rugra',
      'Bamboo Shoot Curry',
      'Handia (Rice Beer)'
    ],
    howToReach: {
      byAir: 'Birsa Munda Airport connects Ranchi to major cities like Delhi, Mumbai, Kolkata, and Bangalore.',
      byTrain: 'Ranchi Railway Station is well connected to major cities across India.',
      byRoad: 'National Highway 33 connects Ranchi to other major cities. State and private buses are available.'
    },
    rating: 4.2,
    totalReviews: 1250
  },

  'jamshedpur': {
    id: 'jamshedpur',
    name: 'Jamshedpur',
    heroImage: destination8,
    thumbnailImage: destination8,
    backgroundImage:destination8,
    description: 'Known as the "Steel City of India", Jamshedpur is a planned industrial city founded by Jamsetji Tata. It offers a unique combination of industrial heritage, well-planned infrastructure, and natural attractions with beautiful lakes and parks.',
    address: {
      location: 'East Singhbhum District, Jharkhand, India',
      nearbyAirport: 'Sonari Airport, Jamshedpur (12 km from city center)'
    },
    gallery: [
      '/assets/jamshedpur-1.jpg',
      '/assets/jamshedpur-2.jpg',
      '/assets/jamshedpur-3.jpg',
      '/assets/jamshedpur-4.jpg',
      '/assets/jamshedpur-5.jpg'
    ],
    placesToVisit: [
      'Jubilee Park',
      'Tata Steel Zoological Park',
      'Dimna Lake',
      'Dalma Wildlife Sanctuary',
      'Bhuvaneshwari Temple',
      'Russi Modi Centre of Excellence',
      'Keenan Stadium',
      'XLRI Campus'
    ],
    events: [
      {
        name: 'Tata Steel Kolkata Literary Meet',
        description: 'Annual literary festival featuring renowned authors',
        month: 'January'
      },
      {
        name: 'Founder\'s Day',
        description: 'Celebration of Jamsetji Tata\'s birthday',
        month: 'March'
      },
      {
        name: 'Steel City Marathon',
        description: 'Annual marathon event',
        month: 'February'
      }
    ],
    popularFood: [
      'Dhokla',
      'Litti Chokha',
      'Fish Curry',
      'Mutton Curry',
      'Bengali Sweets',
      'Paratha',
      'Biryani',
      'Street Food at Sakchi Market'
    ],
    howToReach: {
      byAir: 'Sonari Airport has limited connectivity. Nearest major airport is in Ranchi (130 km).',
      byTrain: 'Tatanagar Railway Station is a major junction connecting to all parts of India.',
      byRoad: 'Well connected by National Highway 33. Regular bus services available.'
    },
    rating: 4.0,
    totalReviews: 890
  },

  'deoghar': {
    id: 'deoghar',
    name: 'Deoghar',
    heroImage: spirituality,
    thumbnailImage: spirituality,
    backgroundImage: spirituality,
    description: 'Known as the "Abode of Gods", Deoghar is one of the most sacred pilgrimage sites in India, famous for the Baba Baidyanath Temple, one of the twelve Jyotirlingas. The town attracts millions of devotees, especially during the holy month of Shravan.',
    address: {
      location: 'Deoghar District, Jharkhand, India',
      nearbyAirport: 'Deoghar Airport (8 km from city center)'
    },
    gallery: [
      '/assets/deoghar-1.jpg',
      '/assets/deoghar-2.jpg',
      '/assets/deoghar-3.jpg',
      '/assets/deoghar-4.jpg',
      '/assets/deoghar-5.jpg'
    ],
    placesToVisit: [
      'Baba Baidyanath Temple',
      'Nandan Pahar',
      'Tapovan Hills',
      'Trikuta Parvat',
      'Basukinath Temple',
      'Naulakha Temple',
      'Rikhikesh',
      'Mayurbhanj Palace'
    ],
    events: [
      {
        name: 'Shravan Mela',
        description: 'Major pilgrimage event during the month of Shravan',
        month: 'July-August'
      },
      {
        name: 'Shivratri Festival',
        description: 'Grand celebration at Baidyanath Temple',
        month: 'February-March'
      },
      {
        name: 'Kartik Purnima',
        description: 'Special prayers and celebrations',
        month: 'November'
      }
    ],
    popularFood: [
      'Kheer Bhog',
      'Prasadam',
      'Puri Sabji',
      'Laddoo',
      'Samosa',
      'Jalebi',
      'Lassi',
      'Traditional Thali'
    ],
    howToReach: {
      byAir: 'Deoghar Airport has flights from major cities. Direct flights from Delhi and Kolkata.',
      byTrain: 'Jasidih Junction (7 km) and Deoghar Railway Station connect to major cities.',
      byRoad: 'Well connected by state highways. Regular bus services from Ranchi, Dhanbad, and other cities.'
    },
    rating: 4.5,
    totalReviews: 2100
  },

  'hazaribagh': {
    id: 'hazaribagh',
    name: 'Hazaribagh',
    heroImage: destination1,
    thumbnailImage: destination1,
    backgroundImage: destination1,
    description: 'Known for its scenic beauty and wildlife, Hazaribagh offers beautiful lakes, dense forests, and the famous Hazaribagh National Park. The name literally means "Land of a Thousand Gardens", reflecting its natural beauty and pleasant climate.',
    address: {
      location: 'Hazaribagh District, Jharkhand, India',
      nearbyAirport: 'Ranchi Airport (90 km from city center)'
    },
    gallery: [
      '/assets/hazaribagh-1.jpg',
      '/assets/hazaribagh-2.jpg',
      '/assets/hazaribagh-3.jpg',
      '/assets/hazaribagh-4.jpg',
      '/assets/hazaribagh-5.jpg'
    ],
    placesToVisit: [
      'Hazaribagh National Park',
      'Canary Hill',
      'Hazaribagh Lake',
      'Konar Dam',
      'Rajrappa Temple',
      'Tilaiya Dam',
      'Surajkund',
      'Charwa Dam'
    ],
    events: [
      {
        name: 'Wildlife Week',
        description: 'Celebration of wildlife conservation',
        month: 'October'
      },
      {
        name: 'Kali Puja',
        description: 'Festival celebrated at Rajrappa Temple',
        month: 'October-November'
      },
      {
        name: 'Sarhul Festival',
        description: 'Tribal festival celebrating nature',
        month: 'March-April'
      }
    ],
    popularFood: [
      'Fish Curry',
      'Mutton Curry',
      'Litti Chokha',
      'Daal Bhaat',
      'Aloo Dum',
      'Local Fish Preparations',
      'Traditional Tribal Cuisine',
      'Fresh Lake Fish'
    ],
    howToReach: {
      byAir: 'Nearest airport is in Ranchi (90 km). Taxi and bus services available.',
      byTrain: 'Hazaribagh Road Railway Station (65 km) is the nearest railhead.',
      byRoad: 'Well connected by National Highway 100. Regular bus services from Ranchi and other cities.'
    },
    rating: 4.1,
    totalReviews: 650
  },

  'netarhat': {
    id: 'netarhat',
    name: 'Netarhat',
    heroImage: destination2,
    thumbnailImage: destination2,
    backgroundImage: destination2,
    description: 'Known as the "Queen of Chotanagpur", Netarhat is a beautiful hill station offering spectacular sunrises and sunsets. Located at an altitude of 1070 meters, it provides a cool climate and panoramic views of the surrounding valleys and forests.',
    address: {
      location: 'Latehar District, Jharkhand, India',
      nearbyAirport: 'Ranchi Airport (156 km from hill station)'
    },
    gallery: [
      '/assets/netarhat-1.jpg',
      '/assets/netarhat-2.jpg',
      '/assets/netarhat-3.jpg',
      '/assets/netarhat-4.jpg',
      '/assets/netarhat-5.jpg'
    ],
    placesToVisit: [
      'Sunrise Point',
      'Sunset Point',
      'Lower Ghaghri Falls',
      'Upper Ghaghri Falls',
      'Netarhat Dam',
      'Magnolia Point',
      'Koel View Point',
      'Pine Forest'
    ],
    events: [
      {
        name: 'Hill Station Festival',
        description: 'Annual celebration of hill station culture',
        month: 'December'
      },
      {
        name: 'Photography Festival',
        description: 'Event for nature photography enthusiasts',
        month: 'November'
      },
      {
        name: 'Tribal Folk Festival',
        description: 'Showcase of local tribal culture and arts',
        month: 'January'
      }
    ],
    popularFood: [
      'Pahadi Aloo',
      'Local Honey',
      'Forest Mushrooms',
      'Traditional Tribal Food',
      'Hill Station Tea',
      'Roasted Corn',
      'Local Fruits',
      'Bamboo Shoot Dishes'
    ],
    howToReach: {
      byAir: 'Nearest airport is Ranchi (156 km). Taxi services available for scenic drive.',
      byTrain: 'Latehar Railway Station (24 km) is the nearest railhead.',
      byRoad: 'Connected via state highways. Best reached by private vehicle or taxi from Ranchi.'
    },
    rating: 4.6,
    totalReviews: 420
  },

  'bokaro': {
    id: 'bokaro',
    name: 'Bokaro',
    heroImage: steel,
    thumbnailImage: steel,
    backgroundImage: steel,
    description: 'Known as "Steel City", Bokaro is famous for Bokaro Steel Plant, one of the largest steel plants in India. The planned city offers modern amenities, beautiful parks, and is a perfect example of industrial development with environmental consciousness.',
    address: {
      location: 'Bokaro District, Jharkhand, India',
      nearbyAirport: 'Ranchi Airport (110 km from city center)'
    },
    gallery: [
      '/assets/bokaro-1.jpg',
      '/assets/bokaro-2.jpg',
      '/assets/bokaro-3.jpg',
      '/assets/bokaro-4.jpg',
      '/assets/bokaro-5.jpg'
    ],
    placesToVisit: [
      'City Park',
      'Bokaro Steel Plant',
      'Garga Dam',
      'Parasnath Hill',
      'Jawaharlal Nehru Biological Park',
      'SAIL Museum',
      'Bokaro Mall',
      'Ram Mandir'
    ],
    events: [
      {
        name: 'Steel Plant Day',
        description: 'Celebration of industrial heritage',
        month: 'February'
      },
      {
        name: 'Cultural Festival',
        description: 'Multi-cultural event showcasing various traditions',
        month: 'November'
      },
      {
        name: 'Industrial Expo',
        description: 'Exhibition of industrial achievements',
        month: 'January'
      }
    ],
    popularFood: [
      'Bengali Fish Curry',
      'Biryani',
      'Litti Chokha',
      'South Indian Dishes',
      'Street Food',
      'Sweets from Bengal',
      'Multi-cuisine Restaurant Food',
      'Industrial Canteen Special Meals'
    ],
    howToReach: {
      byAir: 'Nearest airport is Ranchi (110 km). Regular taxi and bus services available.',
      byTrain: 'Bokaro Steel City Railway Station is well connected to major cities.',
      byRoad: 'National Highway 114 connects Bokaro. Good road connectivity with regular bus services.'
    },
    rating: 3.9,
    totalReviews: 750
  }
};

const getDestinationsList = () => {
  return Object.values(destinationsData).map(dest => ({
    id: dest.id,
    name: dest.name
  }));
};

const Homestay = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [checkIn, setCheckIn] = useState('21/09/2025');
  const [checkOut, setCheckOut] = useState('22/09/2025');
  const [guests, setGuests] = useState('2 Adult, 1 Room');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    discounts: false,
    priceRange: 'all',
    locality: '',
    sortBy: 'price-low'
  });

  const homestays = Object.values(destinationsData);

  // Apply filters
  const filteredHomestays = useMemo(() => {
    let filtered = [...homestays];

    // Filter by discounts
    if (filters.discounts) {
      filtered = filtered.filter(homestay => homestay.discount);
    }

    // Filter by locality
    if (filters.locality) {
      filtered = filtered.filter(homestay => 
        homestay.shortLocation.toLowerCase().includes(filters.locality.toLowerCase())
      );
    }

    // Filter by search location
    if (searchLocation) {
      filtered = filtered.filter(homestay =>
        homestay.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
        homestay.name.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [homestays, filters, searchLocation]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: key === 'discounts' ? false : '' }));
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.discounts) count++;
    if (filters.locality) count++;
    if (filters.priceRange !== 'all') count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=400&fit=crop)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Homestay</h1>
            <p className="text-xl">Experience authentic local hospitality in beautiful locations</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-lg -mt-20 relative z-10 mx-4 md:mx-8 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Where To Stay"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors">
            <Search className="w-5 h-5" />
            <span>Modify Search</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:col-span-1`}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-cyan-600">Applied Filters</h2>
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full text-sm">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </div>

              {/* Active Filters */}
              <div className="mb-6">
                {filters.discounts && (
                  <div className="inline-flex items-center bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                    <span>Discounts</span>
                    <X 
                      className="w-4 h-4 ml-2 cursor-pointer" 
                      onClick={() => clearFilter('discounts')}
                    />
                  </div>
                )}
                {filters.locality && (
                  <div className="inline-flex items-center bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                    <span>{filters.locality}</span>
                    <X 
                      className="w-4 h-4 ml-2 cursor-pointer" 
                      onClick={() => clearFilter('locality')}
                    />
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-4">Select Filters</h3>

              {/* Sorts */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Sorts</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="discounts"
                      checked={filters.discounts}
                      onChange={(e) => handleFilterChange('discounts', e.target.checked)}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">Discounts</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="price-low"
                      checked={filters.sortBy === 'price-low'}
                      onChange={() => handleFilterChange('sortBy', 'price-low')}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">Price (Low - High)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="price-high"
                      checked={filters.sortBy === 'price-high'}
                      onChange={() => handleFilterChange('sortBy', 'price-high')}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">Price (High - Low)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sort"
                      value="rating"
                      checked={filters.sortBy === 'rating'}
                      onChange={() => handleFilterChange('sortBy', 'rating')}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">Wellness Member</span>
                  </label>
                </div>
              </div>

              {/* Locality */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Locality</h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={filters.locality}
                    onChange={(e) => handleFilterChange('locality', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Search Results ({filteredHomestays.length})
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  {getActiveFiltersCount() > 0 && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Homestay Listings */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {filteredHomestays.map((homestay) => (
                <div key={homestay.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
                    <div className={`relative ${viewMode === 'list' ? 'w-80 flex-shrink-0' : 'h-48'}`}>
                      <img
                        src={homestay.thumbnailImage}
                        alt={homestay.name}
                        className="w-full h-full object-cover"
                      />
                      {homestay.discount && (
                        <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                          {homestay.discount}
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-lg flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold">{homestay.rating}</span>
                      </div>
                    </div>
                    <div className={`p-6 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{homestay.name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{homestay.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-blue-600 text-sm">Amenities</span>
                          {homestay.amenities && homestay.amenities.map((amenity, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {amenity}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{homestay.description}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500 line-through">₹{homestay.originalPrice}/-</span>
                            <span className="text-2xl font-bold text-gray-800">₹{homestay.discountedPrice}/-</span>
                          </div>
                          <p className="text-xs text-gray-500">+₹0 Taxes & Fees</p>
                          <p className="text-xs text-gray-500">(Price for 1 Night)</p>
                          <p className="text-xs text-gray-500">Refund as per policy</p>
                        </div>
                        <Link
                          to={`/homestay/${homestay.id}`}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredHomestays.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No homestays found</h3>
                <p className="text-gray-500">Try adjusting your filters or search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homestay;