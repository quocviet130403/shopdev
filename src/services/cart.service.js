'use strict'

const cartModel = require('../models/cart.model')
const cartRepository = require('../models/repositories/cart.repo')
const { BadRequest } = require("../core/error.response");
const productModel = require('../models/product.model');
const productRepo = require('../models/repositories/product.repo');

class CartService {
    async updateUserCartQuatity({userId, product}) {
        const { productId, quatity } = product 
        const query = {
            cart_userId: userId,
            'cart_products.productId': productId,
            cart_state: 'active'
        }, updateSet = {
            'cart_products.$.quatity': quatity
        }, options = { upsert: true, new: true }

        return await cartModel.findOneAndUpdate(query, updateSet, options)
    }

    async addToCart ({userId, product}) {

        if (!product.Id) throw new NotFoundError('Not Found Product.')
        const productExist = await productRepo.findOneProduct({product_id: product.Id, select: ["_id"]})
        if (!productExist) throw new NotFoundError('Not Found Product.')

        const cart = await cartRepository.findById(userId)
        if (!cart) return await cartRepository.create({userId, product})

        if (cart.cart_state !== 'active') throw new BadRequest('Cart Not Active.')
        const ExistProductInCart = cart.cart_products.findIndex(p => p.productId == product.Id)
        
        if (!cart.cart_products.length || ExistProductInCart !== -1) {
            cart.cart_products = [...cart.cart_products, product]
            return await cart.save()
        }

        return this.updateUserCartQuatity({userId, product})
    }

    async deleteUserCart({userId, productId}) {
        const query = {
            cart_userId: userId,
            cart_state: 'active'
        }, updateSet = {
            $pull: {
                cart_products: {
                    productId
                }
            }
        }

        const deleteCart = await cartModel.updateOne(query, updateSet)
        return deleteCart
    }

    async getCart(userId) {
        return await cartModel.findOne({
            cart_userId: userId,
            cart_state: 'active'
        }).lean()
    }
}

module.exports = new CartService