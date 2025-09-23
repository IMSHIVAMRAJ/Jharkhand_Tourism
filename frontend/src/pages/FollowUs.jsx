// components/FollowUs.jsx
import React from 'react';
import { FaInstagram, FaTwitter, FaLink, FaHeart } from 'react-icons/fa';

const FollowUs = () => {
  const socialLinks = [
    {
      platform: 'Instagram',
      icon: <FaInstagram className="text-3xl" />,
      handle: '@yourusername',
      url: 'https://instagram.com/yourusername',
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600',
      
    },
    {
      platform: 'Twitter',
      icon: <FaTwitter className="text-3xl" />,
      handle: '@yourusername',
      url: 'https://twitter.com/yourusername',
      color: 'from-blue-400 to-cyan-400',
      hoverColor: 'hover:from-blue-500 hover:to-cyan-500',
      
    },
    {
      platform: 'Connect',
      icon: <FaLink className="text-3xl" />,
      handle: 'ourwebsite.com',
      url: 'https://yourwebsite.com',
      color: 'from-green-400 to-teal-400',
      hoverColor: 'hover:from-green-500 hover:to-teal-500',
      
    }
  ];

  return (
    <div className="min-h-100 bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")'
        }}
      ></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-80 flex items-center justify-center px-4 py-2">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Follow <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stay connected with us across all platforms. Be the first to get updates, 
              exclusive content, and join our growing community.
            </p>
          </div>

          {/* Social Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
            {socialLinks.map((social, index) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-lg group-hover:blur-xl"></div>
                <div className={`
                  relative bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 
                  rounded-2xl p-8 transition-all duration-300 ease-in-out 
                  group-hover:scale-105 group-hover:border-transparent
                  hover:shadow-2xl h-full
                `}>
                  {/* Icon Container */}
                  <div className={`
                    w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r 
                    ${social.color} flex items-center justify-center 
                    shadow-lg group-hover:shadow-xl transition-shadow duration-300
                  `}>
                    <div className="text-white transform group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                  </div>

                  {/* Platform Name */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {social.platform}
                  </h3>

                  {/* Handle */}
                  <p className="text-gray-300 mb-4">{social.handle}</p>

                  {/* Followers */}
                  {/* <div className="text-sm text-gray-400">
                    {social.followers} followers
                  </div> */}

                  {/* Hover Effect Line */}
                  <div className={`
                    absolute bottom-0 left-1/2 transform -translate-x-1/2 
                    w-0 h-1 bg-gradient-to-r ${social.color} 
                    group-hover:w-3/4 transition-all duration-300 rounded-full
                  `}></div>
                </div>
              </a>
            ))}
          </div>

          {/* CTA Section */}
          {/* <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-center mb-4">
              <FaHeart className="text-pink-500 text-2xl mr-3 animate-pulse" />
              <span className="text-white text-lg font-semibold">
                Join Our Community
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              Follow us on all platforms to never miss an update!
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started
            </button>
          </div> */}

          {/* Footer */}
          {/* <div className="mt-12">
            <p className="text-gray-400 text-sm">
              © 2024 Your Brand. All rights reserved.
            </p>
          </div> */}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-float animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-60 animate-float animation-delay-2000"></div>
    </div>
  );
};

export default FollowUs;