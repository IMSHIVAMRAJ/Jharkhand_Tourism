import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, Heart, Sparkles, Award, Calendar } from 'lucide-react';
import girl1 from '../assets/girl1.jpg';
import girl2 from '../assets/girl2.jpg';
import man from '../assets/man.jpg';
import man2 from "../assets/man2.jpg";

// Testimonial data with additional details
const testimonialsData = [
  {
    id: 1,
    name: 'Anjali Sharma',
    location: 'Delhi, India',
    review: "The serenity of Netarhat is truly unmatched. The sunrise view was absolutely breathtaking. Jharkhand is a hidden gem waiting to be explored!",
    rating: 5,
    image: girl1,
    visitDate: 'March 2024',
    favoriteSpot: 'Netarhat Sunrise Point',
    daysStayed: 3
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Kolkata, India',
    review: "A safari in Betla National Park was an incredible experience. Spotted several wild animals and the forest felt so alive. Highly recommend for wildlife lovers.",
    rating: 5,
    image: man,
    visitDate: 'February 2024',
    favoriteSpot: 'Betla National Park',
    daysStayed: 4
  },
  {
    id: 3,
    name: 'Pooja Singh',
    location: 'Mumbai, India',
    review: "Hundru Falls is a spectacular sight! The sound of the gushing water and the surrounding greenery made for a perfect escape. A must-visit spot in Ranchi.",
    rating: 4,
    image: girl2,
    visitDate: 'January 2024',
    favoriteSpot: 'Hundru Falls',
    daysStayed: 2
  },
  {
    id: 4,
    name: 'Vikram Patel',
    location: 'Ahmedabad, India',
    review: "I was fascinated by the rich tribal culture and warm hospitality. Attending the Sarhul festival was a beautiful and immersive experience. Will definitely visit again.",
    rating: 5,
    image: man2,
    visitDate: 'April 2024',
    favoriteSpot: 'Tribal Village',
    daysStayed: 5
  },
];

const TouristTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentTestimonial]);

  const testimonial = testimonialsData[currentTestimonial];

  return (
    <section className="py-2 bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <Sparkles size={120} className="text-emerald-400" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <Award size={120} className="text-teal-400" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 bg-emerald-100 px-4 py-2 rounded-full">
            <Heart className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Traveler Stories</span>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
            Voices of Wonder
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main testimonial card */}
          <div className={`relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-500 ease-in-out transform ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-emerald-200 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-teal-200 rounded-br-3xl"></div>
            
            <Quote className="absolute top-8 left-8 w-16 h-16 text-emerald-50" />
            <Quote className="absolute bottom-8 right-8 w-16 h-16 text-teal-50 transform scale-x-[-1]" />

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Image and details section */}
              <div className="text-center md:text-left">
                <div className="relative inline-block">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-32 h-32 rounded-full ring-4 ring-gradient-to-r from-emerald-400 to-teal-400 shadow-xl mx-auto md:mx-0"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-2 rounded-full shadow-lg">
                    <Heart className="w-4 h-4" fill="currentColor" />
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-700">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{testimonial.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start gap-2 text-teal-700">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{testimonial.visitDate}</span>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-lg">
                    <p className="text-xs text-emerald-800 font-semibold">Favorite Spot</p>
                    <p className="text-sm text-emerald-700">{testimonial.favoriteSpot}</p>
                  </div>
                </div>
              </div>

              {/* Review content section */}
              <div className="text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 mx-0.5 ${i < testimonial.rating ? 'text-yellow-400 fill-current drop-shadow-sm' : 'text-gray-200'}`}
                    />
                  ))}
                </div>

                <div className="text-2xl italic text-emerald-900 leading-relaxed mb-6 relative">
                  <span className="absolute -left-2 text-emerald-300 text-4xl">"</span>
                  {testimonial.review}
                  <span className="absolute -right-2 text-teal-300 text-4xl">"</span>
                </div>

                <div>
                  <p className="font-bold text-2xl bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                    {testimonial.name}
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-1 mt-1">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      {testimonial.daysStayed} days in Jharkhand
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute -left-4 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-xl text-white hover:from-emerald-600 hover:to-teal-600 transition-all transform hover:scale-110 hover:shadow-2xl group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute -right-4 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-xl text-white hover:from-emerald-600 hover:to-teal-600 transition-all transform hover:scale-110 hover:shadow-2xl group"
            aria-label="Next testimonial"
          >
            <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentTestimonial(index);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 w-8' 
                    : 'bg-emerald-200 hover:bg-emerald-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats section */}
        {/* <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
          <div class="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center">
            <div class="p-4 rounded-full bg-teal-100">
              <svg class="h-8 w-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 8c0-2.21-1.79-4-4-4S6 5.79 6 8s1.79 4 4 4 4-1.79 4-4zm0 2.94c.32-.08.66-.14 1-.14s.68.06 1 .14c.32-.08.66-.14 1-.14s.68.06 1 .14c1.13.28 2.08 1.13 2.65 2.14l-1.92 1.92-1.92-1.92c-.18.18-.38.35-.59.5-.49.36-1.05.65-1.66.86a6.04 6.04 0 0 1-2 0c-.61-.21-1.17-.5-1.66-.86-.21-.15-.41-.32-.59-.5l-1.92 1.92-1.92-1.92c.57-1.01 1.52-1.86 2.65-2.14zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm8 14c-.65-.13-1.29-.2-1.94-.2H9.94c-.65 0-1.29.07-1.94.2-1.87.37-3.4 1.25-4.47 2.45l1.92 1.92c.18-.18.38-.35.59-.5.49-.36 1.05-.65 1.66-.86.61-.21 1.25-.31 1.94-.31s1.33.1 1.94.31c.61.21 1.17.5 1.66.86.21.15.41.32.59.5l1.92-1.92c-1.07-1.2-2.6-2.08-4.47-2.45z" />
              </svg>
            </div>
            <div class="mt-4 text-3xl font-bold text-gray-800">500+</div>
            <div class="text-gray-600">Happy Travelers</div>
          </div>

          <div class="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center">
            <div class="p-4 rounded-full bg-teal-100">
              <svg class="h-8 w-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l2.36 7.24H22l-6 4.36 2.36 7.24L12 17.56l-6.36 4.36 2.36-7.24-6-4.36h7.64z" />
              </svg>
            </div>
            <div class="mt-4 text-3xl font-bold text-gray-800">4.9/5</div>
            <div class="text-gray-600">Average Rating</div>
          </div>

          <div class="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center">
            <div class="p-4 rounded-full bg-teal-100">
              <svg class="h-8 w-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div class="mt-4 text-3xl font-bold text-gray-800">25+</div>
            <div class="text-gray-600">Destinations</div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TouristTestimonials;