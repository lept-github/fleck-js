const {isNumber, isString, isArray, isEmpty, isNull, isDate} = require('./validation');

const getCommafied = value => {
    let arrWhole = value.toString().split(".");
    let arrTheNumber = arrWhole[0].split("").reverse();
    let newNum = [];
    for(let i=0; i<arrTheNumber.length; i++){
        newNum[newNum.length] = ((i%3===2) && (i<arrTheNumber.length-1)) ? "," + arrTheNumber[i]: arrTheNumber[i];
    }
    let returnNum = newNum.reverse().join("");
    if(arrWhole[1]){
        returnNum += "." + arrWhole[1];
    }
    return returnNum;
};

const getNumberFromString = value => {
    if( isString(value) ){
        let str = value.replace(/[^\d.-]/g,'');
        value = parseFloat(str ? str : 0);
    }
    return isNumber(value) ? value : 0;
};

const getIsValidDate = (date, format, returnDateObject) => {
    const getIsLeapYear = year => (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    const validate = (year, month, day) => {
        // generic year, month and day validations
        if( year >= 9999 || year <= 0 ){ return false; }
        if( month >= 13 || month <= 0 ){ return false; }
        if( day >= 32 || day <= 0 ){ return false; }

        // validate 31 day months
        if( [2,4,6,9,11].includes(month) === true && day === 31 ){
            return false;
        }

        // validate february
        if( month === 2 ){
            if( getIsLeapYear(year) === true ){
                if( day >= 30 ){ return false; }
            } else {
                if( day >= 29 ){ return false; }
            }
        }
    };

    // date must have something inside
    if( isEmpty(date) || isNull(date) ){
        return false;
    }

    // define variables
    let year  = '';
    let month = '';
    let day   = '';

    // if we received the variable date as a string
    if( isString(date) ){
        // date must be at least 7 characters long, to account for m/d/yyyy
        if( date.length <= 7 ){
            return false;
        }

        // we can allow to use the following characters as separators: slash, dash, point, space
        let [delimiter, delimiterCount] = ['',0];

        if( date.lastIndexOf('/') !== -1 ){
            delimiter = '/';
            delimiterCount++;
        }
        if( date.lastIndexOf('-') !== -1 ){
            delimiter = '-';
            delimiterCount++;
        }
        if( date.lastIndexOf('.') !== -1 ){
            delimiter = '.';
            delimiterCount++;
        }
        if( date.lastIndexOf(' ') !== -1 ){
            delimiter = ' ';
            delimiterCount++;
        }

        // we can only use one type of separator, any combination should return false. for example: mm/dd-yyyy
        if( delimiterCount !== 1 ){
            return false;
        }

        let values = date.split(delimiter);

        // we should have 3 distinct values, one for year, one for month, and one for day.
        if( isArray(values) === false || values.length !== 3 ){
            return false;
        }

        // all the values should be numeric
        if( isNaN(values[0]) || isNaN(values[1]) || isNaN(values[2]) ){
            return false;
        }

        let yearIndex  = '';
        let monthIndex = '';
        let dayIndex   = '';

        // find year
        values.map((value,index) => {
            // we can find the year easily because it is the only value with 4 characters
            if( value.length === 4 ){
                year = parseInt(value,10);
                yearIndex = index;
            }
            return false;
        });

        // if the 4 character year was not found then return false
        if( year === '' || yearIndex === '' ){
            return false;
        }

        // find day - first try
        values.map((value,index) => {
            // here we already know the location of the year so skip it
            if( index === yearIndex ){
                return false;
            }
            // we can easily find the day if it is greater or equal to 13
            if( parseInt(value,10) >= 13 ){
                day = parseInt(value,10);
                dayIndex = index;
            }
            return false;
        });

        // here we will check if we found the day in our first try
        if( day === '' || dayIndex === '' ){
            // if we get to this point it means the day and month are both 12 or below
            // find day and month - second try
            values.map((value,index) => {
                // here we already know the location of the year so skip it
                if( index === yearIndex ){
                    return false;
                }
                // since day and month are both 12 or below, we are going to assume the first value will be the day
                if( day === '' || dayIndex === '' ){
                    day = parseInt(value,10);
                    dayIndex = index;
                    return false;
                }
                // that means we are going to assume the third value is the month
                month = parseInt(value,10);
                monthIndex = index;
                return false;
            });

        } else {
            // if we get to this point it means we already figure out the year and day, so we can go ahead and get the month
            // get month
            values.map((value,index) => {
                // here we already know the location of the year and the day so skip them
                if( index === yearIndex || index === dayIndex ){
                    return false;
                }
                month = parseInt(value,10);
                monthIndex = index;
                return false;
            });
        }

        // perform light validations on the values of year, month and day
        if( validate(year,month,day) === false ){
            return false;
        }

        // if the format parameter was provided it, then it should be enforced
        if( format ){
            let _delimiter = '';

            if( format.lastIndexOf('/') !== -1 ){ _delimiter = '/'; }
            if( format.lastIndexOf('-') !== -1 ){ _delimiter = '-'; }
            if( format.lastIndexOf('.') !== -1 ){ _delimiter = '.'; }
            if( format.lastIndexOf(' ') !== -1 ){ _delimiter = ' '; }

            if( _delimiter !== delimiter ){
                return false;
            }

            let passedFormatValidation = true;
            let formatYearIndex  = format.toLowerCase().indexOf("yyyy");
            let formatMonthIndex = format.toLowerCase().indexOf("mm");
            let formatDayIndex   = format.toLowerCase().indexOf("dd");

            // find the order of the values in the format, so we can later match them to the date provided
            let indexes = [{type:'year', index:formatYearIndex}, {type:'month', index:formatMonthIndex}, {type:'day', index:formatDayIndex}].sort((a, b) => {return a.index - b.index });

            // loop through the values in the format
            indexes.map((object,index) => {
                // if the month and the day are both below 12 then formatting doesnt matter
                if( month <= 12 && day <= 12 ){
                    return false;
                }
                if( object.type === 'year' && yearIndex !== index ){
                    passedFormatValidation = false;
                    return false;
                }
                if( object.type === 'month' && monthIndex !== index ){
                    passedFormatValidation = false;
                    return false;
                }
                if( object.type === 'day' && dayIndex !== index ){
                    passedFormatValidation = false;
                    return false;
                }
                return false;
            });

            // return false if the format and the format of the date dont match
            if( passedFormatValidation === false ){
                return false;
            }
        }

        // create a new instance of a Date object, the month is minus 1 because the months in JS start at 0
        date = new Date(year,month-1,day);
    }

    // in case date from the parameters is an instance of a Date object
    // also, if date was an string and it got overwritten correctly a few lines above
    if( isDate(date) === false ){
        return false;
    }

    // in case there is something wrong with the instance of the Date object itself
    if( date.toString() === 'Invalid Date' ){
        return false;
    }

    // by this point we are pretty certain the date is valid
    if( returnDateObject === true ){
        // return date object itself
        return date;
    }

    return true;
};

const getDateFromString = (date, format) => getIsValidDate(date, format, true);

const getStringFromDate = (date, format) => {
    format = format ? format : 'mm/dd/yyyy';

    if( getIsValidDate(date) === false ){ return format; }

    // getMilliseconds
    // ms
    let ms = date.getMilliseconds().toString();

    // getSeconds
    // ss
    let ss = date.getSeconds().toString();
    if( ss.length === 1 ){ ss = '0'+ ss; }

    // getMinutes
    // mi
    let mi = date.getMinutes().toString();
    if( mi.length === 1 ){ mi = '0'+ mi; }

    // getHours
    // hr24 = 24h
    let hr24 = date.getHours().toString();
    if( hr24.length === 1 ){ hr24 = '0'+ hr24; }

    // hr = 12h
    let hr = date.getHours();
    switch( date.getHours() ){
        case 13: hr = 1; break;
        case 14: hr = 2; break;
        case 15: hr = 3; break;
        case 16: hr = 4; break;
        case 17: hr = 5; break;
        case 18: hr = 6; break;
        case 19: hr = 7; break;
        case 20: hr = 8; break;
        case 21: hr = 9; break;
        case 22: hr = 10; break;
        case 23: hr = 11; break;
        case 0:  hr = 12; break;
        default: break;
    }
    if( hr.toString().length === 1 ){ hr = '0'+ hr; }

    // getDate
    // ds = 1st, 2nd, 3rd
    let daySuffix = 'th';
    switch( date.getDate() ){
        case 1: daySuffix  = 'st'; break;
        case 21: daySuffix = 'st'; break;
        case 31: daySuffix = 'st'; break;
        case 2: daySuffix  = 'nd'; break;
        case 22: daySuffix = 'nd'; break;
        case 3: daySuffix  = 'rd'; break;
        case 23: daySuffix = 'rd'; break;
        default: daySuffix = 'th'; break;
    }
    let ds = date.getDate() +''+ daySuffix;

    // dd = 01,02,03
    let dd = date.getDate().toString();
    if( dd.length === 1 ){ dd = '0'+ dd; }

    // d = 1,2,3
    let d = date.getDate().toString();

    // getDay
    // DD = Monday,Tuesday,Wednesday
    let weekDays1 = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let DD = weekDays1[ date.getDay() ];

    // D = Mon,Tue,Wed
    let weekDays2 = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let D = weekDays2[ date.getDay() ];

    // getMonth
    // mm = 01,02,03
    let mm = (date.getMonth() +1).toString();
    if( mm.length === 1 ){ mm = '0'+ mm; }

    // m = 1,2,3
    let m = (date.getMonth() +1).toString();

    // MM = January,February,March
    let months1 = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let MM = months1[ date.getMonth() ];

    // M = Jan,Feb,Mar
    let months2 = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let M = months2[ date.getMonth() ];

    // getFullYear
    // yyyy = 2021,2022,2023
    let yyyy = date.getFullYear().toString();

    // yy = 21,22,23
    let yy = date.getFullYear().toString().substr(-2);

    // time
    if( format.lastIndexOf('ms') !== -1 ){ format = format.replace('ms',ms); }
    if( format.lastIndexOf('ss') !== -1 ){ format = format.replace('ss',ss); }
    if( format.lastIndexOf('mi') !== -1 ){ format = format.replace('mi',mi); }
    if( format.lastIndexOf('hr24') !== -1 ){ format = format.replace('hr24',hr24); }
    if( format.lastIndexOf('hr12') !== -1 ){ format = format.replace('hr12',hr); }
    if( format.lastIndexOf('hr') !== -1 ){ format = format.replace('hr',hr); }

    // days
    if( format.lastIndexOf('ds') !== -1 ){ format = format.replace('ds',ds); }
    if( format.lastIndexOf('dd') !== -1 ){ format = format.replace('dd',dd); }
    if( format.lastIndexOf('d') !== -1 ){ format = format.replace('d',d); }
    if( format.lastIndexOf('DD') !== -1 ){ format = format.replace('DD',DD); }
    if( format.lastIndexOf('D') !== -1 ){ format = format.replace('D',D); }

    // months
    if( format.lastIndexOf('mm') !== -1 ){ format = format.replace('mm',mm); }
    if( format.lastIndexOf('m') !== -1 ){ format = format.replace('m',m); }
    if( format.lastIndexOf('MM') !== -1 ){ format = format.replace('MM',MM); }
    if( format.lastIndexOf('M') !== -1 ){ format = format.replace('M',M); }

    // years
    if( format.lastIndexOf('yyyy') !== -1 ){ format = format.replace('yyyy',yyyy); }
    if( format.lastIndexOf('yy') !== -1 ){ format = format.replace('yy',yy); }

    return format;
};

const replace = (value, format) => {
    if( value && format ){
        let str = '';

        // convert value to a string we can use
        if( isString(value) ){ str = value; }
        if( isNumber(value) ){ str = value.toString(); }

        // replace characters
        str.split('').map(char => format = format.replace('%d',char));

        return format;
    }

    return value;
};

module.exports = {
    getCommafied,
    getNumberFromString,
    getIsValidDate,
    getDateFromString,
    getStringFromDate,
    replace,
};