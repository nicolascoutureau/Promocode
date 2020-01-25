const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
    let uri = config.databaseURL;

    if (process.env.NODE_ENV === 'test') {
        uri = config.databaseTestURL;
    }

    const connection = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });

    return connection.connection.db;
};
