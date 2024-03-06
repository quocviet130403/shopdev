'use strict'

const { Ok } = require("../core/success.error")
const cartService = require("../services/cart.service")

class CartController {
    async addToCart(req, res, next) {
        new Ok({ 
            message: 'Add Cart Success', 
            metadata: await cartService.addToCart({
                userId: req.userId,
                ...req.body
            }) 
        }).send(res)
    }

    async deleteUserCart(req, res, next) {
        new Ok({ 
            message: 'Delete Product Success', 
            metadata: await cartService.deleteUserCart({
                userId: req.userId,
                ...req.body
            }) 
        }).send(res)
    }

    async getCart(req, res, next) {
        new Ok({ 
            message: 'Get Cart Success', 
            metadata: await cartService.getCart(req.userId) 
        }).send(res)
    }
}

module.exports = new CartController()