'use strict';

const shopModel = require("../models/shop.model");

class ShopService {
    async findByEmail(email) {
        const shop = await shopModel.findOne({email: email}).lean();
        return shop ? shop : null;
    }
}

module.exports = new ShopService();