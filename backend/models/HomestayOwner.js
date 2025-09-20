const mongoose = require("mongoose");

const homestayOwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // encrypt karenge approval ke time
  certificate: { type: String }, // file path/url
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("HomestayOwner", homestayOwnerSchema);
