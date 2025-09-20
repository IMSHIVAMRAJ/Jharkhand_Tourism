import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Testimonial data - you can easily add more here
const testimonialsData = [
  {
    id: 1,
    name: 'Anjali Sharma',
    location: 'Delhi, India',
    review: "The serenity of Netarhat is truly unmatched. The sunrise view was absolutely breathtaking. Jharkhand is a hidden gem waiting to be explored!",
    rating: 5,
    image: '/api/placeholder/50/50?text=AS'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Kolkata, India',
    review: "A safari in Betla National Park was an incredible experience. Spotted several wild animals and the forest felt so alive. Highly recommend for wildlife lovers.",
    rating: 5,
    image: '/api/placeholder/50/50?text=RK'
  },
  {
    id: 3,
    name: 'Pooja Singh',
    location: 'Mumbai, India',
    review: "Hundru Falls is a spectacular sight! The sound of the gushing water and the surrounding greenery made for a perfect escape. A must-visit spot in Ranchi.",
    rating: 4,
    image: '/api/placeholder/50/50?text=PS'
  },
  {
    id: 4,
    name: 'Vikram Patel',
    location: 'Ahmedabad, India',
    review: "I was fascinated by the rich tribal culture and warm hospitality. Attending the Sarhul festival was a beautiful and immersive experience. Will definitely visit again.",
    rating: 5,
    image: '/api/placeholder/50/50?text=VP'
  },
];

const TouristTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const testimonial = testimonialsData[currentTestimonial];

  return (
    <section className="py-20 bg-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Our Visitors Speak
          </h2>
          <p className="text-lg text-gray-600 mt-2">Hear from those who have explored the beauty of Jharkhand.</p>
        </div>

        <div className="relative max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-500 ease-in-out">
          <Quote className="absolute top-6 left-6 w-12 h-12 text-gray-200" />
          <Quote className="absolute bottom-6 right-6 w-12 h-12 text-gray-200 transform scale-x-[-1]" />

          <div className="text-center animate-in fade-in-0 duration-1000">
            <div className="text-3xl italic text-gray-700 leading-relaxed mb-6">
              "{testimonial.review}"
            </div>
            
            <div className="flex justify-center items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-current mx-0.5" />
              ))}
            </div>

            <div className="flex justify-center items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full ring-2 ring-yellow-500 mr-4"
              />
              <div>
                <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-4 md:left-6 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-4 md:right-6 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TouristTestimonials;