'use strict'

const { Created, Ok } = require("../core/success.error")
const productService = require("../services/product.service")

class ProductController {
    async createProduct(req, res, next) {
        new Created({ 
            message: 'Product Created Successfully', 
            metadata: await productService.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.userId
            }) 
        }).send(res)
    }

    async getAllDraftsForShop(req, res, next) {
        new Ok({ 
            message: 'Get All Drafts Successfully', 
            metadata: await productService.getAllDraftsForShop(req.userId) 
        }).send(res)
    }

    async getAllPublishedForShop(req, res, next) {
        new Ok({ 
            message: 'Get All Published Successfully', 
            metadata: await productService.getAllPublishedForShop(req.userId) 
        }).send(res)
    }

    async publishedProductShop(req, res, next) {
        new Ok({ 
            message: 'Published Product Successfully', 
            metadata: await productService.publishedProductShop(req.params.id, req.userId) 
        }).send(res)
    }

    async draftProductShop(req, res, next) {
        new Ok({ 
            message: 'Draft Product Successfully', 
            metadata: await productService.draftProductShop(req.params.id, req.userId) 
        }).send(res)
    }

    async searchProduct(req, res, next) {
        new Ok({ 
            message: 'Search Product Successfully', 
            metadata: await productService.searchProduct(req.params.searchKey) 
        }).send(res)
    }

    async findAllProduct(req, res, next) {
        new Ok({ 
            message: 'Find All Product Successfully', 
            metadata: await productService.findAllProduct(req.query)
        }).send(res)
    }

    async findOneProduct(req, res, next) {
        new Ok({
            message: 'Find One Product Successfully',
            metadata: await productService.findOneProduct(req.params.id)
        }).send(res)
    }

    async updateProduct(req, res, next) {
        new Ok({
            message: 'Update Product Successfully',
            metadata: await productService.updateProduct(req.params.id, {
                ...req.body,
                product_shop: req.userId
            })
        }).send(res)
    }
}

module.exports = new ProductController()
