// server.js
const app = require('./src/app');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Ajoutez une route pour servir la page Profile.html
app.use(express.static(path.join(__dirname, 'public')));

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Profile.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
