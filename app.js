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

module.exports = app