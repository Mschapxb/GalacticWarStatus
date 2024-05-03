function generateTable(data, showFavoritesOnly = false) {
    const tbody = document.querySelector("table tbody");

    // Supprimer le contenu existant du tbody
    tbody.innerHTML = '';

    // Récupérer les données des planètes en favori
    const favoritePlanets = Object.keys(localStorage);

    // Parcours les données et crée les lignes du tableau
    data.forEach(item => {
        // Vérifie si l'utilisateur souhaite afficher uniquement les favoris et si la planète est en favori
        if (!showFavoritesOnly || (showFavoritesOnly && favoritePlanets.includes(item.planet))) {
            const row = document.createElement("tr");

            // Crée les cellules pour chaque propriété
            const planetCell = document.createElement("td");
            planetCell.innerHTML = `
                <div class="d-flex px-2 py-1">
                    <div>
                        <img src="assets/img/planet.png" class="avatar avatar-sm me-3" alt="${item.planet}">
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">${item.planet}</h6>
                        <p class="text-xs text-secondary mb-0">${item.system}</p>
                    </div>
                </div>
            `;
            row.appendChild(planetCell);

            const statusCell = document.createElement("td");
            statusCell.classList.add("align-middle", "text-center", "text-sm");
            statusCell.innerHTML = `<span class="badge badge-sm bg-gradient-${item.status === "Libéré" ? "success" : "secondary"}">${item.status}</span>`;
            row.appendChild(statusCell);

            const liberationCell = document.createElement("td");
            liberationCell.classList.add("align-middle", "text-center");
            liberationCell.innerHTML = `<span class="text-secondary text-xs font-weight-bold">${item.liberation}</span>`;
            row.appendChild(liberationCell);

            const playersCell = document.createElement("td");
            playersCell.classList.add("align-middle", "text-center");
            playersCell.innerHTML = `<span class="text-secondary text-xs font-weight-bold">${item.players}</span>`;
            row.appendChild(playersCell);

            const favoriteCell = document.createElement("td");
            favoriteCell.classList.add("align-middle", "text-center");
            const favoriteIcon = document.createElement("i");
            favoriteIcon.classList.add("fas", "fa-star");
            favoriteIcon.dataset.planet = item.planet;
            favoriteIcon.style.cursor = "pointer";
            // Vérifie si la planète est dans les favoris et met en évidence l'icône en conséquence
            if (localStorage.getItem(item.planet)) {
                favoriteIcon.classList.add("text-warning");
            } else {
                favoriteIcon.classList.add("text-secondary");
            }
            // Ajoute un écouteur d'événements pour basculer l'état favori
            favoriteIcon.addEventListener("click", toggleFavorite);
            favoriteCell.appendChild(favoriteIcon);
            row.appendChild(favoriteCell);

            // Ajoute la ligne au tableau
            tbody.appendChild(row);
        }
    });
}

// Fonction pour basculer l'état de la planète favorite
function toggleFavorite(event) {
    const planetName = event.target.dataset.planet;
    const favoriteIcon = event.target;
    if (localStorage.getItem(planetName)) {
        // Si la planète est déjà en favori, la retirer
        localStorage.removeItem(planetName);
        favoriteIcon.classList.remove("text-warning");
        favoriteIcon.classList.add("text-secondary");
    } else {
        // Sinon, ajoutez la planète aux favoris
        localStorage.setItem(planetName, "true");
        favoriteIcon.classList.remove("text-secondary");
        favoriteIcon.classList.add("text-warning");
    }
}

module.exports = {
    generateTable,
    toggleFavorite
};