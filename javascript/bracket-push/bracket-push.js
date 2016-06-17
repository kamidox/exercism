function bracket (txt) {
    'use strict';

    var openBrackets = '{[(';
    var closeBrackets = ')]}';
    var mapBrackets = {
        '}': '{',
        ']': '[',
        ')': '('
    };

    var stack = [];
    var chars = txt.split('');
    for (let i = 0; i < chars.length; i ++) {
        if (openBrackets.indexOf(chars[i]) !== -1) {
            stack.push(chars[i]);
        } else if (closeBrackets.indexOf(chars[i] !== -1)) {
            if (!mapBrackets[chars[i]]) {
                // ignore chars between brackets
                continue;
            }
            if (stack.pop() !== mapBrackets[chars[i]]) {
                return false;
            }
        }
    }
    return stack.length === 0 ? true : false;
}

module.exports = bracket;

