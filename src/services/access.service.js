'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')

const roleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITER: 'EDITER',
    ADMIN: 'ADMIN'
};

class AccessService {
    async signUp(name, email, password) {
        try {
            const shop = await shopModel.findOne({email: email}).lean()

            if (shop) {
                return {
                    code: 403,
                    messange: 'Email Exist!!!'
                }
            }

            const hashPassword = bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name, email, hashPassword, roles: [roleShop.SHOP]
            })

            if (newShop) {
                
            }
        } catch (error) {
            return {
                code: 500,
                messange: 'Email Exist!!!'
            }
        }
    }
}

module.exports = new AccessService