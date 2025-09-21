const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); // Your multer setup
const {
    getHandicraftShops, // For the dashboard
    getAllProducts,   // For the public marketplace
    createHandicraft,
    deleteHandicraft
} = require("../controllers/handicraftController");
// const { authOwner } = require("../middleware/authOwner"); // Assuming you have auth
const cpUpload = upload.fields([
    { name: 'gallery', maxCount: 5 },
    { name: 'product_images', maxCount: 10 } // Allow up to 10 product images
]);

// ✅ PUBLIC route to get flattened PRODUCT list for the marketplace
router.get("/", getAllProducts);

// ✅ ADMIN route to get SHOP list for the dashboard
router.get("/shops", getHandicraftShops);

// ✅ ADMIN route to create a new SHOP (with products and gallery)
// This route now uses upload.array('gallery') to handle multiple image files
router.post("/", cpUpload, createHandicraft);

// ✅ ADMIN route to delete a SHOP
router.delete("/:id", deleteHandicraft);

module.exports = router;