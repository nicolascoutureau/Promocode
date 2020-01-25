const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a full name'],
            index: true,
        },

        email: {
            type: String,
            lowercase: true,
            unique: true,
            index: true,
        },

        password: String,

        salt: String,

        role: {
            type: String,
            default: 'user',
        },
    },
    { timestamps: true },
);

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
