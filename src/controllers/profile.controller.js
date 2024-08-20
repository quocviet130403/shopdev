'use strict'

const { Created, Ok } = require("../core/success.error")
const profileService = require("../services/profile.service")

class ProfileController {
    async profiles(req, res, next) {
        new Ok({ 
            message: 'Query Success', 
            metadata: await profileService.profiles() 
        }).send(res)
    }

    async profile(req, res, next) {
        new Ok({ 
            message: 'Query Success', 
            metadata: await profileService.profile() 
        }).send(res)
    }
}

module.exports = new ProfileController()
