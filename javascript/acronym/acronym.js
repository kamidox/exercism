function Acronyms () {
}

function concat(pValue, cValue) {
    'use strict';

    return pValue + cValue.toUpperCase();
}

Acronyms.parse = function (phrases) {
    'use strict';

    var words = phrases.split(/\W/);
    var acr = words.map(function (currentValue) {
        if (currentValue[0]) {
            if (currentValue.toUpperCase() === currentValue || currentValue.toLowerCase() === currentValue) {
                return currentValue[0];
            } else {
                var subacr = currentValue.split('').filter(function (element) {
                    if (element.search(/\w/) !== -1 && element.toUpperCase() === element) {
                        return true;
                    } else {
                        return false;
                    }
                });
                return subacr.reduce(concat, '');
            }
        } else {
            return '';
        }
    });
    return acr.reduce(concat, '');
};

module.exports = Acronyms;

