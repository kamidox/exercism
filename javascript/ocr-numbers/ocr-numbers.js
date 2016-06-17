function convert (txt) {
    'use strict';

    var charsMap = {
        ' _ \n| |\n|_|\n   ': '0',
        '   \n  |\n  |\n   ': '1',
        ' _ \n _|\n|_ \n   ': '2',
        ' _ \n _|\n _|\n   ': '3',
        '   \n|_|\n  |\n   ': '4',
        ' _ \n|_ \n _|\n   ': '5',
        ' _ \n|_ \n|_|\n   ': '6',
        ' _ \n  |\n  |\n   ': '7',
        ' _ \n|_|\n|_|\n   ': '8',
        ' _ \n|_|\n _|\n   ': '9'
    };

    function splitRows () {
        var lines = txt.split('\n');
        var ret = [];
        var row = [];
        for (let i = 1; i <= lines.length; i ++) {
            row.push(lines[i - 1]);
            if (i % 4 === 0) {
                ret.push(row.join('\n'));
                row = [];
            }
        }
        return ret;
    }

    function splitChar (row) {
        var chars = [];
        var lines = row.split('\n');
        var len = Math.floor(lines[0].length / 3);
        var oneChar = [];
        for (let i = 0; i < len; i ++) {
            for (let j = 0; j < lines.length; j ++) {
                oneChar.push(lines[j].substr(i * 3, 3));
            }
            chars.push(oneChar.join('\n'));
            oneChar = [];
        }
        return chars;
    }

    var ret = [];
    var rows = splitRows();
    for (let i = 0; i < rows.length; i ++) {
        var chars = splitChar(rows[i]);
        var digits = [];
        for (let j = 0; j < chars.length; j ++) {
            var c = charsMap[chars[j]];
            if (!c) {
                c = '?';
            }
            digits.push(c);
        }
        ret.push(digits.join(''));
    }
    return ret.join(',');
}

exports.convert = convert;

