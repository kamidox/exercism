var Hamming = function () {};

Hamming.prototype.compute = function (s1, s2) {
    'use strict';

    var len1 = s1.length;
    var len2 = s2.length;

    if (len1 !== len2) {
        throw new Error('DNA strands must be of equal length.');
    }

    var diffs = 0;
    for (var i = 0; i < len1; i++) {
        if (s1[i] !== s2[i]) {
            diffs ++;
        }
    }

    return diffs;
};

module.exports = Hamming;
