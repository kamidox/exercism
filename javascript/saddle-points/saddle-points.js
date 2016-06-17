// matrix is from another exercise named matrix.
var Matrix = require('../matrix/matrix.js');

function SaddlePointsMatrix (m) {
    'use strict';

    var matrix = new Matrix(m);
    matrix.saddlePoints = saddlePoints();
    return matrix;

    function saddlePoints () {
        var ret = [];
        for (let i = 0; i < matrix.rows.length; i ++) {
            for (let j = 0; j < matrix.columns.length; j ++) {
                if (maxInRow(matrix.rows[i][j], matrix.rows[i]) &&
                    minInColumn(matrix.rows[i][j], matrix.columns[j])) {
                    ret.push([i, j]);
                }
            }
        }
        return ret;
    }

    function maxInRow (elem, arr) {
        var max = Math.max.apply(null, arr);
        return max === elem;
    }

    function minInColumn (elem, arr) {
        var min = Math.min.apply(null, arr);
        return min === elem;
    }
}

module.exports = SaddlePointsMatrix;

