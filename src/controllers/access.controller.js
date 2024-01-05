'use strict'

const accessService = require("../services/access.service")

class AccessController {
    signUp = async (req, res, next) => {
        const result = await accessService.signUp(req.body)
        return res.json(result)
    }
}

module.exports = new AccessController