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
        mongoose.connection.db.dropDatabase();
        resolve();
    }, 500)); // avoid jest open handle error
});
