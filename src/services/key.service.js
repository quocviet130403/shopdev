'use strict'

const keytokenModel = require("../models/keytoken.model")

class KeyService {
    async createKeyToken({userId, publicKey, refreshToken}) {
        try {
            const publicKeyString = publicKey.toString()
            // const tokens = await keytokenModel.create({
            //     user: userId,
            //     publicKey: publicKeyString
            // })
            // return tokens ? tokens.publicKey : null

            const filter = {user: userId}, update = {
                publicKey: publicKeyString, refreshToken, refreshTokenUsed: []
            }, options = {upsert: true, new: true}
            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }
}

module.exports = new KeyService