const Guide = require("../models/Guide");

// ✅ Apply as a Guide (status: pending)
exports.applyGuide = async (req, res) => {
  try {
    const guide = new Guide(req.body);
    await guide.save();
    res.status(201).json({ message: "Application submitted, pending approval", guide });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

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
