function Allergies (score) {
    'use strict';

    var allergiesTable = {
        eggs: 1,
        peanuts: 2,
        shellfish: 4,
        strawberries: 8,
        tomatoes: 16,
        chocolate: 32,
        pollen: 64,
        cats: 128
    };

    return {
        list: function () {
            var ret = [];
            var keys = Object.keys(allergiesTable);
            var n = score % 256;
            for (var i = keys.length - 1; i >= 0; i --) {
                if (n - allergiesTable[keys[i]] >= 0) {
                    ret.push(keys[i]);
                    n -= allergiesTable[keys[i]];
                }
            }
            return ret.reverse();
        },

        allergicTo: function (src) {
            var list = this.list();
            return list.indexOf(src) !== -1;
        }
    };
}

module.exports = Allergies;

