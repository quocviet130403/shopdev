'use strict'

const express = require('express');
const { apiKey } = require('../auth/checkAuth.js');
const router = express.Router()

const path = '/api/v1'

// router.use(apiKey);
// router.use(perrmission('0000'));
router.use(`${path}/auth`, require('./access/index.js'));
router.use(`${path}/product`, require('./product/index.js'));
router.use(`${path}/discount`, require('./discount/index.js'));
router.use(`${path}/cart`, require('./cart/index.js'));
router.use(`${path}/comment`, require('./comment/index.js'));

// notification
// inventory
// upload

module.exports = router