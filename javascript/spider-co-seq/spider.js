var utils = require('./utils');
var thunkify = require('thunkify');
var request = thunkify(require('request'));
var mkdirp = thunkify(require('mkdirp'));
var fs = require('fs');
var path = require('path');
var readFile = thunkify(fs.readFile);
var writeFile = thunkify(fs.writeFile);
var nextTick = thunkify(process.nextTick);

var _visitedUrls = {};

/**
 * This is a Generator Function.
 * Download the resource specified by `url` and save it to `filename`
 * 
 * @param {String} url - the resource url
 * @param {String} filename - filename to save to
 * @returns downloaded body content
 */
function* download(url, filename) {
    console.log(`Downloading ${url} ...`);
    var rets = yield request(url);
    var body = rets[1];
    yield mkdirp(path.dirname(filename));
    yield writeFile(filename, body);
    console.log(`Downloaded and save to ${filename}`);
    return body;
}

/**
 * This is Generator Function
 * Download the resource specified by `url` recursively with the limited `nesting` level. 
 * 
 * @param {String} url - the url to download
 * @param {Number} nesting - nesting level
 * @param {String} [root='./tmp'] - root dir to store download resources
 */
function* spider(url, nesting, root = './tmp') {
    var fname = utils.urlToFilename(url, root);
    var body;
    try {
        body = yield readFile(fname, 'utf-8');
        console.log(`Use existing ${fname} for ${url}`);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
        body = yield download(url, fname);
    }
    yield _spiderLinks(url, body, nesting, root);
}

/**
 * This is a Generator Function
 * Parse all the link in `body` and download it which is in the same domain of `url`.
 * 
 * @param {String} url - The url which the body belong to
 * @param {String} body - The web page body
 * @param {Number} nesting - Nesting level
 * @param {String} root - root directory to store content
 * @return {Undefined}
 */
function* _spiderLinks(url, body, nesting, root) {
    if (nesting === 0) {
        return yield nextTick();
    }
    var links = utils.getPageLinks(url, body);
    console.log(`spider: ${url} with ${links.length} links`);
    for (var link of links) {
        if (!_visitedUrls[link]) {
            _visitedUrls[link] = true;
            yield spider(link, nesting - 1, root);
        }
    }
}

module.exports.download = download;
module.exports.spider = spider;
