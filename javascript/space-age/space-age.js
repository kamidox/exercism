function SpaceAge (seconds) {
    'use strict';
    this.yearsOnPlanets = {
        Earth: 1.0,
        Mercury: 0.2408467,
        Venus: 0.61519726,
        Mars: 1.8808158,
        Jupiter: 11.862615,
        Saturn: 29.447498,
        Uranus: 84.016846,
        Neptune: 164.79132
    };

    this.seconds = seconds;
    this.yearsOnEarth = seconds / 31557600;
}

SpaceAge.prototype.earthToPlanet = function (planet) {
    'use strict';
    var years = this.yearsOnEarth / this.yearsOnPlanets[planet];
    return parseFloat(years.toFixed(2));
};

// There is no meta programming on Javascript before EMAScript 6.
// So we need to repeat our self.
SpaceAge.prototype.onEarth = function () {
    'use strict';
    return this.earthToPlanet('Earth');
};

SpaceAge.prototype.onMercury = function () {
    'use strict';
    return this.earthToPlanet('Mercury');
};

SpaceAge.prototype.onVenus = function () {
    'use strict';
    return this.earthToPlanet('Venus');
};

SpaceAge.prototype.onMars = function () {
    'use strict';
    return this.earthToPlanet('Mars');
};

SpaceAge.prototype.onJupiter = function () {
    'use strict';
    return this.earthToPlanet('Jupiter');
};

SpaceAge.prototype.onSaturn = function () {
    'use strict';
    return this.earthToPlanet('Saturn');
};

SpaceAge.prototype.onUranus = function () {
    'use strict';
    return this.earthToPlanet('Uranus');
};

SpaceAge.prototype.onNeptune = function () {
    'use strict';
    return this.earthToPlanet('Neptune');
};

module.exports = SpaceAge;
