const Destination = require("../models/Destination");

// ✅ Create Destination
exports.createDestination = async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json({ message: "Destination created successfully", destination });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get all Destinations
exports.getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get single Destination by ID
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found" });
    res.json(destination);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
