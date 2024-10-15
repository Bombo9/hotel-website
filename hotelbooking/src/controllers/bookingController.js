// src/controllers/bookingController.js
const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

exports.createBooking = async (req, res) => {
    try {
        const { name, email, roomType, roomNumber, checkIn, checkOut } = req.body;

        const booking = new Booking({ name, email, roomType, roomNumber, checkIn, checkOut });
        await booking.save();

        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Booking Confirmation',
            text: `Thank you, ${name}! Your booking for a ${roomType} room from ${checkIn} to ${checkOut} is confirmed.`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Booking created and confirmation email sent.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};
