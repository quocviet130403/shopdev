'use strict';

const apiKeyService = require("../services/apiKey.service");

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    const apiKey = req.headers[HEADER.API_KEY]?.toString();
    if (!apiKey) {
        return res.status(403).json({
            message: 'Forbidden Error'
        });
    }
    const objKey = await apiKeyService.getApiKey(apiKey);
    if (!objKey) {
        return res.status(403).json({
            message: 'Forbidden Error'
        });
    }
    req.objKey = objKey;
    return next();
}

const perrmission = async (perrmission) => {
    return (req, res, next) => {
        const permissions = req.objKey.permissions;
        if (!req.objKey.permissions || !permissions.includes(perrmission)) {
            return res.status(403).json({
                message: 'Forbidden Error'
            });
        }
        return next();
    }
}

module.exports = {
    apiKey,
    perrmission
};