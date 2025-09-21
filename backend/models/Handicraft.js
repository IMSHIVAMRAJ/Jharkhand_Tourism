const mongoose = require('mongoose');

// Define a schema for the individual products that a shop sells.
// This is a "sub-document" schema.
const productSubSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: {
        type: String,
        required: true,
        enum: ['handicrafts', 'textiles', 'food', 'jewelry', 'pottery', 'stays']
    },
    image: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
});

const handicraftSchema = new mongoose.Schema({
    shop_name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String }, // Shop-level description
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    
    // An array of product sub-documents
    products: [productSubSchema] 

}, { timestamps: true });

module.exports = mongoose.model('Handicraft', handicraftSchema);