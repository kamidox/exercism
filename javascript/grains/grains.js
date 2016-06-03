var BigInt = require('./big-integer');

function Grains () {
}

Grains.prototype.square = function (n) {
    'use strict';
    return BigInt(2).pow(n-1).toString();
};

Grains.prototype.total = function () {
    'use strict';
    var result = new BigInt(0);
    for (var i = 0; i < 64; i ++) {
        result = result.add(BigInt(2).pow(i));
    }
    return result.toString();
};

module.exports = Grains;

