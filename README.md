# fleck-js

fleck-js is a collection of javascript functions and utilities to help developers code faster, bigger and better apps. It does not have dependencies, it is written entirely in vanilla javascript, so it will not install unnecessary packages and libraries increasing your project's bundle size.

## Installation

`npm install fleck-js`

## Import or Require

```
const fleck = require('fleck-js');
console.log(fleck.isArray([1,2,3])); // true
```

or 

```
import {isArray} from 'fleck-js';
console.log(isArray([1,2,3])); // true
```

## Categories

fleck-js focuses on everyday pieces of code developers write over and over again, which we have separated in three different categories:

- Validations
- Formatting
- Utilities

### Validations

#### isArray

It determines if the given value is an array or not.

##### Syntax

`isArray(array, strictMode)`
  
##### Parameters

|Parameter       |Description                      |
|----------------|---------------------------------|
|array           |Required. The value to be tested.|
|strictMode      |Optional. Defaults to true. Validation strategy, it determines if an empty array is valid or not.|

##### Examples

```
isArray([1,2,3])       // true
isArray([])            // false
isArray([1,2,3],false) // true
isArray([],false)      // true
isArray('')            // false
isArray(123)           // false
```

#### isBoolean

It determines if the given value is a boolean or not.

##### Syntax

`isBoolean(boolean, strictMode)`
  
##### Parameters

|Parameter       |Description                      |
|----------------|---------------------------------|
|boolean         |Required. The value to be tested.|
|strictMode      |Optional. Defaults to true. Validation strategy, it determines if strings containing 'true' or 'false', uppercase or lowercase are valid or not.|

##### Examples

```
isBoolean(true)         // true
isBoolean(false)        // true
isBoolean('true')       // false
isBoolean('true',false) // true
isBoolean('TRUE',false) // true
isBoolean(123)          // false
```

#### isNumber

It determines if the given value is a number or not.

##### Syntax

`isNumber(number, strictMode)`
  
##### Parameters

|Parameter       |Description                      |
|----------------|---------------------------------|
|number          |Required. The value to be tested.|
|strictMode      |Optional. Defaults to true. Validation strategy, it determines if strings containing numbers are valid or not.|

##### Examples

```
isNumber(123.45)         // true
isNumber('123.45')       // false
isNumber(true)           // false
isNumber([])             // false
isNumber(new Date())     // false
isNumber('123.45',false) // true
```

#### isFunction

It determines if the given value is a function or not.

##### Syntax

`isFunction(func)`
  
##### Parameters

|Parameter       |Description                      |
|----------------|---------------------------------|
|func            |Required. The value to be tested.|

##### Examples

```
isFunction(function(){})   // true
isFunction(() => {})       // true
isFunction(true)           // false
isFunction([])             // false
isFunction('() => {}')     // false
isFunction('function(){}') // false
```

#### isObject

It determines if the given value is a object or not.

##### Syntax

`isObject(object, strictMode)`
  
##### Parameters

|Parameter       |Description                      |
|----------------|---------------------------------|
|isObject        |Required. The value to be tested.|
|strictMode      |Optional. Defaults to true. Validation strategy, it determines if an empty object is valid or not.|

##### Examples

```
isObject({foo:123.45})    // true
isObject({})              // false
isObject({foo:123},false) // true
isObject({},false)        // true
isObject("")              // false
isObject(123.45)          // false
```

#### isDate

It determines if the given value is an instance of Date or not.

##### Syntax

`isDate(date)`
  
##### Parameters

|Parameter       |Description                      |
|----------------|---------------------------------|
|date            |Required. The value to be tested.|

##### Examples

```
isDate(new Date())   // true
isDate("01/01/2000") // false
isDate(123.45)       // false
isDate("")           // false
isDate([])           // false
isDate(() => {})     // false
```

#### isString

It determines if the given value is a string or not.

##### Syntax

`isString(string, strictMode)`
  
##### Parameters

|Parameter       |Description                      |
|----------------|---------------------------------|
|string          |Required. The value to be tested.|
|strictMode      |Optional. Defaults to true. Validation strategy, it determines if an empty string is valid or not.|

##### Examples

```
isString("foo")       // true
isString("")          // false
isString("foo",false) // true
isString("",false)    // true
isString("123.45")    // true
isString(123.45)      // false
```
