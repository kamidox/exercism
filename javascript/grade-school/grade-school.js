module.exports = function School() {
  var students = {};

  function add(name, grade) {
    if(students[grade]) {
      students[grade].push(name);
    } else {
      students[grade] = [name];
    }
  }

  function grade(grade) {
      return students[grade] ? clone(students[grade]).sort() : [];
  }

  function roster() {
    var sortedGrade = Object.keys(students).sort();
    return sortedGrade.reduce(function (sorted, grade) {
      sorted[grade] = clone(students[grade]).sort();
      return sorted;
    }, {});
  }

  return {
    add: add,
    grade: grade,
    roster: roster
  };
};

function clone(array) {
  return array.slice();
}
