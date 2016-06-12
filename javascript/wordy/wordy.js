function parseOperators (question) {
    'use strict';

    var reBegin = /^What\s+is\s+(-?\d+)/;
    var reNext = /\s+(plus|minus|multiplied by|divided by)\s+(-?\d+)/;
    var operators = [];

    var matchBegin = question.match(reBegin);
    if (matchBegin === null) {
        // Not match the question begin pattern
        throw new ArgumentError();
    }
    var matchNext = matchBegin.input.substr(matchBegin[0].length).match(reNext);
    if (matchNext === null) {
        // At least have two operations in question
        throw new ArgumentError();
    }
    operators.push(matchBegin[1]);
    while (matchNext !== null) {
        operators.push(matchNext[1]);
        operators.push(matchNext[2]);
        matchNext = matchNext.input.substr(matchNext[0].length).match(reNext);
    }
    return operators;
}

var operatorMap = {
    'plus': function (a, b) { return a + b; },
    'minus': function (a, b) { return a - b; },
    'multiplied by': function (a, b) { return a * b; },
    'divided by': function (a, b) { return a / b; }
};

function calculateOperators (ops) {
    'use strict';

    var opResult = (Number)(ops[0]);
    var opMethod, opNumber;
    for (var i = 1; i < ops.length; i += 2) {
        opMethod = ops[i];
        opNumber = (Number)(ops[i + 1]);
        opResult = operatorMap[opMethod](opResult, opNumber);
    }
    return opResult;
}

function WordProblem (question) {
    'use strict';

    return {
        answer: function () {
            return calculateOperators(parseOperators(question));
        }
    };
}

function ArgumentError () {
    this.name = 'ArgumentError';
    this.message = 'Argument error';
}

exports.WordProblem = WordProblem;
exports.ArgumentError = ArgumentError;

