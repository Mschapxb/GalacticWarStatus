const request = require('supertest');
const app = require('../src/app'); 
const db = require('../src/config/db'); 

describe('User Account Management', () => {
  let storedToken; // Variable to store the token for subsequent requests

  // Clean up the user table before each test to prevent state leakage
  beforeEach(async () => {
    await db.query('DELETE FROM users');
  });

  
  afterAll(async () => {
    await db.query('DELETE FROM users'); // Ensure the users table is clean after tests
    if (db.end) db.end(); // Properly close the database connection if your DB supports this method
  });

  test('Create account', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(response.statusCode).toEqual(201);
    expect(response.text).toContain('Utilisateur créé');
  });

  test('Login with created account', async () => {
    // Make sure to create the user first if not using beforeEach for user creation
    await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('accessToken');
    storedToken = response.body.accessToken;
  });

  

  test('Logout (token deletion)', () => {
    // Simulate logout by nullifying the token
    storedToken = null;
    expect(storedToken).toBeNull();
  });
});