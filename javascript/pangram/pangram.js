var Pangram = function (text) {
  this.text = text;
};

// Official solution use string.replace(/[^a-z]+/gi, '') to clean non-ascii chars

Pangram.prototype.isPangram = function () {
  var chars = this.text.toLowerCase().split("").filter(function (element, index, array) {
    if (element <= 'z' && element >= 'a') {
      return true;
    } else {
      return false;
    }
  });
  var unique = chars.filter(function (element, index, array) {
    return array.indexOf(element) === index;
  });
  return unique.length === 26;
};

module.exports = Pangram;
