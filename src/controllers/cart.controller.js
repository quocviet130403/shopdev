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

    // async delete 
}

module.exports = new CartController()