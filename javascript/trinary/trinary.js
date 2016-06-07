var NumberSystem = require ('../binary/numer-system');

function Trinary(val) {
    'use strict';

    return new NumberSystem(val, 3, /[^012]/);
}

module.exports = Trinary;

