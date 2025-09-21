const mongoose = require("mongoose");

// Schema for events and festivals
const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    month: String
});

const destinationSchema = new mongoose.Schema({
  // Core Details
  name: { type: String, required: true },
  description: { type: String, required: true },
  
  // Image URLs
  heroImage: { type: String, required: true },
  thumbnailImage: { type: String, required: true },
  gallery: [String],

  // Location Details (structured object)
  address: {
    location: String,
    nearbyAirport: String
  },

  // Ratings
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },

  // Content Arrays
  placesToVisit: [String],
  events: [eventSchema], // Using the structured event schema
  popularFood: [String],

  // Travel Details (structured object)
  howToReach: {
    byAir: String,
    byTrain: String,
    byRoad: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Destination", destinationSchema);