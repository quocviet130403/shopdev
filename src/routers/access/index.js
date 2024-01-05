'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller');
const { asynHandler } = require('../../helpers/check.connect');
const router = express.Router()

router.post('/signUp', asynHandler(accessController.signUp));

module.exports = router 