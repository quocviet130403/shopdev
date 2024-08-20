'use strict'

const express = require('express');
const asynHandler = require('../../helpers/asynHandler');
const { authentication } = require('../../auth/authUltils');
const grantAccess = require('../../middlewares/rbac');
const profileController = require('../../controllers/profile.controller');
const router = express.Router()


router.use(authentication);
router.get('/viewAny', grantAccess('read:any', 'profiles'), asynHandler(profileController.profiles));
router.get('/viewOwn', grantAccess('read:own', 'profile'), asynHandler(profileController.profile));


module.exports = router 