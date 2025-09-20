import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Calendar, 
  Clock,
  Wifi,
  Car,
  Coffee,
  Shield,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle,
  Users,
  ChevronDown
} from 'lucide-react';

// Import the destinations data from Homestay.jsx
import { destinationsData } from '../components/Homestay';

// Create homestay data based on destinations data
const createHomestayFromDestination = (destination) => {
  return {
    id: destination.id,
    name: `${destination.name} Heritage Homestay`,
    location: destination.address.location,
    shortLocation: destination.name,
    rating: destination.rating,
    amenities: ["+8"],
    originalPrice: Math.floor(destination.rating * 800) + 500,
    discountedPrice: Math.floor((destination.rating * 800 + 500) * 0.8),
    discount: "20% Off",
    images: destination.gallery || [destination.heroImage, destination.thumbnailImage],
    thumbnailImage: destination.thumbnailImage,
    description: destination.description,
    rooms: [
      {
        id: 1,
        type: "Deluxe Room",
        capacity: "2 x Adult | 1 x Room",
        price: Math.floor((destination.rating * 800 + 500) * 0.8),
        originalPrice: Math.floor(destination.rating * 800) + 500,
        amenities: ["AC", "WiFi", "TV", "Bathroom"],
        description: `Comfortable room with modern amenities and beautiful views of ${destination.name}`
      },
      {
        id: 2,
        type: "Super Deluxe Room",
        capacity: "2 x Adult | 1 x Room",
        price: Math.floor((destination.rating * 800 + 800) * 0.8),
        originalPrice: Math.floor(destination.rating * 800) + 800,
        amenities: ["AC", "WiFi", "TV", "Bathroom", "Balcony"],
        description: `Spacious room with premium amenities and panoramic views of ${destination.name}`
      }
    ],
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    policies: [
      "Food is allowed at an extra cost",
      "Child under the age of 12 stays free if sharing the bed with parents",
      "Extra mattress fee applies if required",
      "Cancellation allowed 48 hours before check-in"
    ],
    facilities: ["Free WiFi", "Parking", "24/7 Security", "Restaurant", "Garden", "Local Guide"],
    nearbyAttractions: destination.placesToVisit?.slice(0, 4) || [`${destination.name} City Center`, "Local Markets", "Cultural Sites"]
  };
};

const getHomestayById = (id) => {
  const destination = destinationsData[id];
  if (!destination) return null;
  return createHomestayFromDestination(destination);
};

const HomestayDetail = () => {
  const { homestayId } = useParams();
  const homestay = getHomestayById(homestayId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(homestay?.rooms[0] || null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showMoreRooms, setShowMoreRooms] = useState(false);

  if (!homestay) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Homestay not found</h2>
          <Link to="/homestay" className="text-green-600 hover:text-green-700">
            ← Back to homestays
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === homestay.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? homestay.images.length - 1 : prev - 1
    );
  };

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const handleEnquiry = () => {
    // Handle enquiry logic
    alert('Enquiry feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/homestay"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homestays
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <img
                  src={homestay.images[currentImageIndex]}
                  alt={homestay.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg">
                  {currentImageIndex + 1} / {homestay.images.length}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                {homestay.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-green-500' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                {homestay.images.length > 4 && (
                  <button className="flex-shrink-0 w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors">
                    <span className="text-sm font-medium">View All</span>
                  </button>
                )}
              </div>
            </div>

            {/* Homestay Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{homestay.name}</h1>
                  <p className="text-sm text-gray-600">{homestay.rooms.length} Room Types | Multiple Amenities</p>
                </div>
                <div className="flex items-center bg-green-100 px-3 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold text-green-800">{homestay.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{homestay.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Check In
                  </h3>
                  <p className="text-gray-600">{homestay.checkIn}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Check out
                  </h3>
                  <p className="text-gray-600">{homestay.checkOut}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{homestay.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Policies</h3>
                <div className="space-y-2">
                  {homestay.policies.map((policy, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{policy}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Facilities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {homestay.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Nearby Attractions</h3>
                <div className="flex flex-wrap gap-2">
                  {homestay.nearbyAttractions.map((attraction, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {attraction}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="mb-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{selectedRoom?.type || homestay.rooms[0]?.type}</h3>
                <p className="text-gray-600 text-sm mb-4">{selectedRoom?.capacity || homestay.rooms[0]?.capacity}</p>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-gray-500 line-through text-lg">₹{selectedRoom?.originalPrice || homestay.originalPrice}/-</span>
                  <span className="text-2xl font-bold text-gray-800">₹{selectedRoom?.price || homestay.discountedPrice}/-</span>
                </div>
                <p className="text-xs text-gray-500 mb-1">+₹0 Taxes & Fees</p>
                <p className="text-xs text-gray-500 mb-1">(Price for 1 Night)</p>
                <p className="text-xs text-gray-500 mb-4">Refund as per policy</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Check In</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">21/09/2025</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Check Out</span>
                      <br />
                      <span className="text-gray-500">22/09/2025</span>
                    </div>
                  </div>
                </div>

                {homestay.rooms.length > 1 && (
                  <div className="mb-4">
                    <button
                      onClick={() => setShowMoreRooms(!showMoreRooms)}
                      className="flex items-center justify-between w-full text-left text-blue-600 hover:text-blue-700"
                    >
                      <span>More Room Options</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${showMoreRooms ? 'rotate-180' : ''}`} />
                    </button>
                    {showMoreRooms && (
                      <div className="mt-3 space-y-2">
                        {homestay.rooms.map((room) => (
                          <button
                            key={room.id}
                            onClick={() => setSelectedRoom(room)}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${
                              selectedRoom?.id === room.id 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 hover:border-green-300'
                            }`}
                          >
                            <div className="font-medium text-sm">{room.type}</div>
                            <div className="text-xs text-gray-500 mb-1">{room.capacity}</div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs line-through text-gray-400">₹{room.originalPrice}</span>
                              <span className="text-sm font-bold">₹{room.price}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleEnquiry}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Enquiry
                </button>
                <button
                  onClick={handleBookNow}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingModal 
          homestay={homestay} 
          selectedRoom={selectedRoom}
          onClose={() => setShowBookingForm(false)} 
        />
      )}
    </div>
  );
};

// Booking Modal Component
const BookingModal = ({ homestay, selectedRoom, onClose }) => {
  const [formData, setFormData] = useState({
    guestType: 'Adult',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    gstNumber: '',
    companyName: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    alert('Booking submitted successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-90vh overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Primary Guest Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <select
                value={formData.guestType}
                onChange={(e) => handleInputChange('guestType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Adult">Adult</option>
                <option value="Child">Child</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <div className="flex">
                <span className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
                  + 91
                </span>
                <input
                  type="tel"
                  placeholder="Mobile No."
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  className="w-full p-3 border border-red-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            <textarea
              placeholder="Address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              rows={3}
              className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">GST Details <span className="text-blue-500">(Optional)</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="GST No."
                value={formData.gstNumber}
                onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p className="mb-2">Passport, Aadhar, Driving License and Govt. ID are accepted as ID proof(s)</p>
            <p>
              By proceeding, you agree to all{' '}
              <a href="#" className="text-blue-500 hover:underline">Terms & Conditions</a>
              {' '}and{' '}
              <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Proceed to Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomestayDetail;