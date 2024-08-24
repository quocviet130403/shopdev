'use strict'

const {Schema, model} = require('mongoose'); // Erase if already required
const slugify = require('slugify');

const DOCUMENT_NAME = 'Discount';
const COLLECTION = 'Discounts';

const discountSchema = new Schema({
    discount_name: {
        type: String,
        required: true
    },
    discount_description: {
        type: String,
        required: true
    },
    discount_type: {
        type: String,
        default: 'fixed_amount',
    },
    discount_value: {
        type: Number,
        required: true
    },
    discount_code: {
        type: String,
        required: true
    },
    discount_start_date: {
        type: Date,
        required: true
    },
    discount_end_date: {
        type: Date,
        required: true
    },
    discount_max_uses: {
        type: Number,
        required: true
    }, // số lượng discount được áp dụng
    discount_users_used: {
        type: Array,
        default: [],
    }, // danh sách user đang sử dụng discount
    discount_uses_count: {
        type: Number,
        required: true,
        default: 0
    }, // số lượng discount đã sử dụng
    discount_max_uses_per_user: {
        type: Number,
        required: true
    }, // số lượng discount được áp dụng cho 1 user
    discount_min_order_value: {
        type: Number,
        default: 0
    }, // số tiền tối thiểu để áp dụng discount
    discount_shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
    },
    discount_is_active: {
        type: Boolean,
        default: true
    },
    discount_applies_to: {
        type: String,
        required: true,
        enum: ['all', 'spectific']
    },
    discount_product_ids: {
        type: Array,
        default: [],
    }, // số sản phẩm đuọc áp dụng
}, { 
    timestamps: true,
    collection: COLLECTION
});

module.exports = model(DOCUMENT_NAME, discountSchema);