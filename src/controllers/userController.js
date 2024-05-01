const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config/db'); 

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        connection.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            (error, results) => {
                if (error) {
                    return res.status(500).json({ error: 'Erreur lors de l\'inscription de l\'utilisateur' });
                }
                res.status(201).send('Utilisateur créé');
            }
        );
    } catch (error) {
        res.status(500).send('Erreur serveur');
    }
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (error, results) => {
            if (error) {
                return res.status(500).send('Erreur serveur');
            }
            if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
                return res.status(401).send('Email ou mot de passe incorrect');
            }

            const user = { id: results[0].id, email: results[0].email };
            const accessToken = jwt.sign(user, 'votre_clé_secrète', { expiresIn: '1h' });

            res.json({
                accessToken
            });
        }
    );
};
exports.getProfile = (req, res) => {
    
    connection.query(
        'SELECT id, username, email FROM users WHERE id = ?',
        [req.user.id], 
        (error, results) => {
            if (error) {
                return res.status(500).send('Erreur serveur');
            }
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Utilisateur non trouvé');
            }
        }
    );
};
