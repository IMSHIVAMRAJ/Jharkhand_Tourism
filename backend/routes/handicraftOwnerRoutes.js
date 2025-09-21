const express = require("express");
const router = express.Router();
const { registerOwner, loginOwner, approveOwner, rejectOwner, getAllOwners } = require("../controllers/handicraftOwnerController");
const upload = require("../middleware/multer");
const adminMiddleware = require("../middleware/adminMiddleware");

// Register
router.post("/register", upload.single("certificate"), registerOwner);

// Login
router.post("/login", loginOwner);
router.get("/", adminMiddleware, getAllOwners);
// Approve/Reject by admin
router.put("/approve/:id",adminMiddleware, approveOwner);
router.delete("/reject/:id",adminMiddleware, rejectOwner);

module.exports = router;
