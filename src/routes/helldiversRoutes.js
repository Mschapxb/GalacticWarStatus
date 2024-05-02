const express = require('express');
const router = express.Router();
const https = require('https');  // Use the native https module

// Middleware to handle requests to the Helldivers 2 API
router.get('/info', (req, res) => {
    const options = {
        hostname: 'api.helldivers2.dev',
        port: 443,
        path: '/api/v1/campaigns',  // Update the path as needed
        method: 'GET',
        headers: {
            'X-Super-Client': 'nom_de_votre_application'  // Replace with your application name
        }
    };

    const request = https.request(options, response => {
        let data = '';

        // A chunk of data has been received.
        response.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        response.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                res.json(parsedData);
            } catch (error) {
                console.error('Error parsing JSON!', error);
                res.status(500).send('Failed to parse JSON from Helldivers 2 API');
            }
        });
    });

    request.on('error', (error) => {
        console.error('Failed to fetch Helldivers 2 API:', error);
        res.status(500).send('Failed to fetch Helldivers 2 API');
    });

    request.end();
});

module.exports = router;
