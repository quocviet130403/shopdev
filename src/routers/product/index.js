'use strict'

const express = require('express');
const asynHandler = require('../../helpers/asynHandler');
const { authentication } = require('../../auth/authUltils');
const productController = require('../../controllers/product.controller');
const router = express.Router()

router.use(authentication);

router.post('/create', asynHandler(productController.createProduct));

module.exports = router 