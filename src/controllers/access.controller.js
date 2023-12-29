'use strict'

const accessService = require("../services/access.service")

class AccessController {
    signUp = async (req, res, next) => {
        try {
            const result = await accessService.signUp(req.body)
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AccessController