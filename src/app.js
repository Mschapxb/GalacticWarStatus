// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Middleware to parse JSON
app.use(express.json());

// Middleware for static files
app.use(express.static('public'));

// User routes
app.use('/api/users', userRoutes);

module.exports = app;
