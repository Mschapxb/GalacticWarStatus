function generateTable(data) {
    const tbody = document.querySelector("table tbody");

    // Supprimer le contenu existant du tbody
    tbody.innerHTML = '';

    // Parcours les données et crée les lignes du tableau
    data.forEach(item => {
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

        // Ajoute la ligne au tableau
        tbody.appendChild(row);
    });
}

  module.exports = generateTable;
