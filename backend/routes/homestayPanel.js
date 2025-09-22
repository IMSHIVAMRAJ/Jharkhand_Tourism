const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  addHomestay,
  updateHomestay,
  getHomestayDetails,
  getHomestayById,
  deleteHomestay
} = require("../controllers/homestayPanelController");
const { authOwner } = require("../middleware/authOwner");
const cpUpload = upload.fields([
  { name: 'thumbnailImage', maxCount: 1 },
  { name: 'images', maxCount: 5 }
]);
// ✅ Add Homestay (multiple images)
router.post("/", authOwner, cpUpload, addHomestay);

// ✅ Update Homestay
router.put("/:id", authOwner, cpUpload, updateHomestay);
router.get("/",getHomestayDetails)
// ✅ Get Homestay Details
router.get('/:id', getHomestayById);
router.delete("/:id",authOwner, deleteHomestay);
module.exports = router;
