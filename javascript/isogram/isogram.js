function Isogram(word) {
    'use strict';
    this.word = word.replace(/ |-/g, '');
}

Isogram.prototype.isIsogram = function () {
    'use strict';
    var unique = new Map();
    var chars = this.word.toLowerCase().split('');
    chars.forEach(function(element, index) {
        unique.set(element, index);
    });
    return unique.size === chars.length;
};

module.exports = Isogram;
