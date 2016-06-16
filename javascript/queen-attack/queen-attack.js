function Queens (params) {
    'use strict';

    this.white = [0, 3];
    this.black = [7, 3];
    if (params) {
        this.white = params.white || this.white;
        this.black = params.black || this.black;
    }

    if (samePosition(this.white, this.black)) {
        throw 'Queens cannot share the same space';
    }

    this.toString = () => {
        var ret = '';
        for (let i = 0; i < 8; i ++) {
            for (let j = 0; j < 8; j ++) {
                if (samePosition(this.white, [i, j])) {
                    ret += 'W';
                } else if (samePosition(this.black, [i, j])) {
                    ret += 'B';
                }else {
                    ret += '_';
                }

                if (j === 7) {
                    ret += '\n';
                } else {
                    ret += ' ';
                }
            }
        }
        return ret;
    };

    this.canAttack = () => {
        if (this.white[0] === this.black[0] ||
           this.white[1] === this.black[1] ||
           Math.abs(this.white[0] - this.black[0]) === Math.abs(this.white[1] - this.black[1])) {
            return true;
        }
        return false;
    };

    function samePosition (pos1, pos2) {
        if (pos1[0] === pos2[0] && pos1[1] === pos2[1]) {
            return true;
        }
        return false;
    }
}

module.exports = Queens;

