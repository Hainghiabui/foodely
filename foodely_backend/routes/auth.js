const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/resendOTP', authController.reSendOtp);

module.exports = router;