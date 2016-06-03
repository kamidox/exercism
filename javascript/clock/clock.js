function normalize (mins) {
    'use strict';
    while (mins < 0) {
        mins += 24 * 60;
    }
    while (mins >= 24 * 60) {
        mins -= 24 * 60;
    }
    return mins;
}

function Clock (hours, minutes) {
    'use strict';
    if (typeof minutes === 'undefined') {
        minutes = 0;
    }
    this.value = normalize(hours * 60 + minutes);
}

Clock.prototype.toString = function () {
    'use strict';
    function formatNumber (n) {
        if (n < 10) {
            return '0' + n;
        } else {
            return n + '';
        }
    }
    var h = Math.floor(this.value / 60);
    var m = this.value % 60;
    return formatNumber(h) + ':' + formatNumber(m);
};

Clock.prototype.equals = function (other) {
    'use strict';
    return this.value === other.value;
};

Clock.prototype.plus = function (mins) {
    'use strict';
    this.value = normalize(this.value + mins);
    return this;
};

Clock.prototype.minus = function (mins) {
    'use strict';
    this.value = normalize(this.value - mins);
    return this;
};

function at (hours, minutes) {
    'use strict';
    return new Clock(hours, minutes);
}

exports.at = at;
