const Booking = require("../models/Booking");

// ✅ Create Booking (without payment integration yet)
exports.createBooking = async (req, res) => {
  try {
    const {
      homestay,
      place,
      adults,
      firstName,
      lastName,
      email,
      mobile,
      address,
    } = req.body;

    const booking = new Booking({
      tourist: req.user.id, // from JWT (tourist login)
      homestay,
      place,
      adults,
      firstName,
      lastName,
      email,
      mobile,
      address,
      paymentStatus: "pending",
    });

    await booking.save();
    res.status(201).json({ message: "Booking created, waiting for payment", booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Update Payment (after payment gateway success)
exports.updatePayment = async (req, res) => {
  try {
    const { bookingId, paymentId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.paymentStatus = "paid";
    booking.paymentId = paymentId;

    await booking.save();
    res.json({ message: "Payment successful", booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get Tourist Bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ tourist: req.user.id })
      .populate("homestay", "homestayName location price")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
