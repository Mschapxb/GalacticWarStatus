// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const helldiversRoutes = require('./routes/helldiversRoutes'); // Importez les routes Helldivers


// Middleware pour analyser le JSON
app.use(express.json());

// Middleware pour les fichiers statiques
app.use(express.static('public'));

// Routes utilisateur
app.use('/api/users', userRoutes);

// Routes Helldivers 2 API
app.use('/api/helldivers', helldiversRoutes); // Utilisez les routes Helldivers

module.exports = app;
