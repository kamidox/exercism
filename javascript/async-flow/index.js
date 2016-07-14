var fs = require('fs');
var path = require('path');
var asyncFlow = require('./async-flow').asyncFlow;
var asyncFlowWithThunk = require('./async-flow').asyncFlowWithThunk;

asyncFlow(function* (callback) {
    var fname = path.basename(__filename);
    var data = yield fs.readFile(fname, 'utf8', callback);
    yield fs.writeFile('clone_' + fname, data, callback);
    console.log(`cloned: ${fname}`);
})

function readFileThunk(fname, opts) {
    return function (callback) {
        return fs.readFile(fname, opts, callback);
    }
}

function writeFileThunk(fname, data) {
    return function (callback) {
        return fs.writeFile(fname, data, callback);
    }
}

asyncFlowWithThunk(function* () {
    var fname = path.basename(__filename);
    var data = yield readFileThunk(fname, 'utf8');
    yield writeFileThunk('clone_thunk_' + fname, data);
    console.log(`cloned with thunk: ${fname}`);
})
