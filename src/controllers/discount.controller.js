'use strict'

const { Created, Ok } = require("../core/success.error");
const discountService = require("../services/discount.service");

class DiscountController {
    async createDiscountCode() {
        new Created({ 
            message: 'Discount Created Successfully', 
            metadata: await discountService.createDiscountCode(req.body) 
        }).send(res)
    }

    async findAllDiscountCodeWithProduct() {
        new Ok({ 
            message: 'Discount Found', 
            metadata: await discountService.findAllDiscountCodeWithProduct(req.query) 
        }).send(res)
    }

    async findAllDiscountCode() {
        new Ok({ 
            message: 'Discount Found', 
            metadata: await discountService.findAllDiscountCode(req.query) 
        }).send(res)
    }
}

module.exports = new DiscountController();