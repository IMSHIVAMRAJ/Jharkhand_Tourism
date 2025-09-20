const express = require('express');
const { submitKYC, getKYCStatus, approveKYC } = require('../controllers/kycController');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/submit', submitKYC);
router.get('/status/:userId',adminMiddleware, getKYCStatus);
router.put('/approve/:kycId',adminMiddleware, approveKYC);

module.exports = router;
