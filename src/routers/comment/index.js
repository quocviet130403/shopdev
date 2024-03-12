'use strict'

const express = require('express');
const asynHandler = require('../../helpers/asynHandler');
const { authentication } = require('../../auth/authUltils');
const commentController = require('../../controllers/comment.controller');
const router = express.Router()

router.use(authentication);

router.get('/create', asynHandler(commentController.createComment));

module.exports = router 