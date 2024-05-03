const express = require('express');
const router = express.Router();
const planetController = require('../controllers/planetController');


router.get('/info', planetController.fetchPlanetData);

module.exports = router;
