function Flattener () {

}

function flattenArray (ret, a) {
    for (var i in a) {
        if (Array.isArray(a[i])) {
            flattenArray(ret, a[i]);
        } else {
            if (a[i] !== null) {
                ret.push(a[i]);
            }
        }
    }
}

Flattener.prototype.flatten = function (a) {
    var ret = [];

    flattenArray (ret, a);
    return ret;
};

module.exports = Flattener;

