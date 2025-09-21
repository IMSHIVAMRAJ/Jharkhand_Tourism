const Homestay = require("../models/Homestay");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// ✅ Add Homestay
exports.addHomestay = async (req, res) => {
  try {
    // Destructure all fields from the request body
    const { 
      name, location, shortLocation, description, rating, amenities,
      originalPrice, discountedPrice, discount, checkIn, checkOut,
      policies, facilities, nearbyAttractions, rooms // rooms will be a JSON string
    } = req.body;

    // Handle file uploads for thumbnail and gallery
    let thumbnailUrl = "";
    let galleryUrls = [];

    if (req.files) {
      // Upload thumbnail if it exists
      if (req.files.thumbnailImage) {
        const thumbResult = await cloudinary.uploader.upload(req.files.thumbnailImage[0].path, { folder: "homestay_thumbnails" });
        thumbnailUrl = thumbResult.secure_url;
        fs.unlinkSync(req.files.thumbnailImage[0].path);
      }

      // Upload gallery images if they exist
      if (req.files.images) {
        for (let file of req.files.images) {
          const result = await cloudinary.uploader.upload(file.path, { folder: "homestay_gallery" });
          galleryUrls.push(result.secure_url);
          fs.unlinkSync(file.path);
        }
      }
    }

    const newHomestay = new Homestay({
      owner: req.user.id, // from authOwner middleware
      name, location, shortLocation, description, rating,
      amenities: amenities ? JSON.parse(amenities) : [],
      originalPrice, discountedPrice, discount,
      thumbnailImage: thumbnailUrl,
      images: galleryUrls,
      rooms: rooms ? JSON.parse(rooms) : [], // Parse rooms array from JSON string
      checkIn, checkOut,
      policies: policies ? JSON.parse(policies) : [],
      facilities: facilities ? JSON.parse(facilities) : [],
      nearbyAttractions: nearbyAttractions ? JSON.parse(nearbyAttractions) : []
    });

    await newHomestay.save();
    res.status(201).json({ message: "Homestay added successfully", homestay: newHomestay });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// ✅ Get all homestays belonging to the currently logged-in owner
exports.getOwnerHomestays = async (req, res) => {
    try {
        const homestays = await Homestay.find({ owner: req.user.id });
        if (!homestays) {
            return res.status(404).json({ error: "No homestays found for this owner."});
        }
        res.json(homestays);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Update Homestay
exports.updateHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id);

    if (!homestay) return res.status(404).json({ error: "Homestay not found" });
    if (homestay.owner.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    const { homestayName, location, price, discount } = req.body;

    if (req.files && req.files.length > 0) {
      let galleryUrls = [];
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "homestay_gallery",
        });
        galleryUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
      homestay.gallery = galleryUrls;
    }

    homestay.homestayName = homestayName || homestay.homestayName;
    homestay.location = location || homestay.location;
    homestay.price = price || homestay.price;
    homestay.discount = discount || homestay.discount;

    await homestay.save();
    res.json({ message: "Homestay updated successfully", homestay });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get Homestay Details
exports.getHomestayOwerDetails = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id).populate("owner", "name email");
    if (!homestay) return res.status(404).json({ error: "Homestay not found" });
    res.json(homestay);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getHomestayDetails = async (req, res) => {
  try {
    const homestays = await Homestay.find();   // ya phir findOne({}) likha hoga
    if (!homestays) {
      return res.status(404).json({ error: "Homestay not found" });
    }
    res.json(homestays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getHomestayById = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id);
    if (!homestay) {
      return res.status(404).json({ message: "Homestay not found" });
    }
    res.json(homestay);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
