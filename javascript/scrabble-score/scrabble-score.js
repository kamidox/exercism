var scoreTable = {
    AEIOULNRST: 1,
    DG: 2,
    BCMP: 3,
    FHVWY: 4,
    K: 5,
    JX: 8,
    QZ: 10
};

function scoreOf (element) {
    'use strict';

    var keys = Object.keys(scoreTable);
    for (var i = 0; i < keys.length; i ++) {
        if (keys[i].indexOf(element) !== -1) {
            return scoreTable[keys[i]];
        }
    }
    return 0;
}

function score (txt) {
    'use strict';

    if (!txt) {
        return 0;
    }
    var chars = txt.split('').map(function (element) {
        return element.toUpperCase();
    });
    return chars.reduce(function (total, element) {
        return total += scoreOf(element);
    }, 0);
}

module.exports = score;

