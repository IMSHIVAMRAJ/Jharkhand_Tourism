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

// ✅ User applies as Guide
router.post("/", applyGuide);

// ✅ Tourists can view only approved guides
router.get("/", getApprovedGuides);

// ✅ Admin can view pending applications
router.get("/pending",adminMiddleware, getPendingGuides);

// ✅ Admin approve / reject guide
router.put("/:id/approve",adminMiddleware, approveGuide);
router.put("/:id/reject",adminMiddleware, rejectGuide);

module.exports = router;
