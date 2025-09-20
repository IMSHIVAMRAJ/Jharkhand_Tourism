const express = require('express');
const { createHandicraft, getAllHandicrafts, getHandicraftById, updateHandicraft, deleteHandicraft } = require('../controllers/handicraftController');
const authMiddleware = require('../middleware/authMiddleware');  // Optional, to protect routes

const router = express.Router();

// CRUD routes
router.post('/', createHandicraft);
router.get('/', getAllHandicrafts);
router.get('/:id', getHandicraftById);
router.put('/:id', authMiddleware, updateHandicraft);
router.delete('/:id', authMiddleware, deleteHandicraft);

module.exports = router;
