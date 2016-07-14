var fs = require('fs');
var path = require('path');
var asyncFlow = require('./async-flow').asyncFlow;

asyncFlow(function* (callback) {
    var fname = path.basename(__filename);
    var data = yield fs.readFile(fname, 'utf8', callback);
    yield fs.writeFile('clone_' + fname, data, callback);
    console.log(`cloned: ${fname}`);
})
