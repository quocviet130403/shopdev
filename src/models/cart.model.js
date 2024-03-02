'use strict'

const {Schema, model} = require('mongoose'); // Erase if already required
const slugify = require('slugify');

const DOCUMENT_NAME = 'Cart';
const COLLECTION = 'Carts';

const cartSchema = new Schema({
    cart_status: {
        type: String, required: true,
        enum: ['active', 'complete', 'failed', 'pending'],
        default: 'active'
    },
    cart_proudcts: {
        type: Array,
        required: true,
        default: []
    },
    cart_count_products: {
        type: Number,
        required: true,
        default: 0
    },
    cart_userId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
    },
}, { 
    timestamps: true,
    collection: COLLECTION
});

module.exports = model(DOCUMENT_NAME, cartSchema);