const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const avantageSchema = new mongoose.Schema({
    percent: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
});

const ruleSchema = new Schema(
    {},
    {
        discriminatorKey: 'type',
        _id: false,
    },
);

const promocodeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a promocode name'],
            index: true,
            unique: true
        },

        avantage: avantageSchema,

        restrictions: [ruleSchema],

    },
    { timestamps: true },
);

const buildReducerSchema = (n = 0) => {
    if (n > 100) {
        return buildRuleSchema();
    }
    const reducerSchema = new Schema(
        {
            operator: {
                type: String,
                enum: ['&&', '||'],
            },
            rules: [ruleSchema],
        },
        { _id: false },
    );
    reducerSchema
        .path('rules')
        .discriminator('reducer', buildReducerSchema(n + 1));
    reducerSchema.path('rules').discriminator('rule', buildRuleSchema(n + 1));
    return reducerSchema;
};

const buildRuleSchema = () => {
    const ruleSchema = new Schema(
        {
            field: String,
            comparator: {
                type: String,
                enum: ['>', '>=', '<', '<=', '==', '!='],
            },
            value: Schema.Types.Mixed,
            valueType: {
                type: String,
                enum: ['string', 'number', 'date'],
            },
        },
        { _id: false },
    );
    return ruleSchema;
};

promocodeSchema.path('restrictions').discriminator('reducer', buildReducerSchema());
promocodeSchema.path('restrictions').discriminator('rule', buildRuleSchema());

const Promocode = mongoose.model('Promocode', promocodeSchema);
module.exports = Promocode;