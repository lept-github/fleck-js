const {getCommafied, getNumberFromString, getIsValidDate, getDateFromString, getStringFromDate, replace} = require('./utility');

const {isNumber, isString, isObject, isFunction, isBoolean, isDate} = require('./validation');

const number = (params, decimals) => {
    let value            = 0;
    let template         = v => `${v}`;
    let templateNegative = v => `(${v})`;
    let isCommafied      = true;
    decimals             = isNumber(decimals) ? decimals : 2;

    if( params || params === 0 ){
        if( isString(params) ){
            value = getNumberFromString(params);
        }

        if( isNumber(params) ){
            value = params;
        }

        if( isObject(params) ){
            value            = isString(params.value) ? getNumberFromString(params.value) : value;
            value            = isNumber(params.value) ? params.value : value;
            decimals         = isNumber(params.decimals) ? params.decimals : decimals;
            template         = isFunction(params.template) ? params.template : template;
            templateNegative = isFunction(params.templateNegative) ? params.templateNegative : templateNegative;
            isCommafied      = isBoolean(params.isCommafied) ? params.isCommafied : isCommafied;
        }
    }

    let commafied = v => getCommafied(v);
    if( isCommafied === false ){
        commafied = v => v;
    }

    if( value >= 0 ){
        return template(commafied(value.toFixed(decimals)));
    }
    return templateNegative(commafied((value * (-1)).toFixed(decimals)));
};

const numberShort = (params, decimals) => {
    let value            = 0;
    let template         = (v,s) => `${v}${s}`;
    let templateNegative = (v,s) => `(${v}${s})`;
    decimals             = isNumber(decimals) ? decimals : 1;

    if( params || params === 0 ){
        if( isString(params) ){
            value = getNumberFromString(params);
        }

        if( isNumber(params) ){
            value = params;
        }

        if( isObject(params) ){
            value            = isString(params.value) ? getNumberFromString(params.value) : value;
            value            = isNumber(params.value) ? params.value : value;
            decimals         = isNumber(params.decimals) ? params.decimals : decimals;
            template         = isFunction(params.template) ? params.template : template;
            templateNegative = isFunction(params.templateNegative) ? params.templateNegative : templateNegative;
        }
    }

    let [returnValue, suffix, negativeFlag] = ['','',false];

    if( value < 0 ){
        value = value * (-1);
        negativeFlag = true;
    }

    if( value <= 999 ){
        returnValue = value.toFixed(decimals);
        suffix = '';
    }

    if( value >= 1000 ){
        returnValue = (value/1000).toFixed(decimals);
        suffix = 'K';
    }

    if( value >= 1000000 ){
        returnValue = (value/1000000).toFixed(decimals);
        suffix = 'M';
    }

    if( value >= 1000000000 ){
        returnValue = (value/1000000000).toFixed(decimals);
        suffix = 'B';
    }

    if( value >= 1000000000000 ){
        returnValue = (value/1000000000000).toFixed(decimals);
        suffix = 'T';
    }

    if( value >= 1000000000000000 ){
        returnValue = (value/1000000000000000).toFixed(decimals);
        suffix = 'Q';
    }

    if( negativeFlag === false  ){
        return template(returnValue,suffix);
    }

    return templateNegative(returnValue,suffix);
};

const dollar = (params, decimals) => {
    let value            = 0;
    let template         = v => `$${v}`;
    let templateNegative = v => `($${v})`;
    decimals             = isNumber(decimals) ? decimals : 2;

    if( params || params === 0 ){
        if( isString(params) ){
            value = getNumberFromString(params);
        }

        if( isNumber(params) ){
            value = params;
        }

        if( isObject(params) ){
            value            = isString(params.value) ? getNumberFromString(params.value) : value;
            value            = isNumber(params.value) ? params.value : value;
            decimals         = isNumber(params.decimals) ? params.decimals : decimals;
            template         = isFunction(params.template) ? params.template : template;
            templateNegative = isFunction(params.templateNegative) ? params.templateNegative : templateNegative;
        }
    }

    return number({value, decimals, template, templateNegative});
};

