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
        await jwt.verify(accessToken, publicKey).then(() => {
            console.log('verify access token success');
        }).catch((error) => {
            console.log('verify access token error', error);
        });
        return {
            accessToken,
            refreshToken
        };
    } catch (error) {
        return error
    }
}

module.exports = {
    createTokenPair
}