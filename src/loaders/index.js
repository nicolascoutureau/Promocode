const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');

module.exports = async ({ expressApp }) => {
    // Load mongoose
    await mongooseLoader();

    // Load express
    await expressLoader({ app: expressApp });

    // Load models
    // TODO: read dir to load models
    // eslint-disable-next-line global-require
    require('../models/user');
};
