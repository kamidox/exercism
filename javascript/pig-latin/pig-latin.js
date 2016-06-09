function translate (sentence) {
    'use strict';

    function pigLatin (w) {
        var idx = w.search(/[aeio]/);
        if (idx === -1) {
            idx = w.search(/u[^aeio]/);
        }
        if (idx === 0) {
            return w + 'ay';
        } else if (idx > 0) {
            var prefix = w.substr(0, idx);
            return w.substr(idx) + prefix + 'ay';
        } else {
            return w;
        }
    }

    var words = sentence.split(/\s+/);
    words = words.map(function (w) {
        return pigLatin(w);
    });
    return words.join(' ');
}

exports.translate = translate;

