function Gigasecond(start) {
  this.start = start;
}

Gigasecond.prototype.date = function () {
  var milseconds = this.start.getTime() + 1000000000000;
  return new Date(milseconds);
};

module.exports = Gigasecond;
