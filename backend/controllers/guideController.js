const Guide = require("../models/Guide");
const cloudinary = require("../config/cloudinary"); // 1. Import Cloudinary

// ✅ UPDATED: Now handles file uploads for the certificate
exports.applyGuide = async (req, res) => {
  try {
    // 2. Destructure the text fields from the form body
    const { name, about, location, contact, languages } = req.body;

    let certUrl = "";
    // 3. Check if a file was uploaded
    if (req.file) {
      // 4. Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "guide_certifications",
        resource_type: "auto"
      });
      certUrl = result.secure_url;
    }

    // 5. Create a new guide with the text data and the image URL
    const guide = new Guide({
      name,
      about,
      location,
      contact,
      languages,
      certification: certUrl, // Save the Cloudinary URL
      status: "pending"
    });

    await guide.save();
    res.status(201).json({ message: "Application submitted, pending approval", guide });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- Your other functions remain the same ---

// ✅ Get all approved guides (for tourists)
exports.getApprovedGuides = async (req, res) => {
  try {
    const guides = await Guide.find({ status: "approved" });
    res.json(guides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get pending applications (for admin)
exports.getPendingGuides = async (req, res) => {
  try {
    const guides = await Guide.find({ status: "pending" });
    res.json(guides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Approve Guide
exports.approveGuide = async (req, res) => {
  try {
    const guide = await Guide.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.json({ message: "Guide approved", guide });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Reject Guide
exports.rejectGuide = async (req, res) => {
  try {
    const guide = await Guide.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.json({ message: "Guide rejected", guide });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};