'use strict'

const keytokenModel = require("../models/keytoken.model")

class KeyService {
    async createKeyToken({userId, publicKey, refreshToken, refreshTokenUsed}) {
        try {
            const publicKeyString = publicKey.toString()
            const filter = {user: userId}, update = {
                publicKey: publicKeyString,
                refreshToken,
                $push: { refreshTokenUsed: refreshTokenUsed }
            }, options = {upsert: true, new: true}
            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null
        } catch (error) {
            throw error
        }
    }

    async findByUserId(userId) {
        try {
            const keyStore = await keytokenModel.findOne({user: userId})
            return keyStore ? keyStore : null
        } catch (error) {
            throw error
        }
    }

    async findByRefreshToken(refreshToken) {
        try {
            const keyStore = await keytokenModel.findOne({refreshToken: refreshToken})
            return keyStore ? keyStore : null
        } catch (error) {
            throw error
        }
    }

    async checkRefreshTokenUsed (refreshToken) {
        try {
            const keyStore = await keytokenModel.findOne({refreshTokenUsed: refreshToken})
            return keyStore ? keyStore.refreshTokenUsed : null
        } catch (error) {
            throw error
        }
    }

    async removeRefreshToken(refreshToken) {
        try {
            const keyStore = await keytokenModel.deleteOne({refreshToken: refreshToken})
            return keyStore ? keyStore : null
        } catch (error) {
            throw error
        }
    }
}

module.exports = new KeyService