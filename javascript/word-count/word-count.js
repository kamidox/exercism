function WordCount() {}

WordCount.prototype.count = function(txt) {
  var counts = {};
  var words = txt.match(/\S+/g);

  words.forEach(function(word) {
    var lcWord = word.toLowerCase();
    counts[lcWord] = counts.hasOwnProperty(lcWord) ? counts[lcWord] + 1 : 1;
  });
  return counts;
};

module.exports = WordCount;
