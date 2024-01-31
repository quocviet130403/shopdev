const { product } = require("../product.model")

class ProductRepository {
    async getAllDraftsForShop ({query, limit = 50, skip = 0}) {
        return this.getAllProductsForShop({query, limit, skip})
    }

    async getAllPublishedForShop ({query, limit = 50, skip = 0}) {
        return this.getAllProductsForShop({query, limit, skip})
    }

    async getAllProductsForShop ({query, limit = 50, skip = 0}) {
        return await product.find(query)
                    .populate('product_shop', 'name email -_id')
                    .sort({ updateAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean()
                    .exec()
    }

    async publishProductShop ({ _id: product_id, product_shop }) {
        const productShop = await product.findOne({ _id: product_id, product_shop })
        if (!productShop) throw new BadRequest('Product not found.')

        productShop.isPublished = true
        productShop.isDraft = false

        const { modifiedCount } = await productShop.updateOne(productShop)

        return modifiedCount
    }

    async draftProductShop ({ _id: product_id, product_shop }) {
        const productShop = await product.findOne({ _id: product_id, product_shop })
        if (!productShop) throw new BadRequest('Product not found.')

        productShop.isPublished = false
        productShop.isDraft = true

        const { modifiedCount } = await productShop.updateOne(productShop)

        return modifiedCount
    }

    async searchProduct ({searchKey, product_shop}) {
        const regexSearch = new RegExp(searchKey)
        return await product.find({
            $text: { $search: regexSearch },
            isPublished: true,
            product_shop
        }, { score: { $meta: "textScore" }})
        .sort({ score: { $meta: "textScore" } })
        .lean()
    }
}

module.exports = new ProductRepository()