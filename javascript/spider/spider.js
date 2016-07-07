var utils = require('./utils');
var request = utils.promisify(require('request'));
var mkdirp = utils.promisify(require('mkdirp'));
var fs = require('fs');
var path = require('path');
var writeFile = utils.promisify(fs.writeFile);

function download(url, filename) {
    console.log(`Downloading ${url} ...`);
    var body;
    return request(url).then((results) => {
        body = results[1];
        return mkdirp(path.dirname(filename));
    }).then(() => {
        return writeFile(filename, body);
    }).then(() => {
        console.log(`Downloaded and saved to ${filename}`);
        return body;
    });
}

module.exports.download = download;
