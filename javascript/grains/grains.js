var BigInt = require ('./big-integer')

function Grains () {
}

Grains.prototype.square = function (n) {
  var bigI = new BigInt(n);
  return bigI.times(n).toString();
}

module.exports = Grains;

