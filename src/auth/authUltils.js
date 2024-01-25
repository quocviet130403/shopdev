'use strict';
const jwt = require('jsonwebtoken');
const asynHandler = require('../helpers/asynHandler');
const { NotFoundError, AuthFailed } = require('../core/error.response');
const keyService = require('../services/key.service');
const HEADER = require('../core/headers');

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        });
        const refreshToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        });
        // const verifyToken = await jwt.verify(accessToken, publicKey);
        return {
            accessToken,
            refreshToken
        };
    } catch (error) {
        return error;
    }
}

const authentication = asynHandler(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    const authorization = req.headers[HEADER.AUTHORIZATION];

    if (!userId || !authorization) throw new NotFoundError('Missed params headers');

    const keyStore = await keyService.findByUserId(userId);
    if (!keyStore) throw new AuthFailed('Invalid Token');

    try {
        const decodeShop = await jwt.verify(authorization, keyStore.publicKey);
        if (decodeShop && decodeShop.userId !== userId) throw new AuthFailed('Invalid User')
        req.keyStore = keyStore;
        return next();
    } catch (error) {
        throw new AuthFailed('Invalid Token');
    }
})

module.exports = {
    createTokenPair,
    authentication
}