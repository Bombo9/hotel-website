// src/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    roomType: { type: String, required: true },
    roomNumber: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: { type: String, default: 'Booked' }
});

module.exports = mongoose.model('Booking', bookingSchema);
