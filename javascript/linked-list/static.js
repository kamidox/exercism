var a = 0;
var b = 0;

function Static () {
    a += 1;
    b += 1;
    this.a = a;
    this.b = b;
}

module.exports = Static;

