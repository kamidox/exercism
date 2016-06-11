function LinkedList () {
    this._head = null;
    this._tail = null;
}

LinkedList.prototype.push = function (val) {
    var node = {
        value: val,
        next: null,
        prev: this._tail
    };
    if (this._tail !== null) {
        this._tail.next = node;
    }
    this._tail = node;
    if (this._head === null) {
        this._head = node;
    }
    return val;
};

LinkedList.prototype.pop = function () {
    if (this._tail === null) {
        throw new Error('LinkedList is empty');
    }

    var node = this._tail;
    this._tail = this._tail.prev;
    if (this._tail === null) {
        this._head = null;
    } else {
        this._tail.next = null;
    }
    return node.value;
};

LinkedList.prototype.shift = function () {
    if (this._head === null) {
        throw new Error('LinkedList is empty');
    }
    var node = this._head;
    this._head = this._head.next;
    if (this._head === null) {
        this._tail = null;
    } else {
        this._head.prev = null;
    }
    return node.value;
};

LinkedList.prototype.unshift = function (val) {
    var node = {
        value: val,
        next: this._head,
        prev: null
    };
    if (this._head !== null) {
        this._head.prev = node;
    }
    this._head = node;
    if (this._tail === null) {
        this._tail = node;
    }
    return val;
};

LinkedList.prototype.count = function () {
    if (this._head === null) {
        return 0;
    }
    var c = 0;
    var node = this._head;
    while (node !== null) {
        c += 1;
        node = node.next;
    }
    return c;
};

LinkedList.prototype.delete = function (val) {
    if (this._head === null) {
        return false;
    }

    var node = this._head;
    while (node !== null) {
        if (node.value === val) {
            if (node === this._head || node === this._tail) {
                if (node === this._head) {
                    this._head = node.next;
                    if (this._head !== null) {
                        this._head.prev = null;
                    }
                }
                if (node === this._tail) {
                    this._tail = this._tail.prev;
                    if (this._tail !== null) {
                        this._tail.next = null;
                    }
                }
            } else {
                node.prev.next = node.next;
                node.next.prev = node.prev;
            }
            return true;
        }
        node = node.next;
    }
    return false;
};

module.exports = LinkedList;

