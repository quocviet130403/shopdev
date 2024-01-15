'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const { getInfoData } = require("../utils");
const { createTokenPair } = require("../auth/authUltils");
const keyService = require("./key.service");
const { ConflictError, ExsistError, CreatedFailError, NotFoundError } = require("../core/error.response");
const shopService = require("./shop.service");

const roleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITER: 'EDITER',
    ADMIN: 'ADMIN'
};

class AccessService {
    async login({email, password}) {
        const shop = await shopService.findByEmail(email);
        if (!shop) {
            throw new NotFoundError('Email not found!!!')
        }

        const match = await bcrypt.compare(password, shop.password);
        if (!match) throw new ConflictError('Password not match!!!')

        const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem',
            }
        })

        const publicKeyString = publicKey.toString()
        const publicKeyObject = await crypto.createPublicKey(publicKey.toString())

        const tokens = await createTokenPair({userId: shop._id, email}, publicKeyObject, privateKey)

        await keyService.createKeyToken({
            userId: shop._id,
            publicKey: publicKeyString,
            refreshToken: tokens.refreshToken,
        })

        return {
            code: 200,
            messange: 'Login Success!!!',
            metadata: {
                shop: getInfoData({fileds: ['_id', 'name', 'email'], object: shop}),
                tokens
            }
        }

    }

    async signUp({name, email, password}) {
        const shop = await shopModel.findOne({email: email}).lean()

        if (shop) {
            throw new ExsistError('Email already exists!!!')
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newShop = await shopModel.create({
            name, email, password: hashPassword, roles: [roleShop.SHOP]
        })

        if (newShop) {
            const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem',
                }
            })

            const publicKeyString = await keyService.createKeyToken({
                userId: newShop._id,
                publicKey: publicKey
            })

            if (!publicKeyString) {
                new CreatedFailError('Create KeyToken Fail!!!')
            }

            const publicKeyObject = await crypto.createPublicKey(publicKeyString)

            const tokens = await createTokenPair({userId: newShop._id, email}, publicKeyObject, privateKey)

            return {
                code: 200,
                messange: 'Sign Up Success!!!',
                metadata: {
                    shop: getInfoData({fileds: ['_id', 'name', 'email'], object: newShop}),
                    tokens
                }
            }
        }
    }
}

module.exports = new AccessService