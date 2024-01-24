'use strict'

const { Created } = require("../core/success.error")
const accessService = require("../services/access.service")

class AccessController {
    signUp = async (req, res) => {
        new Created({ 
            message: 'User created', 
            metadata: await accessService.signUp(req.body) 
        }).send(res)
    }

    login = async (req, res) => {
        new Created({ 
            message: 'User logged', 
            metadata: await accessService.login(req.body) 
        }).send(res)
    }

    logout = async (req, res) => {
        new Created({ 
            message: 'User logged out', 
            metadata: await accessService.logout(req.keyStore) 
        }).send(res)
    }
}

module.exports = new AccessController