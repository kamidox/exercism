var utils = require('../utils');

describe('utils', function () {
    it('urlToFilename', function () {
        var fname = utils.urlToFilename('http://blog.kamidox.com/index.html');
        expect(fname).to.equal('index.html');
    });
});
