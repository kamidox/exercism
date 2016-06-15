function Triangle (level) {
    this.rows = triangleRows();
    this.lastRow = this.rows[this.rows.length - 1];

    function triangleRows () {
        var rows = [[1]];
        for (var i = 1; i < level; i ++) {
            var newRow = nextRow(rows[i - 1]);
            rows.push(newRow);
        }
        return rows;
    }

    function nextRow(row) {
        var len = row.length + 1;
        var newRow = new Array(len);
        // first and last element is 1
        newRow[0] = 1;
        newRow[len - 1] = 1;
        // middle element from 1 to len - 1
        for (var k = 1; k < len - 1; k ++) {
            newRow[k] = row[k - 1] + row[k];
        }
        return newRow;
    }
}

module.exports = Triangle;

