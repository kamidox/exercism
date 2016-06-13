var defaultStudents = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Fred',
    'Ginny',
    'Harriet',
    'Ileana',
    'Joseph',
    'Kincaid',
    'Larry'
];

var plantsMap = {
    G: 'grass',
    V: 'violets',
    R: 'radishes',
    C: 'clover'
};

function getPlants (plants, idx) {
    'use strict';

    var rows = plants.split('\n');
    var plantsForIdx = rows[0].substr(idx * 2, 2) + rows[1].substr(idx * 2, 2);
    return plantsForIdx.split('').map(function (c) {
        return plantsMap[c];
    });
}

function Garden (plants, students) {
    students = students || defaultStudents;
    students.sort();

    var ret = {};

    students.forEach(function (c, idx) {
        ret[c.toLowerCase()] = getPlants(plants, idx);
    });
    return ret;
}

module.exports = Garden;

