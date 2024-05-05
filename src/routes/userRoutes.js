const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken'); 
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favoritesController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authenticateToken, userController.getProfile); 


// Route pour ajouter un favori avec le nom de la planète dans l'URL
router.post('/favorites/:planetName', authenticateToken, addFavorite);

// Route pour supprimer un favori
router.delete('/favorites/:planetName', authenticateToken, removeFavorite);


// Route pour récupérer tous les favoris d'un utilisateur
router.get('/favorites', authenticateToken, getFavorites);

module.exports = router;
