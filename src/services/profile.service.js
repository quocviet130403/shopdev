'use strict'

class ProfileService {
    async profiles() {
        return [
            {
                id: "1",
                name: "Viet"
            },
            {
                id: "2",
                name: "My"
            },
        ]
    }
    async profile() {
        return {
            id: "1",
            name: "Viet"
        }
    }
}

module.exports = new ProfileService()