'use strict'

const { NotFoundError } = require("../core/error.response")
const HEADER = require("../core/headers")
const { Created, Ok } = require("../core/success.error")
const accessService = require("../services/access.service")

class AccessController {
    signUp = async (req, res) => {
        new Created({ 
            message: 'User created', 
            metadata: await accessService.signUp(req.body) 
        }).send(res)
    }

    login = async (req, res) => {
        new Ok({ 
            message: 'User logged', 
            metadata: await accessService.login(req.body) 
        }).send(res)
    }

    logout = async (req, res) => {
        new Ok({ 
            message: 'User logged out', 
            metadata: await accessService.logout(req.keyStore) 
        }).send(res)
    }

    refreshToken = async (req, res) => {
        const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
        const userId = req.headers[HEADER.CLIENT_ID];

        if (!userId || !refreshToken) throw new NotFoundError('Missed params headers');

        new Ok({
            message: 'Refresh token',
            metadata: await accessService.refreshToken(userId, refreshToken)
        }).send(res)
    }
}

module.exports = new AccessController