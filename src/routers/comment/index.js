'use strict'

const express = require('express');
const asynHandler = require('../../helpers/asynHandler');
const { authentication } = require('../../auth/authUltils');
const commentController = require('../../controllers/comment.controller');
const router = express.Router()

router.use(authentication);

router.get('/create', asynHandler(commentController.createComment));
router.get('/list', asynHandler(commentController.getListComment));
router.get('/delete', asynHandler(commentController.deleteComment));

module.exports = router 