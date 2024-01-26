'use strict'

const { BadRequest } = require("../core/error.response");
const { product, clothing, electronic } = require("../models/product.model");

class ProductFactory {
    async createProduct(type, payload) {
        switch (type) {
            case 'clothing':
                return await new Clothing(payload).createProduct();
            case 'electronics':
                return await new Electronics(payload).createProduct();
            default:
                throw new Error('Product type not found.')
        }
    }
}

class Product {
    constructor(
        product_name,
        product_thumbnail,
        product_description,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_attributes
    ) {
        this.product_name = product_name;
        this.product_thumbnail = product_thumbnail;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;
    }

    async createProduct() {
        return await product.create(this)
    }
}

class Clothing extends Product {
    async createProduct() {
        const newClothing = clothing.create(this.product_attributes)
        if (!newClothing) throw new BadRequest('Create clothing failed.')

        const newProduct = super.createProduct()
        if (!newProduct) throw new BadRequest('Create product failed.')

        return newProduct
    }
}

class Electronics extends Product {
    async createProduct() {

        const newElectronic = electronic.create(this.product_attributes)
        if (!newElectronic) throw new BadRequest('Create electronic failed.')

        const newProduct = super.createProduct()
        if (!newProduct) throw new BadRequest('Create product failed.')

        return newProduct
    }
}

module.exports = new ProductFactory();