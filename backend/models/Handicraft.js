const mongoose = require('mongoose');

const handicraftSchema = new mongoose.Schema({
    shop_name: { type: String, required: true },
    address: { type: String, required: true },
    handicraft_names: { type: [String], required: true },  // List of items
    description: { type: String, required: true },
    operating_hours: { type: String, required: true },
    gallery: { type: [String] },    // Array of image URLs
    ratings: { type: Number, default: 0 },  // Overall average rating
    reviews: [{ user: String, comment: String }],  // Array of review objects
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    certification_url: { type: String },  // File URL for certification
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Handicraft', handicraftSchema);
