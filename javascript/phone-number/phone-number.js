function PhoneNumber(pb) {
  this.pb = pb.replace(/[^0-9]+/g, '');
}

PhoneNumber.prototype.number = function () {
  var pb = this.pb;
  if (pb.length < 10) {
    return '0000000000';
  } else if (pb.length === 10) {
    return pb;
  } else if (pb.length === 11) {
    if (pb.startsWith('1')) {
      return pb.substr(1);
    } else {
      return '0000000000';
    }
  } else {
    return '0000000000';
  }
};

PhoneNumber.prototype.areaCode = function () {
  var pb = this.number();
  return pb.substr(0, 3);
};

PhoneNumber.prototype.toString = function () {
  var pb = this.number();
  return '(' + this.areaCode() + ') ' + pb.substr(3, 3) + '-' + pb.substr(6);
};

module.exports = PhoneNumber;
