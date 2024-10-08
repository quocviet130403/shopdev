'use strict'

const {Schema, model} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Role';
const COLLECTION = 'Roles';

const roleSchema = new Schema({
    rol_name: { type: String, default: 'user', enum: ['user', 'shop', 'admin'] },
    rol_slug: { type: String, required: true },
    rol_status: { type: String, default: 'active', enum: ['active', 'block', 'pending'] },
    rol_description: {type: String, default: ""},
    rol_grants: [
        {
            resource: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
            action: {type: String, required: true},
            attributes: {type: String, default: '*'},
        }
    ]
}, { 
    timestamps: true,
    collection: COLLECTION
});

module.exports = model(DOCUMENT_NAME, roleSchema);