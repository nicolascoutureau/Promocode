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

    test('it can reject age', async () => {
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

        console.log(res.errors)
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

    test('it can validate nested reducer', async () => {
        const res = validatePromocode(
            {
                restrictions: [
                    {
                        type: 'rule',
                        field: 'age',
                        comparator: '>',
                        value: '18',
                        valueType: 'number',
                    },
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
                age: '19', // good
                meteoIs: 'clear', // good
                meteoTemp: '14', // not good
            },
        );

        expect(res.valid).toBe(true);
    });

    test('it can reject nested reducer', async () => {
        const res = validatePromocode(
            {
                restrictions: [
                    {
                        type: 'rule',
                        field: 'age',
                        comparator: '>',
                        value: '18',
                        valueType: 'number',
                    },
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
                age: '19', // good
                meteoIs: 'not-clear', // not good
                meteoTemp: '14', // not good
            },
        );

        expect(res.valid).toBe(false);
    });

    test('it can validate full exemple', async () => {
        const res = validatePromocode(
            {
                restrictions: [
                    {
                        type: 'reducer',
                        operator: '||',
                        rules: [
                            {
                                type: 'rule',
                                field: 'age',
                                comparator: '==',
                                value: 40,
                                valueType: 'number',
                            },
                            {
                                type: 'reducer',
                                operator: '&&',
                                rules: [
                                    {
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
                        rules: [
                            {
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
                age: '40', // good
                meteoIs: 'clear', // good
                meteoTemp: '16', // good
                date: '2019-01-02', // good
            },
        );

        expect(res.valid).toBe(true);
    });

    test('it can reject && exemple', async () => {
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
                age: '40', // good
                meteoIs: 'not-clear', // not good
                meteoTemp: '16', // good
                date: '2019-01-02', // good
            },
        );

        expect(res.valid).toBe(false);
    });

    test('it can reject full exemple without date', async () => {
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
                    {
                        type: 'reducer',
                        operator: '||',
                        rules: [
                            {
                                type: 'rule',
                                field: 'age',
                                comparator: '==',
                                value: 40,
                                valueType: 'number',
                            },
                            {
                                type: 'reducer',
                                operator: '&&',
                                rules: [
                                    {
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
                ],
            },
            {
                age: '40', // good
                meteoIs: 'not-clear', // not good
                meteoTemp: '16', // good
            },
        );

        expect(res.valid).toBe(false);
    });

    test('it can validate nested reducers', async () => {
        const res = validatePromocode(
            {
                restrictions: [
                    {
                        type: 'reducer',
                        operator: '||',
                        rules: [
                            {
                                type: 'rule',
                                field: 'age',
                                comparator: '==',
                                value: 40,
                                valueType: 'number',
                            },
                            {
                                type: 'reducer',
                                operator: '&&',
                                rules: [
                                    {
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
                ],
            },
            {
                age: '40', // good
            },
        );

        expect(res.valid).toBe(true);
    });

    test('it can validate full exemple without date', async () => {
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
                    {
                        type: 'reducer',
                        operator: '||',
                        rules: [
                            {
                                type: 'rule',
                                field: 'age',
                                comparator: '==',
                                value: 40,
                                valueType: 'number',
                            },
                            {
                                type: 'reducer',
                                operator: '&&',
                                rules: [
                                    {
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
                ],
            },
            {
                age: '40', // good
                meteoIs: 'clear', // good
                meteoTemp: '16', // good
            },
        );

        expect(res.valid).toBe(true);
    });

    test('full example', async () => {
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
                    {
                        type: 'reducer',
                        operator: '||',
                        rules: [
                            {
                                type: 'rule',
                                field: 'age',
                                comparator: '==',
                                value: 40,
                                valueType: 'number',
                            },
                            {
                                type: 'reducer',
                                operator: '&&',
                                rules: [
                                    {
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
                        rules: [
                            {
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
                ],
            },
            {
                age: '40', // good
                meteoIs: 'not-clear', // not good
                meteoTemp: '16', // good
                date: '2019-01-02', // good
            },
        );

        expect(res.valid).toBe(false);
    });
});




