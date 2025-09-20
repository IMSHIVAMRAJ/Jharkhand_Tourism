const mongoose = require("mongoose");

const HomestaySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomestayOwner",
      required: true,
    },
    homestayName: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    gallery: [{ type: String }], // Cloudinary URLs
  },
  { timestamps: true }
);

module.exports = mongoose.model("Homestay", HomestaySchema);
