const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true },          // 1. Name
  about: { type: String, required: true },         // 2. About
  certification: { type: String },                 // 3. Certification (file path / URL)
  location: { type: String, required: true },      // 4. Location
  contact: { type: String, required: true },       // 5. Contact
  languages: [{ type: String }],                   // 6. Languages
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" } // ✅ Admin approval
}, { timestamps: true });

module.exports = mongoose.model("Guide", guideSchema);
