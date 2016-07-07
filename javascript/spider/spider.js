var utils = require('./utils.js');
var request = utils.promisify(require('request'));
var mkdirp = utils.promisify(require('mkdirp'));
var fs = require('fs');
var path = require('path');
var readFile = utils.promisify(fs.readFile);
var writeFile = utils.promisify(fs.writeFile);

/**
 * Download the resource specified by `url` and save it to `filename`
 * 
 * @param {any} url - the resource url
 * @param {any} filename - filename to save to
 * @returns Promise Object
 */
function download(url, filename) {
    console.log(`Downloading ${url} ...`);
    var body;
    return request(url).then((results) => {
        body.type = results[0].headers['content-type'].toLowerCase();
        body.body = results[1];
        return mkdirp(path.dirname(filename));
    }).then(() => {
        return writeFile(filename, body.body);
    }).then(() => {
        console.log(`Downloaded and saved to ${filename}`);
        return body;
    });
}

/**
 * Download the resource specified by `url` recursively with the limited `nesting` level. 
 * 
 * @param {string} url - the url to download
 * @param {integer} nesting - nesting level
 * @param {string} [root='./tmp'] - root dir to store download resources
 * @returns {Promise} - A Promise Object
 */
function spider(url, nesting, root = './tmp') {
    var fname = utils.urlToFilename(url, root);
    return readFile(fname, 'utf-8')
        .then(body => {
            console.log(`Using exist file ${fname} ...`);
            if (path.extname(fname) === '.html' || path.extname(fname) === '.htm') {
                return _spiderLinks(url, body, nesting);
            } else {
                return Promise.resolve();
            }
        },
        err => {
            if (err.code !== 'ENOENT') {
                throw err;
            }
            return download(url, fname).then(body => {
                if (body.type.includes('text/html')) {
                    return _spiderLinks(url, body, nesting);
                } else {
                    return Promise.resolve();
                }
            });
        });
}

function _spiderLinks(url, body, nesting) {
    var promise = Promise.resolve();
    if (nesting === 0) {
        return promise;
    }
    var links = utils.getPageLinks(url, body);
    links.forEach(link => {
        promise = promise.then(() => spider(link, nesting - 1));
    });
    return promise;
}

module.exports.download = download;
module.exports.spider = spider;
