const HomestayOwner = require("../models/HomestayOwner");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// ✅ Apply Homestay Owner with file upload
exports.applyHomestayOwner = async (req, res) => {
  try {
    const { name, contact, email, password } = req.body;

    // Upload certificate to Cloudinary
    let certificateUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "homestay_certificates",
      });
      certificateUrl = result.secure_url;

      // remove file from server after upload
      fs.unlinkSync(req.file.path);
    }

    const owner = new HomestayOwner({
      name,
      contact,
      email,
      password,  // hash only after approval
      certificate: certificateUrl,
    });

    await owner.save();
    res.status(201).json({ message: "Application submitted, pending approval", owner });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// ✅ Get pending applications (Admin only)
exports.getPendingOwners = async (req, res) => {
  try {
    const pendingOwners = await HomestayOwner.find({ status: "pending" });
    res.json(pendingOwners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Approve Owner → hash password
exports.approveOwner = async (req, res) => {
  try {
    const owner = await HomestayOwner.findById(req.params.id);
    if (!owner) return res.status(404).json({ message: "Owner not found" });

    // hash password now
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(owner.password, salt);

    owner.password = hashedPassword;
    owner.status = "approved";
    await owner.save();

    res.json({ message: "Homestay owner approved", owner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Reject Owner
exports.rejectOwner = async (req, res) => {
  try {
    const owner = await HomestayOwner.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!owner) return res.status(404).json({ message: "Owner not found" });
    res.json({ message: "Application rejected", owner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Owner Login (after approval)
// ✅ Login Owner
exports.loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check owner exists
    const owner = await HomestayOwner.findOne({ email, status: "approved" });
    if (!owner) return res.status(400).json({ error: "Owner not found or not approved" });

    // check password
    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // create JWT
    const token = jwt.sign(
      { id: owner._id, role: "homestayOwner" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
