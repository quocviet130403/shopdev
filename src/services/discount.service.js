'use strict'

const { BadRequest } = require("../core/error.response");
const discountModel = require("../models/discount.model");
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

        const discountExist = await discountModel.findOne({ discount_code: code, discount_shopId: shopId }).lean();
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
        const discount = await discountModel.findOne({
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
}

module.exports = new DiscountService();