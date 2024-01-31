'use strict'

const { Created } = require("../core/success.error")
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
}

module.exports = new ProductController()