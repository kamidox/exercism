function Anagram(word) {
    'use strict';

    this.word = word;
    this.sorted_chars = word.toLowerCase().split('').sort().toString();
}

Anagram.prototype.matches = function (cands) {
    'use strict';

    var matches = [];
    var sorted_chars = this.sorted_chars;
    var word = this.word;
    cands = Array.isArray(cands) ? cands : [].slice.call(arguments, 0);

    cands.forEach(function (element) {
        if (element.toLowerCase().split('').sort().toString() === sorted_chars) {
            if (word.toLowerCase() !== element.toLowerCase()) {
                matches.push(element);
            }
        }
    });
    return matches;
};

module.exports = Anagram;
