const express = require('express');
const loaders = require('./loaders');

async function startServer() {
    const app = express();

    // eslint-disable-next-line global-require
    try {
        await loaders({ expressApp: app });
    } catch (e) {
        throw new Error(e);
    }


    const port = process.env.PORT || 1337;

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });

    return app;
}

module.exports = startServer;
