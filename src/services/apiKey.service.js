'use strict';

const apiKeyModel = require("../models/apiKey.model");

class ApiKeyService {
    async getApiKey(apiKey) {
        const apiKey = await apiKeyModel.find({key: apiKey}).lean();
        return apiKey ? apiKey : null;
    }
}

module.exports = new ApiKeyService();