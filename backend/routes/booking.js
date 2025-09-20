const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createBooking,
  updatePayment,
  getMyBookings
} = require("../controllers/bookingController");

// ✅ Create new booking
router.post("/create", authMiddleware, createBooking);

// ✅ Update payment status
router.put("/payment", authMiddleware, updatePayment);

// ✅ Get my bookings
router.get("/my", authMiddleware, getMyBookings);

module.exports = router;
