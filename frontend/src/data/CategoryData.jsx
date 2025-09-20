// /src/data/CategoryData.jsx
import { Camera, Heart, Mountain, Sparkles } from 'lucide-react';
import wildlifebanner from "../assets/wildlife-banner.jpg";
import Adventure from "../assets/Adventure.jpg";
import Wellness from "../assets/Wellness.jpg";
import Spirituality from "../assets/Spirituality.jpg";
import Leisure from "../assets/Leisure.jpg";

// Enhanced Data Structure with Jharkhand-specific content and image details
export const websiteData = {
  categories: [
    {
      id: 'wildlife',
      title: 'Wildlife',
      description: 'Conservation reserves and national parks teeming with varied flora and fauna - Jharkhand has it all.',
      image: wildlifebanner,
      icon: <Mountain className="w-5 h-5" />,
      color: 'from-green-600 to-green-800',
      accentColor: 'green',
      bannerImage: wildlifebanner,
      content: {
        title: 'Into the Wild',
        subtitle: 'Wildlife Paradise of Jharkhand',
        description: 'A haven for nature and wildlife enthusiasts, Jharkhand\'s rich and varied wildlife never ceases to amaze. The state boasts a number of wildlife sanctuaries and national parks, including the popular **Betla National Park** which is famous for its tigers and elephants, and the **Dalma Wildlife Sanctuary** which is a paradise for elephants.',
        highlights: ['Betla National Park', 'Dalma Wildlife Sanctuary', 'Elephants & Tigers', 'Diverse Flora'],
        galleries: [
          {
            src: '/assets/wildlife-jharkhand-1.jpg',
            title: 'Elephant Herd at Dalma',
            description: 'The majestic Asiatic elephants roaming freely in the lush forests of Dalma Wildlife Sanctuary.',
            location: 'Dalma Wildlife Sanctuary',
            season: 'Winter (Nov-Feb)',
            rating: 4.9
          },
          {
            src: '/assets/wildlife-jharkhand-2.jpg',
            title: 'Tiger at Betla',
            description: 'A Bengal tiger spotted in the dense forests of Betla National Park, part of the Palamau Tiger Reserve.',
            location: 'Betla National Park',
            season: 'All Year',
            rating: 4.8
          },
          {
            src: '/assets/wildlife-jharkhand-3.jpg',
            title: 'Sambar Deer',
            description: 'A Sambar deer grazing peacefully in the grasslands of Jharkhand\'s sanctuaries.',
            location: 'Hazaribagh Sanctuary',
            season: 'Summer (Mar-Jun)',
            rating: 4.7
          },
          {
            src: '/assets/wildlife-jharkhand-4.jpg',
            title: 'Birdwatching Paradise',
            description: 'Over 200 species of birds call Jharkhand home, making it a haven for birdwatchers.',
            location: 'Udhwa Lake Bird Sanctuary',
            season: 'Monsoon (Jul-Sep)',
            rating: 4.9
          },
          {
            src: '/assets/wildlife-jharkhand-5.jpg',
            title: 'Leopard',
            description: 'The elusive leopard spotted in the dense forests of Jharkhand.',
            location: 'Palamau Tiger Reserve',
            season: 'Winter (Dec-Feb)',
            rating: 5.0
          },
          {
            src: '/assets/wildlife-jharkhand-6.jpg',
            title: 'Forest Ecosystem',
            description: 'The diverse forest ecosystem supporting hundreds of flora and fauna species.',
            location: 'Multiple Sanctuaries',
            season: 'All Year',
            rating: 4.8
          }
        ]
      }
    },
    {
      id: 'adventure',
      title: 'Adventure',
      description: 'From trekking, rock climbing, and waterfalls to paragliding and river activities - Jharkhand is a haven for thrill seekers.',
      image: Adventure,
      icon: <Mountain className="w-5 h-5" />,
      color: 'from-blue-600 to-blue-800',
      accentColor: 'blue',
      bannerImage: Adventure,
      content: {
        title: 'Adventure Unleashed',
        subtitle: 'Thrills in the Land of Forests',
        description: 'Jharkhand offers some of the most exhilarating adventure sports in India. From rock climbing at Tagore Hill and paragliding in Ranchi to trekking to the numerous stunning waterfalls like Hundru Falls and Dassam Falls, the state provides endless opportunities for adrenaline junkies.',
        highlights: ['Rock Climbing', 'Trekking', 'Paragliding', 'Waterfalls', 'Boating'],
        galleries: [
          {
            src: '/assets/adventure-jharkhand-1.jpg',
            title: 'Hundru Falls Trek',
            description: 'Trek to the breathtaking Hundru Falls, one of Jharkhand\'s highest waterfalls.',
            location: 'Ranchi',
            season: 'Post-Monsoon (Sep-Nov)',
            rating: 4.8
          },
          {
            src: '/assets/adventure-jharkhand-2.jpg',
            title: 'Rock Climbing at Tagore Hill',
            description: 'Challenge yourself with rock climbing at the famous Tagore Hill in Ranchi.',
            location: 'Ranchi',
            season: 'All Year',
            rating: 4.9
          },
          {
            src: '/assets/adventure-jharkhand-3.jpg',
            title: 'Paragliding over Valleys',
            description: 'Soar like a bird over the beautiful valleys and landscapes of Ranchi.',
            location: 'Morhabadi, Ranchi',
            season: 'Oct-Feb',
            rating: 5.0
          },
          {
            src: '/assets/adventure-jharkhand-4.jpg',
            title: 'Boating at Ranchi Lake',
            description: 'Enjoy a peaceful boating experience on the serene waters of Ranchi Lake.',
            location: 'Ranchi',
            season: 'All Year',
            rating: 4.7
          },
          {
            src: '/assets/adventure-jharkhand-5.jpg',
            title: 'Dassam Falls',
            description: 'Explore the natural beauty of Dassam Falls, a stunning cascade near Ranchi.',
            location: 'Ranchi-Jamshedpur Highway',
            season: 'Monsoon (Jul-Sep)',
            rating: 4.6
          },
          {
            src: '/assets/adventure-jharkhand-6.jpg',
            title: 'Patratu Valley',
            description: 'A scenic drive through the winding roads of Patratu Valley, perfect for adventure.',
            location: 'Patratu',
            season: 'Oct-Mar',
            rating: 4.8
          }
        ]
      }
    },
    {
      id: 'wellness',
      title: 'Wellness',
      description: 'The land of forests and serene waterfalls provides the perfect environment for spiritual and physical rejuvenation.',
      image: Wellness,
      icon: <Heart className="w-5 h-5" />,
      color: 'from-teal-600 to-teal-800',
      accentColor: 'teal',
      bannerImage: Wellness,
      content: {
        title: 'Wellness & Rejuvenation',
        subtitle: 'A Natural Retreat',
        description: 'Jharkhand\'s serene environment provides the perfect backdrop for meditation, yoga, and spiritual healing. The natural beauty, from calm lakes to gushing waterfalls, offers a tranquil escape for those seeking peace and rejuvenation. Numerous retreats and natural spots offer a break from the urban hustle.',
        highlights: ['Natural Healing', 'Meditation Retreats', 'Scenic Waterfalls', 'Forest Walks'],
        galleries: [
          {
            src: '/assets/wellness-jharkhand-1.jpg',
            title: 'Sunrise Meditation',
            description: 'Begin your day with peaceful meditation sessions in the heart of nature.',
            location: 'Netarhat',
            season: 'All Year',
            rating: 4.9
          },
          {
            src: '/assets/wellness-jharkhand-2.jpg',
            title: 'Jonha Falls',
            description: 'Find inner peace at Jonha Falls, also known as Gautamdhara, surrounded by tranquil nature.',
            location: 'Ranchi',
            season: 'Oct-Mar',
            rating: 4.8
          },
          {
            src: '/assets/wellness-jharkhand-3.jpg',
            title: 'Forest Therapy',
            description: 'Connect with nature and rejuvenate your mind and body through forest therapy walks.',
            location: 'Betla National Park',
            season: 'All Year',
            rating: 4.7
          },
          {
            src: '/assets/wellness-jharkhand-4.jpg',
            title: 'Patratu Lake',
            description: 'Relax and unwind by the serene Patratu Lake, a perfect spot for relaxation.',
            location: 'Patratu',
            season: 'All Year',
            rating: 4.6
          },
          {
            src: '/assets/wellness-jharkhand-5.jpg',
            title: 'Natural Healing',
            description: 'Experience natural healing and wellness in Jharkhand\'s pristine environment.',
            location: 'Various Locations',
            season: 'All Year',
            rating: 4.9
          },
          {
            src: '/assets/wellness-jharkhand-6.jpg',
            title: 'Quiet Reflection',
            description: 'Find a quiet corner for reflection amidst the state\'s tranquil landscapes.',
            location: 'Various Locations',
            season: 'All Year',
            rating: 4.8
          }
        ]
      }
    },
    {
      id: 'spirituality',
      title: 'Spirituality',
      description: 'Known as the "Land of Gods," the state holds a prominent position in the country\'s religious map.',
      image: Spirituality,
      icon: <Sparkles className="w-5 h-5" />,
      color: 'from-orange-600 to-orange-800',
      accentColor: 'orange',
      bannerImage: Spirituality,
      content: {
        title: 'Sacred Spirituality',
        subtitle: 'A Land of Pilgrimage',
        description: 'Jharkhand is home to some of the most sacred temples and pilgrimage sites in India. The state\'s spiritual significance is deeply rooted in Hindu and Jain traditions. Pilgrims flock to sites like **Baidyanath Dham** and the **Sun Temple** to seek blessings and immerse themselves in a divine atmosphere.',
        highlights: ['Ancient Temples', 'Religious Pilgrimages', 'Sacred Rituals', 'Spiritual Sites'],
        galleries: [
          {
            src: '/assets/spirituality-jharkhand-1.jpg',
            title: 'Baidyanath Dham',
            description: 'One of the holiest Hindu temples and one of the 12 Jyotirlingas, dedicated to Lord Shiva.',
            location: 'Deoghar',
            season: 'May-Oct',
            rating: 5.0
          },
          {
            src: '/assets/spirituality-jharkhand-2.jpg',
            title: 'Jagannath Temple',
            description: 'A sacred temple dedicated to Lord Jagannath, featuring a Rath Yatra similar to Puri.',
            location: 'Ranchi',
            season: 'May-Oct',
            rating: 5.0
          },
          {
            src: '/assets/spirituality-jharkhand-3.jpg',
            title: 'Sun Temple',
            description: 'A unique temple shaped like a chariot with 18 wheels, dedicated to the Sun God.',
            location: 'Ranchi',
            season: 'All Year',
            rating: 4.9
          },
          {
            src: '/assets/spirituality-jharkhand-4.jpg',
            title: 'Pahari Mandir',
            description: 'A temple dedicated to Lord Shiva, situated atop a hill and offering panoramic views of Ranchi.',
            location: 'Ranchi',
            season: 'All Year',
            rating: 4.8
          },
          {
            src: '/assets/spirituality-jharkhand-5.jpg',
            title: 'Chhinnamasta Temple',
            description: 'A famous Shakti Peeth known for its architectural significance and devotion.',
            location: 'Rajrappa',
            season: 'All Year',
            rating: 4.9
          },
          {
            src: '/assets/spirituality-jharkhand-6.jpg',
            title: 'Jain Temples at Parasnath Hill',
            description: 'The holiest pilgrimage site for Jains, where 23 of the 24 Tirthankaras attained salvation.',
            location: 'Giridih',
            season: 'All Year',
            rating: 4.7
          }
        ]
      }
    },
    {
      id: 'leisure',
      title: 'Leisure',
      description: 'Jharkhand is home to warm and friendly people whose cultures and traditions are likely to be seen or experienced anywhere else.',
      image: Leisure,
      icon: <Camera className="w-5 h-5" />,
      color: 'from-purple-600 to-purple-800',
      accentColor: 'purple',
      bannerImage: '/assets/leisure-banner.jpg',
      content: {
        title: 'Leisure & Culture',
        subtitle: 'Rich Heritage and Traditions',
        description: 'Experience the warm hospitality and rich cultural heritage of Jharkhand. From traditional folk dances and music to local handicrafts and cuisine, the state offers a unique cultural experience. The many scenic spots provide perfect leisure destinations with pleasant weather and beautiful landscapes.',
        highlights: ['Tribal Culture', 'Traditional Arts', 'Local Cuisine', 'Festivals'],
        galleries: [
          {
            src: Leisure,
            title: 'Folk Dances',
            description: 'Vibrant folk dances like Chhau and Jhumair performed during festivals and cultural events.',
            location: 'Cultural Centers',
            season: 'Festival Seasons',
            rating: 4.8
          },
          {
            src: '/assets/leisure-jharkhand-2.jpg',
            title: 'Local Markets',
            description: 'Explore bustling local markets offering traditional handicrafts and unique souvenirs.',
            location: 'Various Markets',
            season: 'All Year',
            rating: 4.7
          },
          {
            src: '/assets/leisure-jharkhand-3.jpg',
            title: 'Sarhul Festival',
            description: 'The Sarhul festival marks the beginning of spring, celebrated with great enthusiasm.',
            location: 'Tribal Villages',
            season: 'Spring (Mar-Apr)',
            rating: 4.9
          },
          {
            src: '/assets/leisure-jharkhand-4.jpg',
            title: 'Local Cuisine',
            description: 'Authentic Jharkhandi cuisine offering unique flavors and ingredients like **Dhuska** and **Litti Chokha**.',
            location: 'Local Restaurants',
            season: 'All Year',
            rating: 4.9
          },
          {
            src: '/assets/leisure-jharkhand-5.jpg',
            title: 'Tribal Life',
            description: 'An immersive experience into the rich and diverse life of Jharkhand\'s tribal communities.',
            location: 'Various Villages',
            season: 'All Year',
            rating: 4.8
          },
          {
            src: '/assets/leisure-jharkhand-6.jpg',
            title: 'Scenic Landscapes',
            description: 'Breathtaking landscapes perfect for photography and peaceful relaxation.',
            location: 'Throughout State',
            season: 'All Year',
            rating: 4.9
          }
        ]
      }
    }
  ]
};