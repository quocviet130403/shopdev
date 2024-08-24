'use strict'

const AccessControl = require('accesscontrol')

let grantList = [
    { role: 'admin', resource: 'profiles', action: 'read:any', attributes: '*' },
    { role: 'user', resource: 'profile', action: 'read:own', attributes: '*' }
];

module.exports = new AccessControl(grantList);