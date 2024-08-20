'use strict'

const { AuthFailed } = require("../core/error.response");
const rbac = require("./role.middleware")

const grantAccess = (action, resource) => {
    return async (req, res, next) => {
        try {
            const rol_name = req.query.rol_name;
            const perrmission = rbac.can(rol_name)[action](resource)
            if (!perrmission.granted) {
                throw new AuthFailed("you don't perrmission")
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = grantAccess