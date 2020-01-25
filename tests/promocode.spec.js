const request = require('supertest');
const Promocode = require('../src/models/promocode');

describe('Promocode creation', () => {
    test('a user can create a promocode', async () => {
        const response = await request(app).post('/api/promocodes')
            .send({
                name: 'WeatherCode',
                avantage: { percent: 20 },
                restrictions: [
                    {
                        name: 'WeatherCode',
                        avantage: {
                            percent: 20,
                        },
                        restrictions: [{
                            type: 'reducer',
                            operator: '||',
                            rules: [{
                                type: 'rule',
                                field: 'age',
                                comparator: '==',
                                value: 40,
                                valueType: 'number',
                            },
                            {
                                type: 'reducer',
                                operator: '&&',
                                rules: [{
                                    type: 'rule',
                                    field: 'age',
                                    comparator: '<',
                                    value: 30,
                                    valueType: 'number',
                                },
                                {
                                    type: 'rule',
                                    field: 'age',
                                    comparator: '>',
                                    value: 15,
                                    valueType: 'number',
                                },
                                ],
                            },

                            ],
                        },
                        {
                            type: 'reducer',
                            operator: '&&',
                            rules: [{
                                type: 'rule',
                                field: 'date',
                                comparator: '>',
                                value: '2019-01-01',
                                valueType: 'date',
                            },
                            {
                                type: 'rule',
                                field: 'date',
                                comparator: '<',
                                value: '2020-06-30',
                                valueType: 'date',
                            },
                            ],
                        },
                        {
                            type: 'reducer',
                            operator: '&&',
                            rules: [{
                                type: 'rule',
                                field: 'meteoIs',
                                comparator: '==',
                                value: 'clear',
                                valueType: 'date',
                            },
                            {
                                type: 'rule',
                                field: 'meteoTemp',
                                comparator: '>',
                                value: 15,
                                valueType: 'number',
                            },
                            ],
                        },
                        ],
                    },
                ],
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        const promocodes = await Promocode.find({});

        expect(promocodes.length).toBe(1);
    });
});


describe('Promocode Validation', () => {
    test('it can validate promocode', async () => {

    });
});
