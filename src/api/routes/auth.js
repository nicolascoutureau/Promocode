const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/user');
const config = require('../../config');

module.exports = (router) => {

    /**
     * Register a new user
     */
    router.post('/register',
        [
            check('name').isLength({ min: 5 }),
            check('email').isEmail(),
            check('password').isLength({ min: 5 }),
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const hash = await bcrypt.hash(req.body.password, 10);

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            });

            try {
                await user.save();

                res.status(201).json({ message: 'Registered successfully !' });
            } catch (error) {
                res.status(500).json({ error });
            }
        });

    /**
     * Returns a jwt for user
     */
    router.post('/login',
        [
            check('email').isEmail(),
            check('password').isLength({ min: 5 }),
        ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User or password not found !',
                });
            }

            const valid = await bcrypt.compare(req.body.password, user.password);

            if (!valid) {
                return res.status(401).json({
                    success: false,
                    message: 'User or password not found !',
                });
            }

            // eslint-disable-next-line no-underscore-dangle
            const userId = user._id;
            const token = jwt.sign(
                { userId },
                config.jwtSecret,
                { expiresIn: '24h' },
            );

            return res.status(200).json({
                success: true,
                userId,
                token,
            });
        });
};
