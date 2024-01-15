'use strict'

const { Created } = require("../core/success.error")
const accessService = require("../services/access.service")

class AccessController {
    signUp = async (req, res, next) => {
        new Created({ 
            message: 'User created', 
            metadata: await accessService.signUp(req.body) 
        }).send(res)
    }

    login = async (req, res, next) => {
        new Created({ 
            message: 'User logged', 
            metadata: await accessService.login(req.body) 
        }).send(res)
    }
}

module.exports = new AccessController