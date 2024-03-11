'use strict'

const redisPubSubService = require('../services/redisPubSub.service')

class InventoryTestService {
    constructor() {
        redisPubSubService.subscribe('product_purchased', (message) => {
            this.updateProduct(message)
        })
    }
    async updateProduct(product) {
        console.log(`Product purchased: ${product}`)
    }
}

module.exports = new InventoryTestService()