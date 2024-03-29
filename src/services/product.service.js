'use strict'

const { BadRequest } = require("../core/error.response");
const { product, clothing, electronic } = require("../models/product.model");
const ProductRepository = require("../models/repositories/product.repo");
const { removeUndefinedObject, updateNestedObjectParser } = require("../utils");

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

    async updateProduct(product_id, payload) {
        const productExist = await product.findOne({_id: product_id})
        if (!productExist) throw new BadRequest('Product not found.')
        
        const Product = ProductFactory.listProductRegister[productExist.product_type]
        if (!Product) throw new BadRequest('Product type not found.')

        return await new Product(payload).updateProduct(product_id)
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

    async searchProduct(searchKey) {
        return await ProductRepository.searchProduct({searchKey, select: ['product_name', 'product_slug', 'product_thumbnail', 'product_price']})
    }

    async findAllProduct({ limit = 50, sort = 'ctime', page = 1, filter = {isPublished: true} }) {
        page = (page - 1) * limit
        sort = sort === 'ctime' ? {_id: 1} : {_id: -1}
        return await ProductRepository.findAllProduct(
            {limit, sort, page, filter, select: ['product_name', 'product_slug', 'product_thumbnail', 'product_price']}
        )
    }

    async findOneProduct(product_id) {
        return await ProductRepository.findOneProduct({product_id, select: ['__v']})
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

    async updateProduct(product_id) {
        return ProductRepository.updateProduct(product_id, updateNestedObjectParser(this), product)
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

    async updateProduct(product_id) {
        const dataUpdate = updateNestedObjectParser(this)
        if (dataUpdate.product_attributes) {
            const clothingUpdate = ProductRepository.updateProduct(product_id, dataUpdate.product_attributes, clothing)
            if (!clothingUpdate) throw new BadRequest('Update clothing failed.')
        }
        const updatedProduct = await super.updateProduct(product_id)
        if (!updatedProduct) throw new BadRequest('Update product failed.')

        return clothing
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

    async updateProduct(product_id) {
        const dataUpdate = this
        if (dataUpdate.product_attributes) {
            const electronicUpdate = ProductRepository.updateProduct(product_id, dataUpdate.product_attributes, electronic)
            if (!electronicUpdate) throw new BadRequest('Update electronic failed.')
        }
        const updatedProduct = await super.updateProduct(product_id)
        if (!updatedProduct) throw new BadRequest('Update product failed.')

        return updatedProduct
    }
}

ProductFactory.registerProduct('Clothing', Clothing)
ProductFactory.registerProduct('Electronics', Electronics)

module.exports = new ProductFactory();