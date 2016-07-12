
var htmlParser = require('htmlparser2');
var urlParser = require('url');
var path = require('path');

module.exports.promisify = function (callbackBasedApi) {
    return function promisified() {
        var args = [].slice.call(arguments);

        return new Promise((resolve, reject) => {
            args.push(function (err, result) {
                if (err) {
                    return reject(err);
                }
                if (arguments.length <= 2) {
                    return resolve(result);
                } else {
                    resolve([].slice.call(arguments, 1));
                }
            });
            callbackBasedApi.apply(null, args);
        });
    }
};

module.exports.urlToFilename = function (url, root='./tmp') {
    var fname = urlParser.parse(url).pathname;
    fname = fname === '/' ? '/index.html' : fname;
    return path.join(root, fname);
}

module.exports.getPageLinks = function (url, body) {
    var linksSet = new Set();
    var links = [];
    var validHtml = false;
    var handler = {
        onopentag: function (name, attrs) {
            if (!validHtml) {
                return;
            }
            var tags = {
                link: 'href',
                script: 'src',
                img: 'src',
                a: 'href'
            };
            var href;
            var keys = Object.keys(tags); 
            var idx = keys.indexOf(name);
            if (idx >= 0) {
                href = attrs[tags[keys[idx]]];
            }
            if (href && _isSameDomain(url, href)) {
                linksSet.add(_normalizeUrl(url, href));
            }
        },
        onprocessinginstruction: function (name, data) {
            if (name === '!doctype' && data.includes('html')) {
                validHtml = true;
            }
        }
    }

    var parser = new htmlParser.Parser(
        handler,
        {
            lowerCaseTags: true,
            lowerCaseAttributeNames: true,
            decodeEntities: true
        });
    parser.write(body);
    parser.end();
    linksSet.forEach(link => links.push(link));
    return links;
}

function _isSameDomain(url, href) {
    var url1 = urlParser.parse(url);
    var url2 = urlParser.parse(href.trim());

    return url2.hostname === null || url1.hostname === url2.hostname;
}

function _normalizeUrl(url, href) {
    var dstUrl = urlParser.parse(href);
    var p = dstUrl.path ? dstUrl.path : '';
    if (dstUrl.host === null || dstUrl.protocol === null) {
        return urlParser.resolve(url, p);
    } else {
        return urlParser.resolve(href, p);
    }
}
