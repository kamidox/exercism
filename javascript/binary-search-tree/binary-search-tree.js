function BinarySearchTree (rootVal) {
    'use strict';

    this.data = rootVal;
    this.left = null;
    this.right = null;
}

BinarySearchTree.prototype.insert = function (val) {
    'use strict';

    bstInsert(this, val);
};

BinarySearchTree.prototype.each = function (handler) {
    'use strict';

    bstEach(this, handler);
};

function bstInsert (node, val) {
    'use strict';

    if (val <= node.data) {
        if (node.left !== null) {
            bstInsert(node.left, val);
        } else {
            node.left = {data: val, left: null, right: null};
        }
    } else {
        if (node.right !== null) {
            bstInsert(node.right, val);
        } else {
            node.right = {data: val, left: null, right: null};
        }
    }
}

function bstEach (node, handler) {
    'use strict';

    if (node.left !== null) {
        bstEach(node.left, handler);
    }
    handler(node.data);
    if (node.right !== null) {
        bstEach(node.right, handler);
    }
}

module.exports = BinarySearchTree;