const dollarShort = (params, decimals) => {
    let value            = 0;
    let template         = (v,s) => `$${v}${s}`;
    let templateNegative = (v,s) => `($${v}${s})`;
    decimals             = isNumber(decimals) ? decimals : 1;

    if( params || params === 0 ){
        if( isString(params) ){
            value = getNumberFromString(params);
        }

        if( isNumber(params) ){
            value = params;
        }

        if( isObject(params) ){
            value            = isString(params.value) ? getNumberFromString(params.value) : value;
            value            = isNumber(params.value) ? params.value : value;
            decimals         = isNumber(params.decimals) ? params.decimals : decimals;
            template         = isFunction(params.template) ? params.template : template;
            templateNegative = isFunction(params.templateNegative) ? params.templateNegative : templateNegative;
        }
    }

    return numberShort({value, decimals, template, templateNegative});
};

const percent = (params, decimals) => {
    let value            = 0;
    let template         = v => `${v}%`;
    let templateNegative = v => `(${v}%)`;
    decimals             = isNumber(decimals) ? decimals : 2;

    if( params || params === 0 ){
        if( isString(params) ){
            value = getNumberFromString(params);
        }

        if( isNumber(params) ){
            value = params;
        }

        if( isObject(params) ){
            value            = isString(params.value) ? getNumberFromString(params.value) : value;
            value            = isNumber(params.value) ? params.value : value;
            decimals         = isNumber(params.decimals) ? params.decimals : decimals;
            template         = isFunction(params.template) ? params.template : template;
            templateNegative = isFunction(params.templateNegative) ? params.templateNegative : templateNegative;
        }
    }

    return number({value, decimals, template, templateNegative});
};

const date = (date, format) => {
    let d;

    if( isString(date) ){ d = getDateFromString(date); }
    if( isDate(date) ){ d = date; }
    if( getIsValidDate(d) === false ){ return ''; }

    if( format ){
        if( isFunction(format) ){
            return format(d);
        }

        if( isString(format) ){
            return getStringFromDate(d, format);
        }
    }

    return getStringFromDate(d, 'mm/dd/yyyy');
};

const time = (date, format) => {
    let d;

    if( isString(date) ){ d = getDateFromString(date); }
    if( isDate(date) ){ d = date; }
    if( getIsValidDate(d) === false ){ return ''; }

    const getSuffix = f => {
        let suffix = '';
        if( f && isString(f) && f.lastIndexOf('hr24') === -1 && f.lastIndexOf('hr') !== -1 ){
            suffix = (d.getHours() >= 13) ? 'pm' : 'am';
        }
        return suffix;
    };

    if( format ){
        if( isFunction(format) ){
            return format(d);
        }

        if( isString(format) ){
            return getStringFromDate(d, format) + getSuffix(format);
        }
    }

    format = 'hr:mi:ss';
    return getStringFromDate(d, format) + getSuffix(format);
};

const datetime = (date, format) => {
    let d;

    if( isString(date) ){ d = getDateFromString(date); }
    if( isDate(date) ){ d = date; }
    if( getIsValidDate(d) === false ){ return ''; }

    const getSuffix = f => {
        let suffix = '';
        if( f && isString(f) && f.lastIndexOf('hr24') === -1 && f.lastIndexOf('hr') !== -1 ){
            suffix = (d.getHours() >= 13) ? 'pm' : 'am';
        }
        return suffix;
    };

    if( format ){
        if( isFunction(format) ){
            return format(d);
        }

        if( isString(format) ){
            return getStringFromDate(d, format) + getSuffix(format);
        }
    }

    format = 'yyyy-mm-dd hr:mi:ss';
    return getStringFromDate(d, format) + getSuffix(format);
};

const ssn = (value, format, length) => {
    format = format ? format : '%d%d%d-%d%d-%d%d%d%d';
    length = length ? length : 9;

    // validation
    if( value.toString().length !== length ){ return value; }

    return replace(value, format)
};

const taxId = (value, format, length) => {
    format = format ? format : '%d%d-%d%d%d%d%d%d%d';
    length = length ? length : 9;

    // validation
    if( value.toString().length !== length ){ return value; }

    return replace(value, format)
};

const phone = (value, format, length) => {
    format = format ? format : '(%d%d%d)%d%d%d-%d%d%d%d';
    length = length ? length : 10;

    // validation
    if( value.toString().length !== length ){ return value; }

    return replace(value, format)
};

const creditCard = (value, format, length) => {
    format = format ? format : '%d%d%d%d %d%d%d%d %d%d%d%d %d%d%d%d';
    length = length ? length : 16;

    // validation
    if( value.toString().length !== length ){ return value; }

    return replace(value, format)
};

module.exports = {
    number,
    numberShort,
    dollar,
    dollarShort,
    percent,
    date,
    time,
    datetime,
    ssn,
    taxId,
    phone,
    creditCard,
};
