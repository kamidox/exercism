var NumberSystem = require ('./numer-system');

function Binary (bval) {
    'use strict';

    return new NumberSystem(bval, 2, /[^10]/);
}

module.exports = Binary;
