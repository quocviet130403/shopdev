'use strict'

const express = require('express')
const router = express.Router()

const path = '/api/v1'
router.use(`${path}/auth`, require('./access/index.js'));

module.exports = router