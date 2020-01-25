const { Router } = require('express');
const status = require('./routes/status');
const promocode = require('./routes/promocode');
const auth = require('./routes/auth');

module.exports = () => {
    const app = Router();

    status(app);
    promocode(app);
    auth(app);

    return app;
};
