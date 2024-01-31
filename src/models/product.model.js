'use strict'

const {Schema, model} = require('mongoose'); // Erase if already required
const slugify = require('slugify');

const DOCUMENT_NAME = 'Product';
const COLLECTION = 'Products';
const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_slug: {
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
    },
    product_rating: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must can not be more than 5'],
        set: val => Math.round(val * 5) / 5
    },
    isDraft: {
        type: Boolean,
        default: true,
        index: true,
        select: false
    },
    isPublished: {
        type: Boolean,
        default: false,
        index: true,
        select: false
    },
}, {
    timestamps: true,
    collection: COLLECTION
});

// Indexes
// productSchema.index({product_name: 'text', product_description: 'text'})

// Action after save
productSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, {lower: true})
    next()
})

const clothingSchema = new Schema({
    size: {
        type: String,
        required: true,
        enum: ['S', 'M', 'L', 'XL']
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
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
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
    },
    material: String
});

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model('Clothing', clothingSchema),
    electronic: model('Electronics', electronicsSchema),
};