'use strict'

const express = require('express');
const asynHandler = require('../../helpers/asynHandler');
const { authentication } = require('../../auth/authUltils');
const cartController = require('../../controllers/cart.controller');
const router = express.Router()

router.use(authentication);

router.post('/create', asynHandler(cartController.addToCart));

module.exports = router 