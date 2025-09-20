const express = require("express");
const router = express.Router();
const { registerOwner, loginOwner, approveOwner, rejectOwner } = require("../controllers/handicraftOwnerController");
const upload = require("../middleware/multer");
const adminMiddleware = require("../middleware/adminMiddleware");

// Register
router.post("/register", upload.single("certificate"), registerOwner);

// Login
router.post("/login", loginOwner);

// Approve/Reject by admin
router.post("/approve/:id",adminMiddleware, approveOwner);
router.post("/reject/:id",adminMiddleware, rejectOwner);

module.exports = router;
