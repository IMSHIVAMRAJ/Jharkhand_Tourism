const express = require("express");
const router = express.Router();
const {
  createDestination,
  getDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination
} = require("../controllers/destinationController");
const adminMiddleware = require("../middleware/adminMiddleware");

// ✅ CRUD routes
router.post("/create",adminMiddleware, createDestination);
router.get("/", getDestinations);
router.get("/:id", getDestinationById);
router.put("/:id",adminMiddleware, updateDestination);
router.delete("/:id",adminMiddleware, deleteDestination);

module.exports = router;
