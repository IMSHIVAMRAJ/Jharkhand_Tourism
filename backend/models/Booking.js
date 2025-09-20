const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    tourist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tourist", // Tourist model (signup/login)
      required: true,
    },
    homestay: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Homestay",
      required: true,
    },
    place: { type: String, required: true },
    adults: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    paymentId: { type: String }, // Razorpay/Stripe ID
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
