function Triangle (a, b, c) {
    this.borders = [a, b, c].sort();
}

function isInvalid(borders) {
    function negative (currentValue, index, array) {
        return currentValue <= 0;
    }

    if (borders.some(negative)) {
        return true;
    }

    if (borders[0] + borders[1] <= borders[2]) {
        return true;
    }

    return false;
}

Triangle.prototype.kind = function () {
    var b = this.borders;

    if (isInvalid(b)) {
        throw new TypeError('illegal');
    } else if (b[0] == b[1] && b[0] == b[2]) {
        return 'equilateral';
    } else if (b[0] == b[1] || b[1] == b[2]) {
        return 'isosceles';
    } else {
        return 'scalene';
    }
}

module.exports = Triangle;

