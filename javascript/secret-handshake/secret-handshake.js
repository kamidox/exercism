function SecretHandshake (val) {
    'use strict';

    var _cmds = {
        1: 'wink',
        2: 'double blink',
        4: 'close your eyes',
        8: 'jump'
    };

    var _num = (Number)(val);
    if (isNaN(_num)) {
        throw new Error('Handshake must be a number');
    }

    return {
        commands: function () {
            var keys = Object.keys(_cmds);
            var ret = [];
            for (var i in keys) {
                if ((Number)(keys[i]) & _num) {
                    ret.push(_cmds[keys[i]]);
                }
            }
            return (_num & 16) ? ret.reverse() : ret;
        }
    };
}

module.exports = SecretHandshake;

