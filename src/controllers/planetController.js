const https = require('https');
const { LRUCache } = require('lru-cache');

const cacheOptions = {
    max: 10,
    maxAge: 1000 * 30 // 30 seconds lifetime in cache
    // rate limit is 5 request per 10 seconds so we take a bit of a security margin
};

const cache = new LRUCache(cacheOptions);

const fetchPlanetData = (req, res) => {

    const cachedData = cache.get('planetData');
    if (cachedData) { // cache hit
        res.json(cachedData);
        return;
    }

    // in case of cache miss
    const options = {
        hostname: 'api.helldivers2.dev',
        port: 443,
        path: '/api/v1/campaigns',  // Chemin mis à jour si nécessaire
        method: 'GET',
        headers: {
            'X-Super-Client': 'galactic-war-status'  // Remplacer par le nom de votre application
        }
    };

    const request = https.request(options, response => {
        let rawData = '';
        response.on('data', (chunk) => {
            rawData += chunk;
        });
        response.on('end', () => {
            try {
                const data = JSON.parse(rawData);
                const result = data.map(item => ({
                    planetName: item.planet.name,
                    sector: item.planet.sector,
                    playerCount: item.planet.statistics.playerCount,
                    health: item.planet.health,
                    liberationPercentage: calculateLiberation(item.planet.health, item.planet.maxHealth)
                }));
                
                cache.set('planetData', result);

                res.json(result);
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
};

function calculateLiberation(currentHealth, maxHealth) {
    return 100 - (currentHealth / maxHealth * 100);
};

module.exports = {
    fetchPlanetData
};
