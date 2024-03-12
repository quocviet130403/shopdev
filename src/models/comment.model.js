'use strict'

const {Schema, model} = require('mongoose'); // Erase if already required
const slugify = require('slugify');

const DOCUMENT_NAME = 'Comment';
const COLLECTION = 'Comments';

const commnetSchema = new Schema({
    comment_productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    comment_userId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
    comment_content: {
        type: String,
        required: true
    },
    comment_right: {
        type: Number
    },
    comment_left: {
        type: Number
    },
    comment_parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    },
}, { 
    timestamps: true,
    collection: COLLECTION
});

module.exports = model(DOCUMENT_NAME, commnetSchema);