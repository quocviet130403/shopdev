'use strict';

const shopModel = require("../models/shop.model");

class ShopService {
    async findByEmail(email) {
        const email = await shopModel.findOne({email: email}).lean();
        return email ? email : null;
    }
}

module.exports = new ShopService();