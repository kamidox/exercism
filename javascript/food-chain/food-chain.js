function FoodChain() {}

var foods = ['fly', 'spider', 'bird', 'cat', 'dog', 'goat', 'cow', 'horse'];
var foodsNote = {
  spider: "It wriggled and jiggled and tickled inside her.\n",
  bird: "How absurd to swallow a bird!\n",
  cat: "Imagine that, to swallow a cat!\n",
  dog: "What a hog, to swallow a dog!\n",
  goat: "Just opened her throat and swallowed a goat!\n",
  cow: "I don't know how she swallowed a cow!\n",
};
var foodsDesc = {
  spider: " that wriggled and jiggled and tickled inside her"
};

function get(m, k) {
  var val = m[k];
  if (typeof(val) === 'undefined') {
    return "";
  } else {
    return val;
  }
}

function swallowedFood(idx) {
  return "I know an old lady who swallowed a " + foods[idx] + ".\n";
}

function whySwallowedFood(idx) {
  if (idx === 0) {
    return "I don't know why she swallowed the fly. Perhaps she'll die.\n";
  } else if (idx === (foods.length - 1)) {
    return "She's dead, of course!\n";
  } else {
    return "She swallowed the " + foods[idx] + " to catch the " + foods[idx-1] + get(foodsDesc, foods[idx-1]) + ".\n";
  }
}

FoodChain.prototype.verse = function (idx) {
  idx = idx - 1;
  var first = swallowedFood(idx);
  var desc = get(foodsNote, foods[idx]);
  var lastIdx = idx === (foods.length - 1) ? (foods.length - 1) : 0;
  var last = whySwallowedFood(lastIdx);
  var middle = "";
  if (idx !== 0 && idx !== (foods.length - 1)) {
    while (idx > 0) {
      middle += whySwallowedFood(idx);
      idx = idx - 1;
    }
  }
  return first + desc + middle + last;
};

FoodChain.prototype.verses = function (start, end) {
  var verses = [];
  for (var i = start; i <= end; i ++) {
    verses.push(this.verse(i));
  }
  return verses.join("\n") + '\n';
};

module.exports = FoodChain;
