// models/Homestay.js
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  type: String,
  capacity: String,
  price: Number,
  originalPrice: Number,
  amenities: [String],
});

const HomestaySchema = new mongoose.Schema({
   owner: { type: mongoose.Schema.Types.ObjectId, ref: "HomestayOwner", required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  shortLocation: { type: String }, // e.g., "Ranchi"
  description: { type: String },
  rating: { type: Number, default: 4.0 },
  amenities: [String],
  originalPrice: Number,
  discountedPrice: Number,
  discount: String,
  images: [String],
  thumbnailImage: String,
  rooms: [roomSchema],
  checkIn: { type: String, default: "2:00 PM" },
  checkOut: { type: String, default: "11:00 AM" },
  policies: [String],
  facilities: [String],
  nearbyAttractions: [String],
}, { timestamps: true });

module.exports = mongoose.model("Homestay", HomestaySchema);