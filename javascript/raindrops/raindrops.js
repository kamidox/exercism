function Raindrops () {
    'use strict';
    return {
        convert: function (n) {
            var ret = '';
            if (n % 3 === 0) {
                ret += 'Pling';
            }
            if (n % 5 === 0) {
                ret += 'Plang';
            }
            if (n % 7 === 0) {
                ret += 'Plong';
            }
            if (!ret) {
                ret += n;
            }
            return ret;
        }
    };
}

module.exports = Raindrops;
