// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');
require('dotenv').config();

const app = express();

app.use(cors());  // Allow CORS for all origins
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error(err));

app.use('/api', bookingRoutes);
module.exports = app;
