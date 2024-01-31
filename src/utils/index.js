'use strict'

const _ = require('lodash');

const getInfoData = ({fileds = [], object = {}}) => {
    return _.pick(object, fileds)
}

const selectFields = (select = []) => {
    return Object.fromEntries(select.map(item => [item, 1]))
}

const unSelectFields = (unSelect = []) => {
    return Object.fromEntries(unSelect.map(item => [item, 0]))
}

module.exports = {
    getInfoData,
    selectFields,
    unSelectFields
}