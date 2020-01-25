const validatePromocode = require('../src/services/promocodeValidator');

describe('Promocode Validation', () => {
    test('it validates age', async () => {
        const res = validatePromocode(
            {
                restrictions: [
                    {
                        type: 'rule',
                        field: 'age',
                        comparator: '==',
                        value: 40,
                        valueType: 'number',
                    },
                ],
            },
            { age: 40 },
        );

        expect(res.valid).toBe(true);
    });

    test('it doesnt validate age', async () => {
        const res = validatePromocode(
            {
                restrictions: [
                    {
                        type: 'rule',
                        field: 'age',
                        comparator: '==',
                        value: 40,
                        valueType: 'number',
                    },
                ],
            },
            {
                age: 41,
            },
        );

        expect(res.valid).toBe(false);
    });

    test('it can validate && reducer', async () => {
        const res = validatePromocode(
            {
                restrictions: [
                    {
                        type: 'reducer',
                        operator: '&&',
                        rules: [
                            {
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
            {
                meteoIs: 'clear',
                meteoTemp: '16',
            },
        );

        expect(res.valid).toBe(true);
    });

    test('it can reject || reducer', async () => {
        const res = validatePromocode(
            {
                restrictions: [
                    {
                        type: 'reducer',
                        operator: '||',
                        rules: [
                            {
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
            {
                meteoIs: 'not-clear',
                meteoTemp: '16',
            },
        );

        expect(res.valid).toBe(true);
    });

    test('it can validate && reducer', async () => {
        const res = validatePromocode(
            {
                restrictions: [
                    {
                        type: 'reducer',
                        operator: '&&',
                        rules: [
                            {
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
            {
                meteoIs: 'clear', // ok
                meteoTemp: '16', // ok
            },
        );

        expect(res.valid).toBe(true);
    });

    test('it can reject && reducer', async () => {
        const res = validatePromocode(
            {
                restrictions: [
                    {
                        type: 'reducer',
                        operator: '&&',
                        rules: [
                            {
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
            {
                meteoIs: 'clear',
                meteoTemp: '12', // Too low
            },
        );

        expect(res.valid).toBe(false);
    });

    test('it can reject || reducer', async () => {
        const res = validatePromocode(
            {
                restrictions: [
                    {
                        type: 'reducer',
                        operator: '||',
                        rules: [
                            {
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
            {
                meteoIs: 'not-clear', // not good
                meteoTemp: '12', // Too low
            },
        );

        expect(res.valid).toBe(false);
    });

    test('it can validate || reducer', async () => {
        const res = validatePromocode(
            {
                restrictions: [
                    {
                        type: 'reducer',
                        operator: '||',
                        rules: [
                            {
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
            {
                meteoIs: 'not-clear', // not good
                meteoTemp: '16', // good
            },
        );

        expect(res.valid).toBe(true);
    });
});
