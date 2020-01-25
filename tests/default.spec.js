const request = require('supertest');
const User = require('../src/models/user');

const mongoose = require('mongoose');
const startServer = require('../src/app.js');

beforeAll(async () => {
    app = await startServer();
});

afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => {
        resolve();
    }, 500)); // avoid jest open handle error
});

afterEach(async () => {
    await new Promise((resolve) => setTimeout(() => {
        resolve();
    }, 500)); // avoid jest open handle error
});


describe('Test status', () => {
    test('it should get 200 status', async () => {
        const response = await request(app).get('/api/status');
        expect(response.statusCode).toBe(200);
    });
});
