const Destination = require("../models/Destination");

// ✅ Create Destination
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// CREATE a new destination with file uploads
exports.createDestination = async (req, res) => {
    try {
        const { name, description, address, placesToVisit, popularFood, howToReach, events } = req.body;
        const files = req.files;

        // Check for required files
        if (!files.heroImage || !files.thumbnailImage) {
            return res.status(400).json({ error: "Hero and Thumbnail images are required." });
        }

        // Upload images to Cloudinary
        const heroImageUpload = await cloudinary.uploader.upload(files.heroImage[0].path, { folder: "destinations" });
        const thumbnailImageUpload = await cloudinary.uploader.upload(files.thumbnailImage[0].path, { folder: "destinations" });
        
        let galleryUrls = [];
        if (files.gallery && files.gallery.length > 0) {
            const galleryUploadPromises = files.gallery.map(file =>
                cloudinary.uploader.upload(file.path, { folder: "destinations" })
            );
            const galleryResults = await Promise.all(galleryUploadPromises);
            galleryUrls = galleryResults.map(result => result.secure_url);
        }

        // Clean up uploaded files from local server
        fs.unlinkSync(files.heroImage[0].path);
        fs.unlinkSync(files.thumbnailImage[0].path);
        if (files.gallery) {
            files.gallery.forEach(file => fs.unlinkSync(file.path));
        }

        const newDestination = new Destination({
            name,
            description,
            heroImage: heroImageUpload.secure_url,
            thumbnailImage: thumbnailImageUpload.secure_url,
            gallery: galleryUrls,
            address: JSON.parse(address),
            placesToVisit: JSON.parse(placesToVisit),
            popularFood: JSON.parse(popularFood),
            howToReach: JSON.parse(howToReach),
            events: JSON.parse(events),
        });

        await newDestination.save();
        res.status(201).json({ message: "Destination created successfully", destination: newDestination });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ... other controller functions like getAllDestinations and deleteDestination

// ✅ Get all Destinations

exports.getAllDestinations = async (req, res) => {
    try {
        // Select only the fields needed for the dropdown to keep the payload small
        const destinations = await Destination.find().select(
            'name thumbnailImage description address rating'
        );
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// GET a single destination by its ID (for the destination page)
exports.getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.json(destination);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ✅ Update Destination
exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!destination) return res.status(404).json({ message: "Destination not found" });
    res.json({ message: "Destination updated successfully", destination });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Destination
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found" });
    res.json({ message: "Destination deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
