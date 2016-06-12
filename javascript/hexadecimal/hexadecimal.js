var NumberSystem = require('../binary/numer-system.js');

function Hexadecimal (hex) {
    return new NumberSystem (hex.toLowerCase(), 16, /[^0123456789abcdef]/);
}

module.exports = Hexadecimal;

