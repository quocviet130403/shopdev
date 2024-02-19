'use strict'

const { selectFields, unSelectFields } = require("../../utils");
const discountModel = require("../discount.model")

class DiscountRepository {

    async fillAllDiscountCodeSelect({limit, sort, page, filter, select}) {
        return await discountModel.find(filter)
                .sort(sort)
                .skip(page)
                .limit(limit)
                .select(selectFields(select))
                .lean()
    }

    async fillAllDiscountCodeUnSelect({limit, sort, page, filter, select}) {
        return await discountModel.find(filter)
                .sort(sort)
                .skip(page)
                .limit(limit)
                .select(unSelectFields(select))
                .lean()
    }
}

module.exports = new DiscountRepository();