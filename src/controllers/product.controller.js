'use strict'

const { Created } = require("../core/success.error")
const productService = require("../services/product.service")

class ProductController {
    async createProduct(req, res, next) {
        signUp = async (req, res) => {
            new Created({ 
                message: 'User created', 
                metadata: await productService.createProduct(req.body.type, req.body) 
            }).send(res)
        }
    }
}

module.exports = new ProductController()