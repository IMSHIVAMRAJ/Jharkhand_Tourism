const HomestayOwner = require("../models/HomestayOwner");

// Fetches all owner applications for the admin dashboard
exports.getAllHomestayOwners = async (req, res) => {
  try {
    // This correctly finds all documents in the HomestayOwner collection
    const owners = await HomestayOwner.find().select("-password");
    res.json(owners);
  } catch (err) {
    // If this fails, it will send a 500 error with a clear message
    res.status(500).json({ message: "Server error while fetching owners.", error: err.message });
  }
};

// Approves an owner
exports.approveOwner = async (req, res) => {
  try {
    const owner = await HomestayOwner.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!owner) return res.status(404).json({ message: "Owner not found" });
    res.json({ message: "Owner approved", owner });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Rejects an owner
exports.rejectOwner = async (req, res) => {
    try {
        const owner = await HomestayOwner.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
        if (!owner) return res.status(404).json({ message: "Owner not found" });
        res.json({ message: "Owner rejected", owner });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};