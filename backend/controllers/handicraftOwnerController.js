const HandicraftOwner = require("../models/HandicraftOwner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

exports.registerOwner = async (req, res) => {
  try {
    const { name, contact, email, password } = req.body;
    const existing = await HandicraftOwner.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already registered" });

    let certUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto"
      });
      certUrl = result.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newOwner = new HandicraftOwner({
      name,
      contact,
      email,
      password: hashedPassword,
      certificate: certUrl,
      status: "pending"
    });

    await newOwner.save();

    res.json({
      msg: "Registration submitted, wait for admin approval",
      owner: {
        id: newOwner._id,
        name: newOwner.name,
        email: newOwner.email,
        status: newOwner.status
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


exports.loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const owner = await HandicraftOwner.findOne({ email });
    if (!owner) return res.status(400).json({ msg: "Owner not found" });
    if (owner.status !== "approved") return res.status(400).json({ msg: "Not approved yet" });

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.approveOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await HandicraftOwner.findById(id);
    if (!owner) return res.status(404).json({ msg: "Owner not found" });

    owner.status = "approved";
    await owner.save();

    res.json({ msg: "Owner approved" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.rejectOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await HandicraftOwner.findByIdAndDelete(id);
    if (!owner) return res.status(404).json({ msg: "Owner not found" });

    res.json({ msg: "Owner rejected and removed" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
