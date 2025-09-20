// // src/data/homestayData.js
// export const homestayData = {
//   1: {
//     id: 1,
//     name: "The Bird Dehradun Homestay",
//     location: "Doon University Road, City - Dehradun, District - Dehradun, 248121, Uttarakhand",
//     shortLocation: "Dehradun",
//     rating: 4.5,
//     amenities: ["+6"],
//     originalPrice: 1800,
//     discountedPrice: 1440,
//     discount: "20% Off",
//     images: [
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop"
//     ],
//     thumbnailImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     description: "A serene homestay nestled in the heart of Dehradun, offering comfortable accommodation with modern amenities and traditional hospitality.",
//     rooms: [
//       {
//         id: 1,
//         type: "Super Deluxe Room",
//         capacity: "2 x Adult | 1 x Room",
//         price: 1440,
//         originalPrice: 1800,
//         amenities: ["AC", "WiFi", "TV", "Bathroom"],
//         description: "Spacious room with modern amenities and beautiful views"
//       },
//       {
//         id: 2,
//         type: "Deluxe Room",
//         capacity: "2 x Adult | 1 x Room",
//         price: 1200,
//         originalPrice: 1500,
//         amenities: ["AC", "WiFi", "TV"],
//         description: "Comfortable room with essential amenities"
//       }
//     ],
//     checkIn: "12:00 PM",
//     checkOut: "11:00 AM",
//     policies: [
//       "Food is allowed at an extra cost",
//       "Child under the age of 12 stays free if sharing the bed with parents",
//       "Extra mattress fee applies if required"
//     ],
//     facilities: ["Free WiFi", "Parking", "24/7 Security", "Restaurant", "Garden", "Terrace"],
//     nearbyAttractions: ["Robber's Cave", "Sahastradhara", "Mindrolling Monastery"]
//   },
//   2: {
//     id: 2,
//     name: "Altitude 6000 Homestay",
//     location: "Himalaya Greens, City - Majkhali, District - Almora, 263652, Uttarakhand",
//     shortLocation: "Almora",
//     rating: 4.8,
//     amenities: ["+13"],
//     originalPrice: 6000,
//     discountedPrice: 5400,
//     discount: "10% Off",
//     images: [
//       "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop"
//     ],
//     thumbnailImage: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&h=300&fit=crop",
//     description: "A mountain retreat offering breathtaking views of the Himalayas with luxury amenities and peaceful surroundings.",
//     rooms: [
//       {
//         id: 1,
//         type: "Mountain View Suite",
//         capacity: "2 x Adult | 1 x Room",
//         price: 5400,
//         originalPrice: 6000,
//         amenities: ["AC", "WiFi", "TV", "Balcony", "Mountain View"],
//         description: "Luxurious suite with panoramic mountain views"
//       }
//     ],
//     checkIn: "2:00 PM",
//     checkOut: "12:00 PM",
//     policies: [
//       "Advance booking required",
//       "Cancellation allowed 48 hours before check-in",
//       "Pet-friendly accommodation"
//     ],
//     facilities: ["Free WiFi", "Parking", "Restaurant", "Trekking Guide", "Bonfire", "Library"],
//     nearbyAttractions: ["Kasar Devi Temple", "Bright End Corner", "Almora Bazaar"]
//   },
//   3: {
//     id: 3,
//     name: "Green Valley Homestay",
//     location: "Village Koti, Tehsil Joshimath, District - Chamoli, 246443, Uttarakhand",
//     shortLocation: "Chamoli",
//     rating: 4.3,
//     amenities: ["+8"],
//     originalPrice: 2500,
//     discountedPrice: 2000,
//     discount: "20% Off",
//     images: [
//       "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop"
//     ],
//     thumbnailImage: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
//     description: "Experience authentic village life in this eco-friendly homestay surrounded by lush green valleys and pristine nature.",
//     rooms: [
//       {
//         id: 1,
//         type: "Traditional Room",
//         capacity: "2 x Adult | 1 x Room",
//         price: 2000,
//         originalPrice: 2500,
//         amenities: ["WiFi", "Heater", "Traditional Decor"],
//         description: "Authentic traditional room with local craftsmanship"
//       }
//     ],
//     checkIn: "1:00 PM",
//     checkOut: "10:00 AM",
//     policies: [
//       "Eco-friendly practices encouraged",
//       "Local cuisine included",
//       "Village activities available"
//     ],
//     facilities: ["Organic Garden", "Village Tours", "Yoga Classes", "Traditional Cooking", "Hiking"],
//     nearbyAttractions: ["Valley of Flowers", "Hemkund Sahib", "Badrinath Temple"]
//   },
//   4: {
//     id: 4,
//     name: "River Side Retreat",
//     location: "Near Ganga Ghat, Rishikesh, District - Dehradun, 249201, Uttarakhand",
//     shortLocation: "Rishikesh",
//     rating: 4.6,
//     amenities: ["+10"],
//     originalPrice: 3200,
//     discountedPrice: 2560,
//     discount: "20% Off",
//     images: [
//       "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
//     ],
//     thumbnailImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
//     description: "A peaceful retreat by the holy Ganges, perfect for spiritual seekers and nature lovers seeking tranquility.",
//     rooms: [
//       {
//         id: 1,
//         type: "River View Room",
//         capacity: "2 x Adult | 1 x Room",
//         price: 2560,
//         originalPrice: 3200,
//         amenities: ["AC", "WiFi", "River View", "Meditation Corner"],
//         description: "Serene room overlooking the sacred Ganges river"
//       }
//     ],
//     checkIn: "2:00 PM",
//     checkOut: "11:00 AM",
//     policies: [
//       "Spiritual activities encouraged",
//       "Vegetarian meals only",
//       "Quiet hours from 10 PM to 6 AM"
//     ],
//     facilities: ["Yoga Hall", "Meditation Garden", "Ayurveda Center", "Library", "Ganga Aarti"],
//     nearbyAttractions: ["Laxman Jhula", "Ram Jhula", "Beatles Ashram", "Triveni Ghat"]
//   },
//   5: {
//     id: 5,
//     name: "Hill Station Paradise",
//     location: "Mall Road, Mussoorie, District - Dehradun, 248179, Uttarakhand",
//     shortLocation: "Mussoorie",
//     rating: 4.4,
//     amenities: ["+9"],
//     originalPrice: 4000,
//     discountedPrice: 3200,
//     discount: "20% Off",
//     images: [
//       "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop"
//     ],
//     thumbnailImage: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&h=300&fit=crop",
//     description: "Experience the charm of the Queen of Hills with stunning valley views and colonial architecture in this heritage homestay.",
//     rooms: [
//       {
//         id: 1,
//         type: "Heritage Room",
//         capacity: "2 x Adult | 1 x Room",
//         price: 3200,
//         originalPrice: 4000,
//         amenities: ["Fireplace", "WiFi", "Valley View", "Heritage Decor"],
//         description: "Colonial-style room with vintage charm and modern comfort"
//       }
//     ],
//     checkIn: "1:00 PM",
//     checkOut: "12:00 PM",
//     policies: [
//       "Heritage property guidelines apply",
//       "Weather-dependent activities",
//       "Local sightseeing assistance provided"
//     ],
//     facilities: ["Heritage Tours", "Mountain Biking", "Photography Sessions", "Cafe", "Library"],
//     nearbyAttractions: ["Kempty Falls", "Gun Hill", "Camel's Back Road", "Mall Road"]
//   }
// };

// export const getHomestaysList = () => {
//   return Object.values(homestayData).map(homestay => ({
//     id: homestay.id,
//     name: homestay.name,
//     shortLocation: homestay.shortLocation
//   }));
// };

// export const getHomestayById = (id) => {
//   return homestayData[parseInt(id)];
// };