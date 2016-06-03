function randomChar() {
    'use strict';
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

function Robot() {
    'use strict';
    this._name = this.generateName();
}

var usedNames = {};

Robot.prototype = {
    generateName: function () {
        'use strict';
        var name = randomChar() + randomChar() + (Math.random() + '').substr(2, 3);
        if (usedNames[name]) {
            return this.generateName();
        }

        usedNames[name] = true;
        return name;
    },

    reset: function () {
        'use strict';
        this._name = this.generateName();
        return this._name;
    },

    get name () {
        'use strict';
        return this._name;
    }
};

module.exports = Robot;
