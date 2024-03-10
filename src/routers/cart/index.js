'use strict'

const express = require('express');
const asynHandler = require('../../helpers/asynHandler');
const { authentication } = require('../../auth/authUltils');
const cartController = require('../../controllers/cart.controller');
const router = express.Router()

router.use(authentication);

router.get('/all', asynHandler(cartController.getCart));
router.post('/add-to-cart', asynHandler(cartController.addToCart));
router.post('/delete', asynHandler(cartController.deleteUserCart));

module.exports = router 