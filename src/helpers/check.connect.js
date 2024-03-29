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

module.exports = {
    countConnect,
    checkOverload
}