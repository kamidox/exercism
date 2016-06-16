function CustomSet (arr) {
    'use strict';

    if (arr === undefined) {
        arr = [];
    }
    //filter out duplicate elements
    arr = arr.filter((elem, idx, self) => {
        return idx === self.indexOf(elem);
    });
    this.data = arr.sort((a, b) => { return a >= b; });

    this.delete = (elem) => {
        var idx = this.data.indexOf(elem);
        if (idx !== -1) {
            this.data.splice(idx, 1);
        }
        return this;
    };

    this.eql = (anotherSet) => {
        if (this.data.length !== anotherSet.data.length) {
            return false;
        }
        for (let i = 0; i < this.data.length; i ++) {
            if (this.data[i] !== anotherSet.data[i]) {
                return false;
            }
        }
        return true;
    };

    this.difference = (anotherSet) => {
        var diff = [];
        for (let i = 0; i < this.data.length; i ++) {
            if (anotherSet.data.indexOf(this.data[i]) === -1) {
                diff.push(this.data[i]);
            }
        }
        return new CustomSet(diff);
    };

    this.disjoint = (anotherSet) => {
        for (let i = 0; i < this.data.length; i ++) {
            if (anotherSet.data.indexOf(this.data[i]) !== -1) {
                return false;
            }
        }
        return true;
    };

    this.empty = () => {
        this.data = [];
        return this;
    };

    this.intersection = (anotherSet) => {
        var inter = [];
        for (let i = 0; i < this.data.length; i ++) {
            if (anotherSet.data.indexOf(this.data[i]) !== -1) {
                inter.push(this.data[i]);
            }
        }
        return new CustomSet(inter);
    };

    this.member = (elem) => {
        return this.data.indexOf(elem) !== -1;
    };

    this.put = (elem) => {
        if (!this.member(elem)) {
            this.data.push(elem);
            this.data.sort((a, b) => {return a >= b;});
        }
        return this;
    };

    this.size = () => {
        return this.data.length;
    };

    this.subset = (anotherSet) => {
        for (let i = 0; i < anotherSet.data.length; i ++) {
            if (this.data.indexOf(anotherSet.data[i]) === -1) {
                return false;
            }
        }
        return true;
    };

    this.toList = () => {
        return this.data;
    };

    this.union = (anotherSet) => {
        for (let i = 0; i < anotherSet.data.length; i ++) {
            this.put(anotherSet.data[i]);
        }
        return this;
    };
}

module.exports = CustomSet;

