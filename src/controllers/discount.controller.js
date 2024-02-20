'use strict'

const { Created, Ok } = require("../core/success.error");
const discountService = require("../services/discount.service");

class DiscountController {
    async createDiscountCode(req, res, next) {
        new Created({ 
            message: 'Discount Created Successfully', 
            metadata: await discountService.createDiscountCode({
                shopId: req.userId,
                ...req.body
            }) 
        }).send(res)
    }

    async findAllDiscountCodeWithProduct(req, res, next) {
        new Ok({ 
            message: 'Discount Found', 
            metadata: await discountService.findAllDiscountCodeWithProduct(req.body) 
        }).send(res)
    }

    async findAllDiscountCode(req, res, next) {
        new Ok({ 
            message: 'Discount Found', 
            metadata: await discountService.findAllDiscountCode(req.query) 
        }).send(res)
    }

    async getDiscoundAmount(req, res, next) {
        new Ok({ 
            message: 'Discount Amount', 
            metadata: await discountService.getDiscoundAmount({
                shopId: req.userId,
                ...req.body
            }) 
        }).send(res)
    }

    async deleteDiscountCode(req, res, next) {
        new Ok({ 
            message: 'Discount Deleted', 
            metadata: await discountService.deleteDiscountCode({
                shopId: req.userId,
                ...req.body
            }) 
        }).send(res)
    }

    async cancelDiscountCode (req, res, next) {
        new Ok({ 
            message: 'Discount Cancelled', 
            metadata: await discountService.cancelDiscountCode({
                shopId: req.userId,
                ...req.body
            }) 
        }).send(res)
    }
}

module.exports = new DiscountController();