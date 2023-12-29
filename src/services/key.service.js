'use strict'

const keytokenModel = require("../models/keytoken.model")

class KeyService {
    async createKeyToken({userId, publicKey}) {
        try {
            const publicKeyString = publicKey.toString()
            const tokens = await keytokenModel.create({
                user: userId,
                publicKey: publicKeyString
            })
            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }
}

module.exports = new KeyService