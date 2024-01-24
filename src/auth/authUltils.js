'use strict';
const jwt = require('jsonwebtoken');

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

module.exports = {
    createTokenPair
}