// src/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Booking = require('../models/Booking'); // Import the Booking model

require('dotenv').config();
// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,  // Environment variable for email
        pass: process.env.EMAIL_PASSWORD  // Environment variable for password
    }
});
// Verify the transporter
transporter.verify((error, success) => {
    if (error) {
        console.error('Error verifying transporter:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

// Route to handle booking
router.post('/book', async (req, res) => {
    try {
        const { name, email, roomType, roomNumber, checkIn, checkOut } = req.body;

        // Check for missing fields
        if (!name || !email || !roomType || !roomNumber || !checkIn || !checkOut) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        
        const newBooking = new Booking({ name, email, roomType, roomNumber, checkIn, checkOut });
        await newBooking.save();

        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Booking Confirmation',
            text: `Dear ${name},\n\nYour booking for a ${roomType} room (Room Number: ${roomNumber}) has been confirmed.\nCheck-In: ${checkIn}\nCheck-Out: ${checkOut}\n\nThank you for choosing our hotel!\n\nBest regards,\nHotel Team`
        };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: 'Booking successful!' });
    } catch (error) {
        console.error('Error during booking:', error);
        res.status(500).json({ message: 'An error occurred. Please try again later.', error: error.message });
    }
});

// Route to retrieve room availability
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Booking.find({});
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error fetching room availability:', error);
        res.status(500).json({ message: 'An error occurred while fetching room availability.' });
    }
});

module.exports = router;
