const mongoose = require("mongoose");

const attractionSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String
});

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  about: [String], // points
  whatToKnow: [String],
  attractions: [attractionSchema],
  whatToDo: [attractionSchema],
  howToReach: {
    train: String,
    flight: String,
    road: String
  },
  nearbyDestinations: [attractionSchema],
  events: [String],
  famousFood: [String]
}, { timestamps: true });

module.exports = mongoose.model("Destination", destinationSchema);
