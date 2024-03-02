'use strict';

const apiKeyModel = require("../models/apiKey.model");

class ApiKeyService {
    async getApiKey(key) {
        const apiKey = await apiKeyModel.find({key: key}).lean();
        return apiKey ? apiKey : null;
    }
}

module.exports = new ApiKeyService();