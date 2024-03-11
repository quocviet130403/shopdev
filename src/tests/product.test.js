'use strict'

const redisPubSubService = require('../services/redisPubSub.service')

class ProductTestService {
    purchaseProduct(product) {
        redisPubSubService.publish('product_purchased', product)
    }
}

module.exports = new ProductTestService()