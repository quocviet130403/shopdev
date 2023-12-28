'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller');
const router = express.Router()

router.post('/signUp', accessController.signUp);

module.exports = router 