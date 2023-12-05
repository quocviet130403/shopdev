'use strict'

const express = require('express')
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')
const app = express()

// middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// database
require('./src/dbs/init.mongo')
// const { checkOverload } = require('./src/helpers/check.connect')
// checkOverload()

// routes

// handle error

module.exports = app