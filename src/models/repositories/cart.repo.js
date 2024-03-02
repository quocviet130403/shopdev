'use strict'

const cartModel = require("../cart.model")

class CartRepository {
    async create({ userId, product }) {
        return await cartModel.create({
            cart_userId: userId, 
            cart_proudtcs: [product]
        })
    }

    async findById(userId) {
        return await cartModel.findOne({ cart_userId: userId }).lean()
    }

    async findOneAndUpdate({ query, update, options }) {
        const cart = cartModel.find(query)
        
    }
}

module.exports = new CartRepository()