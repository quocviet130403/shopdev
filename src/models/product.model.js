'use strict'

const {Schema, model} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Product';
const COLLECTION = 'Products';
const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_thumbnail: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    product_type: {
        type: String,
        required: true,
        enum: ['Clothing', 'Electronics', 'Funiture']
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
    },
    product_attributes: {
        type: Schema.Types.Mixed,
        required: true
    }
}, {
    timestamps: true,
    collection: COLLECTION
});

const clothingSchema = new Schema({
    size: {
        type: String,
        required: true,
        enum: ['S', 'M', 'L', 'XL']
    },
    brand: {
        type: String,
        required: true
    },
    material: String
});

const electronicsSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    material: String
});

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model('Clothing', clothingSchema),
    electronic: model('Electronics', electronicsSchema),
};