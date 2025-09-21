// routes/homestayOwnerRoutes.js
const express = require("express");
const router = express.Router();
const { 
    getAllHomestayOwners,
    approveOwner, 
    rejectOwner
} = require("../controllers/homestayOwnerController");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", adminMiddleware, getAllHomestayOwners);
router.put("/:id/approve", adminMiddleware, approveOwner);
router.put("/:id/reject", adminMiddleware, rejectOwner);

module.exports = router;