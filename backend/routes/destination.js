const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); 
const {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination
} = require("../controllers/destinationController");
const adminMiddleware = require("../middleware/adminMiddleware");
const uploader = upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'thumbnailImage', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
]);
// ✅ CRUD routes
router.post("/create", uploader, createDestination);
router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);
router.put("/:id",adminMiddleware, updateDestination);
router.delete("/:id",adminMiddleware, deleteDestination);

module.exports = router;
