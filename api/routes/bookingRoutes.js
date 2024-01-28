const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
// Importez le contrôleur

// Route pour créer une nouvelle réservation
router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getUserBookings);
router.get('/all-bookings', bookingController.getAllBookings);
router.delete('/bookings/:id', bookingController.deleteBookingById);

module.exports = router;
