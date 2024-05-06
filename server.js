// server.js
const app = require('./src/app');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Ajoutez une route pour servir les pages publics
app.use(express.static(path.join(__dirname, 'public')));

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
