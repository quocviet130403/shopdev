'use strict'

const { BadRequest } = require("../core/error.response");
const { product, clothing, electronic } = require("../models/product.model");
const ProductRepository = require("../models/repositories/product.repo")

class ProductFactory {

    static listProductRegister = {}

    static registerProduct(type, product) {
        ProductFactory.listProductRegister[type] = product
    }

    async createProduct(type, payload) {
        const Product = ProductFactory.listProductRegister[type]
        if (!Product) throw new BadRequest('Product type not found.')

        return await new Product(payload).createProduct()
    }

    async getAllDraftsForShop(product_shop) {
        return await ProductRepository.getAllDraftsForShop({ query: { isDraft: true, product_shop }})
    }

    async getAllPublishedForShop(product_shop) {
        return await ProductRepository.getAllPublishedForShop({ query: { isPublished: true, product_shop }})
    }

    async publishedProductShop(product_id, product_shop) {
        return await ProductRepository.publishProductShop({ _id: product_id, product_shop })
    }

    async draftProductShop(product_id, product_shop) {
        return await ProductRepository.draftProductShop({ _id: product_id, product_shop })
    }

    async searchProduct(searchKey, product_shop) {
        return await ProductRepository.searchProduct({searchKey, product_shop})
    }
}

class Product {
    constructor({
        product_name,
        product_thumbnail,
        product_description,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_attributes
    }) {
        this.product_name = product_name;
        this.product_thumbnail = product_thumbnail;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;
    }

    async createProduct(product_id) {
        return await product.create({
            ...this,
            _id: product_id
        })
    }
}

class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if (!newClothing) throw new BadRequest('Create clothing failed.')

        const newProduct = super.createProduct(newClothing._id)
        if (!newProduct) throw new BadRequest('Create product failed.')

        return newProduct
    }
}

class Electronics extends Product {
    async createProduct() {

        const newElectronic = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if (!newElectronic) throw new BadRequest('Create electronic failed.')
        const newProduct = super.createProduct(newElectronic._id)
        if (!newProduct) throw new BadRequest('Create product failed.')

        return newProduct
    }
}

ProductFactory.registerProduct('Clothing', Clothing)
ProductFactory.registerProduct('Electronics', Electronics)

module.exports = new ProductFactory();