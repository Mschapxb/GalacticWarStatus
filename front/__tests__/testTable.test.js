// Importer le module pour simuler le stockage local
require('jest-localstorage-mock');

// Importer le module JSDOM pour simuler le DOM
const { JSDOM } = require('jsdom');

// Importer les fonctions à tester depuis le fichier table.js
const { generateTable, toggleFavorite } = require('../assets/js/table.js');

// Variable pour stocker le document original
let originalDocument;

// Configurer le DOM simulé avant chaque test
beforeAll(() => {
    const { window } = new JSDOM();
    global.document = window.document;
    global.window = window;

    // Sauvegarder le document original
    originalDocument = global.document;
});

// Réinitialiser le DOM après chaque test
afterAll(() => {
    global.document = originalDocument;
    global.window = originalDocument.defaultView;
});

// Données de test
const data = [
    { planet: "Cyberstan", system: "Système machin", status: "Libéré", liberation: "100%", players: 553535 },
    { planet: "Planet 2", system: "Système truc", status: "Enemies", liberation: "0%", players: 3000 },
    { planet: "Malevelon Creek", system: "Système machin", status: "Libéré", liberation: "100%", players: 0 },
    { planet: "Malevelon Beach", system: "Système machin", status: "Libéré", liberation: "100%", players: 0 },
    { planet: "FenrirII", system: "Système machin", status: "Enemies", liberation: "30%", players: 125541 },
];

// Test pour vérifier si la fonction generateTable crée le bon nombre de lignes de tableau
test('La fonction generateTable crée le bon nombre de lignes de tableau', () => {

    // Créer une structure de tableau vide dans le DOM
    document.body.innerHTML = '<table><tbody></tbody></table>';

    // Appeler la fonction à tester
    generateTable(data);

    // Vérifier le nombre de lignes de tableau créées
    expect(document.querySelectorAll("table tbody tr").length).toBe(data.length);
});

// Test pour vérifier si la fonction toggleFavorite ajoute et supprime correctement les planètes des favoris
test('La fonction toggleFavorite ajoute et supprime correctement les planètes des favoris', () => {

    // Créer une structure de tableau vide dans le DOM
    document.body.innerHTML = '<table><tbody></tbody></table>';

    // Appeler la fonction generateTable avec les données de test
    generateTable(data);

    // Planète à tester
    const planetName = "Cyberstan";

    // Créer une icône d'étoile pour la planète
    const favoriteIcon = document.querySelector(`i[data-planet="${planetName}"]`);

    // Simuler le clic pour ajouter la planète aux favoris
    toggleFavorite({ target: favoriteIcon });
    expect(localStorage.getItem(planetName)).toBeTruthy(); // Vérifier si la planète a été ajoutée aux favoris

    // Simuler le clic pour supprimer la planète des favoris
    toggleFavorite({ target: favoriteIcon });
    expect(localStorage.getItem(planetName)).toBeFalsy(); // Vérifier si la planète a été supprimée des favoris
});
