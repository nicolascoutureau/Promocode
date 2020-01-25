const request = require('supertest');
const User = require('../src/models/user');

describe('Test status', () => {
    test('it should get 200 status', async () => {
        const response = await request(app).get('/api/status');
        expect(response.statusCode).toBe(200);
    });
});
