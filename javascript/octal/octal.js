var NumberSystem = require('../binary/numer-system');

function Octal (val) {
    return new NumberSystem(val, 8, /[^01234567]/);
}

module.exports = Octal;

