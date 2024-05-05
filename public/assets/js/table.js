// table.js

document.addEventListener("DOMContentLoaded", function() {
    const favoriteCheckbox = document.getElementById('favoriteCheckbox');
    fetchPlanetData();

    favoriteCheckbox.addEventListener('change', function() {
        fetchPlanetData(this.checked);
    });
});

async function fetchPlanetData(onlyFavorites = false) {
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
        generateTable(data, onlyFavorites); // Modifier la génération de la table pour prendre en compte onlyFavorites
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
            return; // Ignorer les non-favoris si onlyFavorites est true
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
                    <span class="favorite-star ${item.isFavorite ? 'text-warning' : 'text-secondary'}" data-planet-name="${item.planetName}" style="cursor: pointer;">
                        <i class="fas fa-star"></i>
                    </span>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    attachFavoriteHandlers();
}

function attachFavoriteHandlers() {
    const stars = document.querySelectorAll('.favorite-star');
    console.log(`Attaching handlers to ${stars.length} stars`);
    stars.forEach((star) => {
        star.addEventListener('click', async function() {
            const planetName = this.dataset.planetName;
            const isFavorite = this.classList.contains('text-warning');
            console.log(`Toggling favorite for: ${planetName}`);
            await toggleFavorite(planetName, isFavorite, this);
        });
    });
}


async function toggleFavorite(planetName, isFavorite, element) {
    const token = localStorage.getItem('accessToken');
    const method = isFavorite ? 'DELETE' : 'POST';
    const apiUrl = `http://localhost:3000/api/users/favorites/${encodeURIComponent(planetName)}`;

    try {
        const response = await fetch(apiUrl, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to toggle favorite');
        }
        // Update UI based on the successful toggle
        if (isFavorite) {
            element.classList.replace('text-warning', 'text-secondary');
        } else {
            element.classList.replace('text-secondary', 'text-warning');
        }
    } catch (error) {
        console.error('Error toggling favorite: ', error);
    }
}
