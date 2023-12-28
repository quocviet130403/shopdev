'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Shop';
const COLLECTION = 'Shops';
var shopSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:true,
        maxLength: 150
    },
    email:{
        type:String,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    verify: {
        type: Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, shopSchema);