const connection = require('../config/db'); 
const jwt = require('jsonwebtoken');

const addFavorite = async (req, res) => {
  const userId = req.user.id;
  const planetName = req.params.planetName;
  try {
    await connection.query(
      'INSERT INTO favorites (user_id, planet_name) VALUES (?, ?) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), planet_name = VALUES(planet_name)',
      [userId, planetName]
    );
    res.status(201).send({ message: 'Favori ajouté ou mis à jour.' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).send({ message: 'Erreur lors de l\'ajout du favori.' });
  }
};
  

const removeFavorite = async (req, res) => {
  const userId = req.user.id;
  const planetName = req.params.planetName; // Utiliser le nom de la planète passé en paramètre
  try {
    await connection.query('DELETE FROM favorites WHERE user_id = ? AND planet_name = ?', [userId, planetName]);
    res.status(200).send({ message: 'Favori supprimé.' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).send({ message: 'Erreur lors de la suppression du favori.' });
  }
};

const getFavorites = async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await connection.query('SELECT planet_name FROM favorites WHERE user_id = ?', [userId]);
    res.status(200).send(rows);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).send({ message: 'Erreur lors de la récupération des favoris.' });
  }
};

module.exports = { addFavorite, removeFavorite, getFavorites };
