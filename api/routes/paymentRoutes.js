const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-stripe-session', paymentController.createStripeSession);

module.exports = router;
