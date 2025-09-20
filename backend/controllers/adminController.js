const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Handicraft = require('../models/Handicraft');

// Admin Signup
exports.adminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ message: "Admin already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Approve Handicraft
exports.approveHandicraft = async (req, res) => {
  try {
    const handicraft = await Handicraft.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!handicraft) return res.status(404).json({ message: 'Handicraft not found' });
    res.json({ message: 'Handicraft approved', handicraft });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject Handicraft
exports.rejectHandicraft = async (req, res) => {
  try {
    const handicraft = await Handicraft.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!handicraft) return res.status(404).json({ message: 'Handicraft not found' });
    res.json({ message: 'Handicraft rejected', handicraft });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Pending Handicrafts
exports.getPendingHandicrafts = async (req, res) => {
  try {
    const pending = await Handicraft.find({ status: 'pending' });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
