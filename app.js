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

app.use((error, req, res, next) => res.status(error.status || 500).json({ error: error.message }))

module.exports = app