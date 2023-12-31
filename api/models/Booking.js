const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, required: true },
    checkIn: { type: Date, required: true },
    name: { type: String, requires: true },
    phone: { type: String, require: true },
    price: Number,
})

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;