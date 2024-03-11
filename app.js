'use strict'

const express = require('express')
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')
const app = express()
const router = require('./src/routers/index')

// middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./src/tests/inventory.test')
const productTestService = require('./src/tests/product.test')
productTestService.purchaseProduct('Apple')

// database
require('./src/dbs/init.mongo')
// const { checkOverload } = require('./src/helpers/check.connect')
// checkOverload()

// routes
app.use('/', require('./src/routers'))

// handle error
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500
    res.status(statusCode).json({ 
        code: statusCode,
        message: error.message
     })
})

module.exports = app