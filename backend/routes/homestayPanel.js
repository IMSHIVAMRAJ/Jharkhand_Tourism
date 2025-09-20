const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  addHomestay,
  updateHomestay,
  getHomestayDetails
} = require("../controllers/homestayPanelController");
const { authOwner } = require("../middleware/authOwner");

// ✅ Add Homestay (multiple images)
router.post("/add", authOwner, upload.array("gallery", 5), addHomestay);

// ✅ Update Homestay
router.put("/:id", authOwner, upload.array("gallery", 5), updateHomestay);

// ✅ Get Homestay Details
router.get("/:id", getHomestayDetails);

module.exports = router;
