const express = require('express');
const { adminSignup, adminLogin, approveHandicraft, rejectHandicraft, getPendingHandicrafts } = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/signup', adminSignup);
router.post('/login', adminLogin);
router.put('/handicrafts/:id/approve',adminMiddleware, approveHandicraft);
router.put('/handicrafts/:id/reject',adminMiddleware, rejectHandicraft);
router.get('/handicrafts/pending', adminMiddleware,getPendingHandicrafts);
module.exports = router;
