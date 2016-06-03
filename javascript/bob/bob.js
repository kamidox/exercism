
// Hint: use RegExp to analyze string pattern
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp

var Bob = function() {};

var isSilence = function(msg) {
    'use strict';
    return msg.trim() === '';
};

var isYelling = function(msg) {
    'use strict';
    return msg.toUpperCase() === msg && /[A-Z]/.test(msg);
};

var isQuestion = function(msg) {
    'use strict';
    return msg.endsWith('?');
};

Bob.prototype.hey = function(input) {
    'use strict';
    if (isSilence(input)) {
        return 'Fine. Be that way!';
    } else if (isYelling(input)) {
        return 'Whoa, chill out!';
    } else if (isQuestion(input)) {
        return 'Sure.';
    } else {
        return 'Whatever.';
    }
};

module.exports = Bob;
