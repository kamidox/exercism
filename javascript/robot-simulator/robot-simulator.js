var directions = [ 'north', 'east', 'south', 'west' ];
var moveStep = {
    north: function (a) { a[1] += 1; },
        east: function (a) { a[0] += 1; },
        west: function (a) { a[0] -= 1; },
        south: function (a) { a[1] -= 1; }
};
var instructionMap = {
    R: 'turnRight',
    A: 'advance',
    L: 'turnLeft'
};

function Robot () {
    this.bearing = 'north';
    this.coordinates = [0, 0];
}

Robot.prototype.place = function (params) {
    this.orient(params.direction);
    this.coordinates = [params.x, params.y];
};

Robot.prototype.orient = function (dir) {
    if (directions.indexOf(dir) === -1) {
        throw 'Invalid Robot Bearing';
    }
    this.bearing = dir;
};

Robot.prototype.turnRight = function () {
    var dirs = directions.concat(directions);
    var idx = dirs.indexOf(this.bearing);
    this.orient(dirs[idx + 1]);
};

Robot.prototype.turnLeft = function () {
    var dirs = directions.concat(directions);
    var idx = dirs.indexOf(this.bearing);
    this.orient(dirs[idx + 3]);
};

Robot.prototype.at = function (x, y) {
    this.coordinates = [x, y];
};

Robot.prototype.advance = function () {
    moveStep[this.bearing](this.coordinates);
};

Robot.prototype.instructions = function (ins) {
    return ins.split('').map(function (c) {
        return instructionMap[c];
    });
};

Robot.prototype.evaluate = function (ins) {
    var steps = this.instructions(ins);
    steps.forEach(function (step) {
        this[step]();
    }, this);
};

module.exports = Robot;

