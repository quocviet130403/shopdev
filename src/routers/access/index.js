'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller');
const asynHandler = require('../../helpers/asynHandler');
const { authentication } = require('../../auth/authUltils');
const router = express.Router()

router.post('/signUp', asynHandler(accessController.signUp));
router.post('/login', asynHandler(accessController.login));
router.post('/refreshToken', asynHandler(accessController.refreshToken));

// authentication
router.use(authentication);

router.post('/logout', asynHandler(accessController.logout));

module.exports = router 