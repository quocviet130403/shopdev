'use strict'

const { default: mongoose } = require("mongoose");
const os = require('os')
const SECOND_CHECK_TIMEOUT = 5000;

const countConnect = () => {
    const numberConnection = mongoose.connections.length
    console.log(`Number of Conntection::${numberConnection}`)
}

const checkOverload = () => {
    setInterval(() => {
        const numberConnection = mongoose.connections.length
        const numCors = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
        const maxConnections = numCors * 5

        console.log(`Active connections::${numberConnection}`)
        console.log(`Memory usage::${memoryUsage / 1024 / 1024} MB`)

        if (numberConnection > maxConnections) {
            console.log(`Connection overload`)
        }

    }, SECOND_CHECK_TIMEOUT)
}

// const asynHandler = (fn) => (req, res, next) => {
//     return Promise
//         .resolve(fn(req, res, next))
//         .catch(next)
// }

const asynHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

module.exports = {
    countConnect,
    checkOverload,
    asynHandler
}