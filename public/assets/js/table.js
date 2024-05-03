// table.js

document.addEventListener("DOMContentLoaded", function() {
    fetchPlanetData();
});

async function fetchPlanetData() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const apiUrl = 'http://localhost:3000/api/helldivers/info';

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        generateTable(data); // initial table generation
    } catch (error) {
        console.error('Error fetching data: ', error);
        alert('Failed to load planet data');
    }
}

function generateTable(data, onlyFavorites = false) {
    const tableBody = document.querySelector('.table tbody');
    tableBody.innerHTML = '';

    data.forEach((item) => {
        if (onlyFavorites && !item.isFavorite) {
            return;
        }

        const row = `
            <tr>
                <td class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    <img src="${item.planetImageUrl || 'assets/img/planet.png'}" alt="Image de ${item.planetName}" style="width: 50px; height: 50px; vertical-align: middle; margin-right: 10px;">
                    ${item.planetName}
                </td>
                <td class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">${item.sector}</td>
                <td class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">${item.liberationPercentage.toFixed(2)}%</td>
                <td class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">${item.playerCount}</td>
                <td class="text-center">
                    <span class="favorite-star ${item.isFavorite ? 'text-warning' : 'text-secondary'}" data-planet-id="${item.planetId}" style="cursor: pointer;">
                        <i class="fas fa-star"></i>
                    </span>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    // Ajoutez un gestionnaire d'événements pour cliquer sur une étoile pour ajouter/supprimer une planète des favoris
    document.querySelectorAll('.favorite-star').forEach((star) => {
        star.addEventListener('click', function() {
            const planetId = this.dataset.planetId;
            toggleFavorite(planetId);
        });
    });
}

async function toggleFavorite(planetId) {

}

