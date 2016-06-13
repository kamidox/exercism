function BinarySearch (arr) {
    'use strict';

    // check for unsorted array
    for (var i = 0; i < arr.length - 1; i ++) {
        if (arr[i] > arr[i+1]) {
            return {};
        }
    }

    return {
        array: arr,
        indexOf: function (val) {
            return binSearch(arr, val, 0, arr.length);
        }
    };
}

function binSearch (arr, val, start, end) {
    'use strict';

    if (start === end) {
        return -1;
    }

    var mid = Math.ceil((start + end) / 2);
    if (arr[mid] > val) {
        return binSearch(arr, val, start, mid - 1);
    } else if (arr[mid] < val) {
        return binSearch(arr, val, mid, end);
    } else {
        return mid;
    }
}

module.exports = BinarySearch;

