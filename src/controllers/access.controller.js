'use strict'

const accessService = require("../services/access.service")

class AccessController {
    signUp = async (req, res, next) => {
        try {
            const {name, email, password} = req.body
            const result = await accessService.signUp(name, email, password)

            if (result.code !== 200) {
                return {
                    code: '500',
                    messange: 'error'
                }
            }

            return {
                code: 200,
                messange: 'success'
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AccessController