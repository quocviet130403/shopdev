'use strict'

const express = require('express');
const asynHandler = require('../../helpers/asynHandler');
const { authentication } = require('../../auth/authUltils');
const productController = require('../../controllers/product.controller');
const router = express.Router()

router.get('/search/:searchKey', asynHandler(productController.searchProduct))
router.get('/all', asynHandler(productController.findAllProduct))
router.get('/:id', asynHandler(productController.findOneProduct))

router.use(authentication);

router.post('/create', asynHandler(productController.createProduct));
router.patch('/:id', asynHandler(productController.updateProduct));
router.get('/drafts/all', asynHandler(productController.getAllDraftsForShop));
router.get('/published/all', asynHandler(productController.getAllPublishedForShop));

router.put('/draft/:id', asynHandler(productController.draftProductShop));
router.put('/published/:id', asynHandler(productController.publishedProductShop));

module.exports = router 