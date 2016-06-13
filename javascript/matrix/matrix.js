function Matrix (numbers) {
    'use strict';

    this.rows = parseRows(numbers);
    this.columns = toColumns(this.rows);
}

function parseRows (nums) {
    var rows = nums.split('\n');
    return rows.map(function (row) {
        var retRow = [];
        row.split(/\s/).forEach(function (c) {
            retRow.push((Number)(c));
        });
        return retRow;
    });
}

function toColumns (rows) {
    var nCol = rows[0].length;
    var nRow = rows.length;
    var columns = [];
    for (var i = 0; i < nCol; i ++) {
        var col = [];
        for (var j = 0; j < nRow; j ++) {
            col.push(rows[j][i]);
        }
        columns.push(col);
    }
    return columns;
}

module.exports = Matrix;

