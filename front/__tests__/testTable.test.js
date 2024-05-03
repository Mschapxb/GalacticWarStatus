const { JSDOM } = require('jsdom');
const generateTable = require('../assets/js/table.js');

let originalDocument;

beforeAll(() => {
    const { window } = new JSDOM();
    global.document = window.document;
    global.window = window;

    originalDocument = global.document;
});

afterAll(() => {
    global.document = originalDocument;
    global.window = originalDocument.defaultView;
});

test('La fonction generateTable crée le bon nombre de lignes de tableau', () => {
    const data = [
        { planet: "Cyberstan", system: "Système machin", status: "Libéré", liberation: "100%", players: 553535 },
        { planet: "Planet 2", system: "Système truc", status: "Enemies", liberation: "0%", players: 3000 },
        { planet: "Malevelon Creek", system: "Système machin", status: "Libéré", liberation: "100%", players: 0 },
        { planet: "Malevelon Beach", system: "Système machin", status: "Libéré", liberation: "100%", players: 0 },
        { planet: "FenrirII", system: "Système machin", status: "Enemies", liberation: "30%", players: 125541 },
    ];

    // Créer une structure de tableau vide dans le DOM
    document.body.innerHTML = '<table><tbody></tbody></table>';

    // Appeler la fonction à tester
    generateTable(data);

    // Vérifier le nombre de lignes de tableau créées
    expect(document.querySelectorAll("table tbody tr").length).toBe(data.length);
});

