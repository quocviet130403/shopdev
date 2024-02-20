'use strict'

const { Created, Ok } = require("../core/success.error");
const discountService = require("../services/discount.service");

class DiscountController {
    async createDiscountCode() {
        new Created({ 
            message: 'Discount Created Successfully', 
            metadata: await discountService.createDiscountCode({
                shopId: req.userId,
                ...req.body
            }) 
        }).send(res)
    }

    async findAllDiscountCodeWithProduct() {
        new Ok({ 
            message: 'Discount Found', 
            metadata: await discountService.findAllDiscountCodeWithProduct({
                shopId: req.userId,
                ...req.query
            }) 
        }).send(res)
    }

    async findAllDiscountCode() {
        new Ok({ 
            message: 'Discount Found', 
            metadata: await discountService.findAllDiscountCode({
                shopId: req.userId,
                ...req.query
            }) 
        }).send(res)
    }

    async getDiscoundAmount() {
        new Ok({ 
            message: 'Discount Amount', 
            metadata: await discountService.getDiscoundAmount({
                shopId: req.userId,
                ...req.body
            }) 
        }).send(res)
    }

    async deleteDiscountCode() {
        new Ok({ 
            message: 'Discount Deleted', 
            metadata: await discountService.deleteDiscountCode({
                shopId: req.userId,
                ...req.body
            }) 
        }).send(res)
    }

    async cancelDiscountCode () {
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