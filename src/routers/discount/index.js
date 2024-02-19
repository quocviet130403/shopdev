'use strict'

const express = require('express');
const asynHandler = require('../../helpers/asynHandler');
const { authentication } = require('../../auth/authUltils');
const discountController = require('../../controllers/discount.controller');
const router = express.Router()

router.get('/all', asynHandler(discountController.findAllDiscountCode));

router.use(authentication);

router.post('/create', asynHandler(discountController.createDiscountCode));
router.get('/product', asynHandler(discountController.findAllDiscountCodeWithProduct));

module.exports = router 