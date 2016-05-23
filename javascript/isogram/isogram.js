function Isogram(word) {
  this.word = word.replace(/ |-/g, '');
}

Isogram.prototype.isIsogram = function () {
  var unique = new Map();
  var chars = this.word.toLowerCase().split('');
  chars.forEach(function(element, index, array) {
    unique.set(element, index);
  });
  return unique.size === chars.length;
};

module.exports = Isogram;
