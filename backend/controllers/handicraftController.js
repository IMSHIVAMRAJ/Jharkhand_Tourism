const Handicraft = require('../models/Handicraft');
const cloudinary = require("../config/cloudinary"); // Assuming you have this
const fs = require("fs");

// ✅ NEW Function: Get a list of shops for the dashboard
exports.getHandicraftShops = async (req, res) => {
    try {
        // This finds all shop documents, which is what your dashboard table needs
        const shops = await Handicraft.find();
        res.json(shops);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ✅ REWRITTEN Function: Create a new handicraft shop with products and gallery
exports.createHandicraft = async (req, res) => {
    try {
        const { owner } = req; // Assuming auth middleware adds user to req
        const { shop_name, address, description, operating_hours, ratings, products } = req.body;

        // 1. Parse the products array from the JSON string sent by the form
        let productsArray = JSON.parse(products);

        // 2. Upload product images and gallery images to Cloudinary
        let productImagesUrls = [];
        let galleryUrls = [];

        if (req.files) {
            // Handle individual product images
            if (req.files.product_images) {
                for (let file of req.files.product_images) {
                    const result = await cloudinary.uploader.upload(file.path, { folder: "handicraft_products" });
                    productImagesUrls.push(result.secure_url);
                    fs.unlinkSync(file.path);
                }
            }
            // Handle general shop gallery images
            if (req.files.gallery) {
                for (let file of req.files.gallery) {
                    const result = await cloudinary.uploader.upload(file.path, { folder: "handicraft_gallery" });
                    galleryUrls.push(result.secure_url);
                    fs.unlinkSync(file.path);
                }
            }
        }

        // 3. Match uploaded image URLs to their corresponding product object
        if (productsArray.length !== productImagesUrls.length) {
            return res.status(400).json({ error: "The number of products must match the number of product images uploaded." });
        }
        productsArray.forEach((product, index) => {
            product.image = productImagesUrls[index];
        });

        // 4. Create the new Handicraft document
        const newHandicraft = new Handicraft({
     // Or req.user.id depending on your auth middleware
            shop_name,
            address,
            description,
            operating_hours,
            ratings,
            gallery: galleryUrls,
            products: productsArray
        });

        await newHandicraft.save();
        res.status(201).json({ message: 'Handicraft shop added successfully', handicraft: newHandicraft });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// This is the function for the PUBLIC marketplace page
exports.getAllProducts = async (req, res) => {
    try {
        const shops = await Handicraft.find({ status: 'approved' });
        const allProducts = shops.flatMap(shop => 
            shop.products.map(product => ({
                ...product.toObject(),
                id: product._id,
                vendor: shop.shop_name,
                location: shop.address,
                isVerified: shop.status === 'approved',
                shopId: shop._id
            }))
        );
        res.json(allProducts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Other functions (getById, update, delete) would be updated similarly...
exports.deleteHandicraft = async (req, res) => {
    try {
        await Handicraft.findByIdAndDelete(req.params.id);
        res.json({ message: 'Handicraft deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};