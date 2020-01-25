const checkAuth = require('../middleware/checkAuth');
const Promocode = require('../../models/promocode');
const validatePromocode = require('../../services/promocodeValidator');
const weatherService = require('../../services/weatherService');

module.exports = (router) => {

    /**
     * TODO: Validation
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
     * TODO: Validation
     * Tries to apply a promocode
     */
    router.post('/validate', async (req, res) => {
        const promocode_name = req.body.promocode_name;
        let arguments = req.body.arguments;

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

        let weather = await weatherService.getInfos(arguments.town)

        let errors = validatePromocode(promocode, {
            age: arguments.age,
            meteoIs: weather.is,
            meteoTemp: weather.meteoTemp,
            date: new Date()
        });

        res.json({
            promocode_name,
            status: errors.length > 0 ? 'denied' : 'accepted',
            avantage: promocode.avantage,
        });
    });
};
