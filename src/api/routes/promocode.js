const checkAuth = require('../middleware/checkAuth');
const Promocode = require('../../models/promocode');
const validatePromocode = require('../../services/promocodeValidator');
const weatherService = require('../../services/weatherService');

module.exports = (router) => {
    /**
     * TODO: Request Validation
     * Creates a new promocode
     */
    router.post('/promocodes',
        checkAuth,
        async (req, res) => {
            const promocode = await new Promocode(req.body);
            promocode.save();

            res.json(promocode);
        });

    /**
     * TODO: Request Validation
     * Tries to apply a promocode
     */
    router.post('/validate', async (req, res) => {
        const { promocode_name } = req.body;
        const args = req.body.arguments;

        const promocode = await Promocode.findOne({ name: promocode_name });

        if (!promocode) {
            res.json({
                promocode_name,
                status: 'denied',
                reasons: {
                    promocode: 'notExists',
                },
            });
            return;
        }

        const weather = await weatherService.getInfos(args.town);

        const { valid, errors } = validatePromocode(promocode, {
            age: args.age,
            meteoIs: weather.is,
            meteoTemp: weather.meteoTemp,
            date: new Date(),
        });

        res.json({
            promocode_name,
            status: valid ? 'accepted' : 'denied',
            avantage: promocode.avantage,
            errors,
        });
    });
};
