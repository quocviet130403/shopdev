'use strict'

const express = require('express');
const asynHandler = require('../../helpers/asynHandler');
const { authentication } = require('../../auth/authUltils');
const discountController = require('../../controllers/discount.controller');
const router = express.Router()

router.get('/all', asynHandler(discountController.findAllDiscountCode));

router.use(authentication);

router.post('/create', asynHandler(discountController.createDiscountCode));
router.post('/product', asynHandler(discountController.findAllDiscountCodeWithProduct));
router.post('/get-amount', asynHandler(discountController.getDiscoundAmount));
router.post('/delete', asynHandler(discountController.deleteDiscountCode));
router.post('/cancel', asynHandler(discountController.cancelDiscountCode));

module.exports = router 