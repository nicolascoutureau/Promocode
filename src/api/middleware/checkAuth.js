const jwt = require('jsonwebtoken');
const config = require('../../config')

module.exports = function (req, res, next) {
    try {
        const token = req.header('authorization').replace('Bearer', '').trim();
        // eslint-disable-next-line no-unused-vars
        const { userId } = jwt.verify(token, config.jwtSecret);

        next();
    } catch (e) {
        res.status(401).json({
            error: 'Invalid request!',
        });
    }
};
