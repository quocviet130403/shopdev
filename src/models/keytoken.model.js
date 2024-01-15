'use strict'

const {Schema, model} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key';
const COLLECTION = 'Keys';
var keySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    publicKey: {
        type: String,
        required: true
    },
    refreshTokenUsed: {
        type: Array,
        default: []
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: COLLECTION
});

//Export the model
module.exports = model(DOCUMENT_NAME, keySchema);