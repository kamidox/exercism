function Gigasecond(start) {
    'use strict';
    this.start = start;
}

Gigasecond.prototype.date = function () {
    'use strict';
    var milseconds = this.start.getTime() + 1000000000000;
    return new Date(milseconds);
};

module.exports = Gigasecond;
