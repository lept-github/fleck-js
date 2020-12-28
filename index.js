const validation = require('./src/validation');
const format     = require('./src/format');
const utility    = require('./src/utility');

module.exports = {
    isArray: validation.isArray,
    isBoolean: validation.isBoolean,
    isNumber: validation.isNumber,
    isFunction: validation.isFunction,
    isObject: validation.isObject,
    isString: validation.isString,
    isDate: validation.isDate,
    isSet: validation.isSet,
    isEmpty: validation.isEmpty,
    isNull: validation.isNull,
    validation,
    format,
    utility,
};