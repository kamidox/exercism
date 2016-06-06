function keep (array, pred) {
    'use strict';

    var ret = [];
    for (var i = 0; i < array.length; i ++) {
        if (pred(array[i])) {
            ret.push(array[i]);
        }
    }
    return ret;
}

function discard (array, pred) {
    'use strict';

    return keep(array, function (element) {
        return !pred(element);
    });
}

exports.keep = keep;
exports.discard = discard;

