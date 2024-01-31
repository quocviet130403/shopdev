'use strict'

const express = require('express');
const asynHandler = require('../../helpers/asynHandler');
const { authentication } = require('../../auth/authUltils');
const productController = require('../../controllers/product.controller');
const router = express.Router()

router.use(authentication);

router.post('/create', asynHandler(productController.createProduct));
router.get('/drafts/all', asynHandler(productController.getAllDraftsForShop));
router.get('/published/all', asynHandler(productController.getAllPublishedForShop));
router.get('/search/:searchKey', asynHandler(productController.searchProduct))

router.put('/draft/:id', asynHandler(productController.draftProductShop));
router.put('/published/:id', asynHandler(productController.publishedProductShop));

module.exports = router 