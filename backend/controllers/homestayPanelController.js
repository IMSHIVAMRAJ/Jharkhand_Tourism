const Homestay = require("../models/Homestay");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// ✅ Add Homestay
exports.addHomestay = async (req, res) => {
  try {
    const { homestayName, location, price, discount } = req.body;

    let galleryUrls = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "homestay_gallery",
        });
        galleryUrls.push(result.secure_url);
        fs.unlinkSync(file.path); // remove local file
      }
    }

    const homestay = new Homestay({
      owner: req.user.id, // from JWT middleware (logged in owner)
      homestayName,
      location,
      price,
      discount,
      gallery: galleryUrls,
    });

    await homestay.save();
    res.status(201).json({ message: "Homestay added successfully", homestay });
  } catch (err) {
    res.status(400).json({ error: err.message });
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
exports.getHomestayDetails = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id).populate("owner", "name email");
    if (!homestay) return res.status(404).json({ error: "Homestay not found" });
    res.json(homestay);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
