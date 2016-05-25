function BeerSong() {}

function bottles(number) {
  var str = '';

  if (number === 0) {
    str = 'No more bottles';
  } else if (number === 1) {
    str = '1 bottle';
  } else {
    str = number + ' bottles';
  }

  return str;
}

function action(current_verse) {
  var sbj, str = '';

  if (current_verse === 0) {
    str = 'Go to the store and buy some more, ';
  } else {
    sbj = (current_verse === 1 ? 'it' : 'one');
    str = 'Take ' + sbj + ' down and pass it around, ';
  }

  return str;
}

function next_bottle(current_verse) {
  return bottles(next_verse(current_verse)).toLowerCase() + ' of beer on the wall.\n';
}

function next_verse(current_verse) {
  return current_verse === 0 ? 99 : (current_verse - 1);
}

BeerSong.prototype.verse = function (n) {
  var line1 = bottles(n) + ' of beer on the wall, ';
  var line2 = bottles(n).toLowerCase() + ' of beer.\n';
  var line3 = action(n);
  var line4 = next_bottle(n);

  return [line1, line2, line3, line4].join('');
};

BeerSong.prototype.sing = function (start_idx, end_idx) {
  if (typeof(start_idx) == 'undefined') {
    start_idx = 99;
  }
  if (typeof(end_idx) == 'undefined') {
    end_idx = 0;
  }
  var indexs = new Array(start_idx - end_idx);
  for (var i = start_idx; i >= end_idx; i --) {
    indexs[start_idx - i] = i;
  }
  var verses = indexs.map(this.verse);
  return verses.join('\n');
};

module.exports = BeerSong;
