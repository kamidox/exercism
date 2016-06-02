function Acronyms () {
}

Acronyms.prototype.parse = function (phrases) {
    var words = phrases.split(/\W/);
    return words.map(function (currentValue, index, array) {
        return currentValue[0].toUpperCase();
    });
}

module.exports = Acronyms;

