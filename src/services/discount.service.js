'use strict'

const { BadRequest } = require("../core/error.response");
const discountModeldiscountModel = require("../models/discount.model");
const ProductRepository = require("../models/repositories/product.repo");
const DiscountRepository = require("../models/repositories/discount.repo");

class DiscountService {
    async createDiscountCode({
        name, description, type, value, code, start_date, end_date,
        max_uses, uses_count, max_uses_per_user, min_order_value, shopId, is_active,
        applies_to, product_ids
    }) {
        if (new Date() < new Date(start_date) || new Date() > new Date(end_date)) {
            throw new BadRequest({ message: 'Invalid date range' });
        }

        if (new Date(start_date) <= new Date(end_date)) {
            throw new BadRequest({ message: 'Invalid date range' });
        }

        const discountExist = await DiscountRepository.findOneDiscountCode({ discount_code: code, discount_shopId: shopId })
        if (discountExist) throw new BadRequest({ message: 'Discount code already exist' });

        const discount = new discountModel({
            discount_name: name,
            discount_description: description,
            discount_type: type,
            discount_value: value,
            discount_code: code,
            discount_start_date: new Date(start_date),
            discount_end_date: new Date(end_date),
            discount_max_uses: max_uses,
            discount_uses_count: uses_count,
            discount_max_uses_per_user: max_uses_per_user,
            discount_min_order_value: min_order_value || 0,
            discount_shopId: shopId,
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to === 'all' ? product_ids : []
        });

        return discount
    }

    async findAllDiscountCodeWithProduct ({
        code, shopId, limit, page
    }) {
        const discount = await DiscountRepository.findOneDiscountCode({
            discount_code: code,
            discount_shopId: shopId
        }).lean();

        if (!discount) throw new BadRequest({ message: 'Discount code not found' });
        const { discount_applies_to,  discount_product_ids} = discount;
        let products = {};
        
        if (discount_applies_to === 'all') {
            products = await ProductRepository.findAllProduct({
                filter: { 
                    isPublished: true,
                    product_shop: shopId
                },
                limit,
                page,
                sort: 'ctime'
            });
        }

        if (discount_applies_to === 'specific') {
            products = await ProductRepository.findAllProduct({
                filter: { 
                    isPublished: true,
                    product_shop: shopId,
                    $in: { _id: discount_product_ids }
                },
                limit,
                page,
                sort: 'ctime'
            });
        }

        return products
    }

    async findAllDiscountCode ({
        shopId, limit = 50, page = 1, sort = 'ctime', filter
    }) {
        page = (page - 1) * limit
        sort = sort === 'ctime' ? {_id: 1} : {_id: -1}
        return await DiscountRepository.fillAllDiscountCodeUnSelect({
            limit, sort, page, 
            filter: {
                discount_shopId: shopId,
                discount_is_active: true,
                ...filter
            }, 
            select: ['__v', 'discount_shopId']
        });
    }

    async getDiscoundAmount ({
        code, shopId, products
    }) {
        const discount = await DiscountRepository.findOneDiscountCode({
            discount_code: code,
            discount_shopId: shopId
        });

        if (!discount) throw new BadRequest({ message: 'Discount code not found' });
        if (!discount.discount_is_active) throw new BadRequest({ message: 'Discount code is not active' });
        if (!discount.discount_max_uses) throw new BadRequest({ message: 'Discount code is not active' });

        if (new Date() < discount.discount_start_date || new Date() > discount.discount_end_date) {
            throw new BadRequest({ message: 'Discount code is not active' });
        }

        if (discount.discount_max_uses_per_user > 0) {
            const userUsed = discount.discount_users_used.find(user => user === shopId);
            if (userUsed) throw new BadRequest({ message: 'User used discount code' });
        }

        const totalAmount = products.reduce((acc, product) => acc + product.product_price, 0);
        if (discount.discount_min_order_value > total) throw new BadRequest({ message: 'Discount code is not active' });

        const discountAmount = discount.discount_type === 'fixed_amount' ? discount.discount_value : (totalAmount * discount.discount_value) / 100;

        // update discount
        await discountModel.findByIdAndUpdate(discount._id, {
            discount_uses_count: discount.discount_uses_count + 1,
            discount_users_used: [...discount.discount_users_used, shopId]
        });

        return {
            'amount': totalAmount,
            'discount_amount': discountAmount,
            'total_amount': totalAmount - discountAmount
        }
    }

    async deleteDiscountCode ({
        code, shopId
    }) {
        const discount = await DiscountRepository.findOneDiscountCode({
            discount_code: code,
            discount_shopId: shopId
        });

        if (!discount) throw new BadRequest({ message: 'Discount code not found' });

        return await discountModel.deleteOne({ _id: discount._id });
    }

    async cancelDiscountCode ({
        code, shopId
    }) {
        const discount = await DiscountRepository.findOneDiscountCode({
            discount_code: code,
            discount_shopId: shopId
        });        

        if (!discount) throw new BadRequest({ message: 'Discount code not found' });

        const result = await discountModel.findByIdAndUpdate(discount._id, {
            $pull: { discount_users_used: shopId },
            $inc: { discount_uses_count: -1 }
        });

        return result;
    }
}

module.exports = new DiscountService();