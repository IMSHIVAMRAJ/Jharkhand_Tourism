const mongoose = require("mongoose");

const HandicraftOwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  certificate: { type: String }, // cloudinary url
  status: { type: String, enum: ["pending", "approved"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("HandicraftOwner", HandicraftOwnerSchema);
