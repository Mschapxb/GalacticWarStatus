// planetController.test.js
const https = require('https');
const { fetchPlanetData } = require('../src/controllers/planetController');

jest.mock('https'); // Mocking the https module to control its behavior in tests

describe('fetchPlanetData', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {}; // Mock request object, expand as necessary
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), // Support chaining on status()
      send: jest.fn()
    };
  });

  it('should successfully fetch data and ensure each entry has a planet name', async () => {
    const testData = JSON.stringify([
      {
        planet: {
          name: "RandomPlanetName", // Simulating random planet name
          // other data is not considered in this test
        }
      },
      {
        planet: {
          name: "AnotherRandomPlanetName", // Another planet for robustness
        }
      }
    ]);

    const responseMock = {
      on: jest.fn((event, handler) => {
        if (event === 'data') handler(Buffer.from(testData));
        if (event === 'end') handler();
      })
    };

    const requestMock = {
      on: jest.fn((event, handler) => {
        if (event === 'response') handler(responseMock);
      }),
      end: jest.fn()
    };

    https.request.mockImplementation(() => requestMock);

    await fetchPlanetData(mockReq, mockRes);

    // Check that res.json was called with an array, and each object in the array has a planetName
    expect(mockRes.json).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({
        planetName: expect.any(String)
      })
    ]));
  });

  // Additional tests can follow here...
});
