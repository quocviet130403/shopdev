'use strict'

const {Schema, model} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Resource';
const COLLECTION = 'Resources';

const resourceSchema = new Schema({
    src_name: { type: String, required: true },
    src_slug: { type: String, required: true },
    src_description: { type: String, default: "" },
}, { 
    timestamps: true,
    collection: COLLECTION
});

module.exports = model(DOCUMENT_NAME, resourceSchema);