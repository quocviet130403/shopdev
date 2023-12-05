'use strict'

const app = require("./app");
const { app: {port} } = require('./src/configs/config.mongodb')

const server = app.listen(port ,(error) => {
    console.log(`connect server success with ${port}`);
})

process.on('SIGINT', () => {
    server.close(() => {
        console.log(`close server`)
    })
})