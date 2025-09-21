const express = require("express");
const router = express.Router();
const {
  applyGuide,
  getApprovedGuides,
  getPendingGuides,
  approveGuide,
  rejectGuide
} = require("../controllers/guideController");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/multer"); // 1. Import multer

// ✅ UPDATED: Added upload.single("certification") middleware
router.post("/apply", upload.single("certification"), applyGuide);

// This route was originally at the top, it should be /apply
// router.post("/", applyGuide); 

// ✅ Tourists can view only approved guides
router.get("/", getApprovedGuides);

// ✅ Admin can view pending applications
router.get("/pending", adminMiddleware, getPendingGuides);

// ✅ Admin approve / reject guide
router.put("/:id/approve", adminMiddleware, approveGuide);
router.put("/:id/reject", adminMiddleware, rejectGuide);

module.exports = router;