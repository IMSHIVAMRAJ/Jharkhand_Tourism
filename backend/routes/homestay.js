const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  applyHomestayOwner,
  getPendingOwners,
  approveOwner,
  rejectOwner,
  loginOwner
} = require("../controllers/homestayController");
const adminMiddleware = require("../middleware/adminMiddleware");

// ✅ Apply
router.post("/apply", upload.single("certificate"), applyHomestayOwner);
// ✅ Login (only if approved)
router.post("/login", loginOwner);

// ✅ Admin check pending
router.get("/pending",adminMiddleware, getPendingOwners);

// ✅ Admin approve/reject
router.put("/:id/approve",adminMiddleware, approveOwner);
router.put("/:id/reject",adminMiddleware, rejectOwner);

module.exports = router;
