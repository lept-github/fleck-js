const isArray = (array, strictMode = true) => {
    strictMode = (strictMode === true);

    if( Array.isArray(array) === false ){
        return false;
    }

    return !(strictMode === true && array.length === 0);
};

const isBoolean = (boolean, strictMode = true) => {
    strictMode = (strictMode === true);

    if( typeof boolean === 'boolean' ){
        return true
    }

    if( typeof boolean === 'string' && strictMode === false ){
        if( boolean.toLowerCase() === 'true' || boolean.toLowerCase() === 'false' ){
            return true;
        }
    }

    return false;
};

const isNumber = (number, strictMode = true) => {
    strictMode = (strictMode === true);

    if( typeof number === 'number' ){
        return true;
    }

    return (strictMode === false && isNaN(number) === false);
};

const isFunction = func => {
    return (typeof func === 'function');
};

const isObject = (object, strictMode = true) => {
    strictMode = (strictMode === true);

    if( strictMode === false && typeof object === 'object' ){
        return true;
    }

    if( strictMode === true && typeof object === 'object' ){
        return (isArray(Object.keys(object)) === true);
    }

    return false;
};

const isString = (string, strictMode = true) => {
    strictMode = (strictMode === true);

    if( strictMode === false && typeof string === 'string' ){
        return true;
    }

    if( strictMode === true && typeof string === 'string' ){
        return (string.length > 0);
    }

    return false;
};

const isDate = date => {
    return (date instanceof Date);
};

const isSet = value => {
    if( isArray(value) ){ return true; }
    if( isBoolean(value) ){ return true; }
    if( isNumber(value) ){ return true; }
    if( isFunction(value) ){ return true; }
    if( isObject(value) ){ return true; }
    if( isString(value) ){ return true; }
    if( isDate(value) ){ return true; }
    return false;
};

const isEmpty = value => {
    if( isNull(value) ){ return true; }
    if( isString(value,false) && value === '' ){ return true; }
    if( isArray(value,false) && value.length === 0 ){ return true; }
    if( isObject(value,false) && isArray(Object.keys(value)) === false && isArray(value) === false && isDate(value) === false ){ return true; }
    return false;
};

const isNull = value => {
    return value === null;
};

module.exports = {
    isArray,
    isBoolean,
    isNumber,
    isFunction,
    isObject,
    isString,
    isDate,
    isSet,
    isEmpty,
    isNull
};