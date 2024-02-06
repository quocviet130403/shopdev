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

const removeUndefinedObject = (object) => {
    Object.keys(object).forEach((key) => {
        if (object[key] == null || object[key] == undefined) {
            delete object[key]
        }
    })

    return object
}

const updateNestedObjectParser = (object) => {

    const final = {}

    object = removeUndefinedObject(object)

    Object.keys(object).forEach((key) => {
        if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
            const response = updateNestedObjectParser(object[key])
            Object.keys(response).forEach((subKey) => {
                final[`${key}.${subKey}`] = response[subKey]
            })
        } else {
            final[key] = object[key]
        }
    })

    return final

}

module.exports = {
    getInfoData,
    selectFields,
    unSelectFields,
    removeUndefinedObject,
    updateNestedObjectParser
}