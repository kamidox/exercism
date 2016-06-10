function Series (num) {
    'use strict';

    function digits () {
        return num.split('').map(function (c) {
            return c.charCodeAt(0) - 48;
        });
    }

    function slices (n) {
        var d = digits();
        if (n > d.length) {
            throw new Error('Slice size is too big.');
        }

        var ret = [];
        for (var i = 0; i + n <= d.length; i ++) {
            ret.push(d.slice(i, i + n));
        }
        return ret;
    }

    return {
        digits: digits(),
        slices: slices,
    };
}

module.exports = Series;

