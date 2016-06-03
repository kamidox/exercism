
var Year = function (year) {
    'use strict';
    this.year = year;
};

Year.prototype.isLeap = function () {
    'use strict';
    return (this.year % 400 === 0) || ((this.year % 100 !== 0) && (this.year % 4 === 0));
};

module.exports = Year;
