'use strict'

const dev = {
    app: {
        port: process.env.PORT_DEV || 3000
    },
    db: {
        host: process.env.HOST_MONGODB_DEV || "localhost",
        port: process.env.PORT_MONGODB_DEV || 27017,
        name: process.env.NAME_MONGODB_DEV || "dev"
    }
}

const production = {
    app: {
        port: process.env.PORT_PRODUCTION || 3000
    },
    db: {
        host: process.env.HOST_MONGODB_PRODUCTION || "localhost",
        port: process.env.HOST_MONGODB_PRODUCTION || 27017,
        name: process.env.HOST_MONGODB_PRODUCTION || "production"
    }
}

const config = { dev, production }
const env = process.env.NODE_ENV || 'dev';

module.exports = config[env]
