import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, ArrowLeft, Loader } from 'lucide-react';
import BookingModal from '../components/BookingModal';

const HomestayDetail = () => {
  const { homestayId } = useParams();
  const [homestay, setHomestay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    if (!homestayId) return;
    const fetchHomestayDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/homestays/${homestayId}`);
        if (!response.ok) throw new Error('Homestay not found');
        const data = await response.json();
        setHomestay(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHomestayDetail();
  }, [homestayId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader className="w-12 h-12 animate-spin text-green-600" /></div>;
  }
  if (error || !homestay) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Homestay not found</h2>
        <Link to="/homestay" className="text-green-600 hover:text-green-700">← Back to homestays</Link>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <Link to="/homestay" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Homestays
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative mb-8 h-96 rounded-xl overflow-hidden shadow-lg">
                <img src={homestay.images[0]} alt={homestay.name} className="w-full h-full object-cover" />
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-800">{homestay.name}</h1>
                  <div className="flex items-center bg-green-100 px-3 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-green-800">{homestay.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{homestay.location}</span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{homestay.description}</p>
                
                <h3 className="font-semibold text-gray-800 mb-3 border-t pt-4">Available Rooms</h3>
                <div className="space-y-4 mb-6">
                  {homestay.rooms && homestay.rooms.map((room) => (
                    <div key={room._id} className="border p-4 rounded-lg bg-gray-50">
                      <p className="font-bold">{room.type}</p>
                      <p className="text-sm text-gray-500">{room.capacity}</p>
                      <p className="font-semibold mt-2">₹{room.price}/- per night</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold text-gray-800 mb-3 border-t pt-4">Facilities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {homestay.facilities && homestay.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h3 className="font-bold text-xl text-gray-800 mb-4">Booking Details</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-gray-500 line-through text-lg">₹{homestay.originalPrice}/-</span>
                  <span className="text-2xl font-bold text-gray-800">₹{homestay.discountedPrice}/-</span>
                </div>
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showBookingModal && (
        <BookingModal 
          homestay={homestay} 
          onClose={() => setShowBookingModal(false)} 
        />
      )}
    </>
  );
};

export default HomestayDetail;