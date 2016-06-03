var DnaTranscriber = function () {};

// Key Hint:
// 1. use Json to map DNA to RNA
// 2. use String.prototype.replace() to convert
// 3. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace

var dnaToRna = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
};

DnaTranscriber.prototype.toRna = function (dna) {
    'use strict';
    return dna.replace(/./g, function (match) {
        return dnaToRna[match] || '';
    });
};

module.exports = DnaTranscriber;
