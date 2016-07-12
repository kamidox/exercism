var utils = require('../utils');

describe('utils', function () {
    it('urlToFilename', function () {
        var fname = utils.urlToFilename('http://blog.kamidox.com/index.html');
        expect(fname).toEqual('tmp/index.html');
        fname = utils.urlToFilename('https://blog.kamidox.com');
        expect(fname).toEqual('tmp/index.html');
        fname = utils.urlToFilename('https://blog.kamidox.com/', '/var/snapshot');
        expect(fname).toEqual('/var/snapshot/index.html');
        fname = utils.urlToFilename('https://blog.kamidox.com/category/tools/sublime.html');
        expect(fname).toEqual('tmp/category/tools/sublime.html');
    });

    it('getPageLinks current dir', function () {
        var url = 'http://blog.kamidox.com';
        var body = `<!doctype html><html class="no-js" lang="en"><link rel="stylesheet" href="./theme/css/foundation.css" /></html>`;
        var links = utils.getPageLinks(url, body);
        expect(links.length).toEqual(1);
        expect(links[0]).toEqual(url + '/' + 'theme/css/foundation.css');
    });

    it('getPageLinks html instructions', function () {
        var url = 'http://blog.kamidox.com';
        var body = `<link rel="stylesheet" href="./theme/css/foundation.css" />`;
        var links = utils.getPageLinks(url, body);
        expect(links.length).toEqual(0);
    });

    it('getPageLinks parent dir', function () {
        var url = 'http://blog.kamidox.com/category';
        var body = '<!doctype html><link rel="stylesheet" href="../theme/css/foundation.css" />';
        var links = utils.getPageLinks(url, body);
        expect(links.length).toEqual(1);
        expect(links[0]).toEqual('http://blog.kamidox.com/theme/css/foundation.css');
    });

    it('getPageLinks tail slash', function () {
        var url = 'http://blog.kamidox.com/category/';
        var body = '<!doctype html><link rel="stylesheet" href="../theme/css/foundation.css" />';
        var links = utils.getPageLinks(url, body);
        expect(links.length).toEqual(1);
        expect(links[0]).toEqual('http://blog.kamidox.com/theme/css/foundation.css');
    });

    it('getPageLinks multi links', function () {
        var url = 'http://blog.kamidox.com';
        var body = ['<!doctype html><link rel="stylesheet" href="./theme/css/foundation.css" />',
            '<link rel="stylesheet" href="./theme/css/pygment/monokai.css" />',
            '<link rel="stylesheet" href="./theme/css/custom.css" />',
        ];
        var links = utils.getPageLinks(url, body.join('\n'));
        expect(links.length).toEqual(body.length);
        expect(links[0]).toEqual(url + '/' + 'theme/css/foundation.css');
        expect(links[1]).toEqual(url + '/' + 'theme/css/pygment/monokai.css');
        expect(links[2]).toEqual(url + '/' + 'theme/css/custom.css');
    });

    it('getPageLinks local script', function () {
        var url = 'http://blog.kamidox.com/';
        var body = '<!doctype html><script src="./theme/js/modernizr.js"></script>';
        var links = utils.getPageLinks(url, body);
        expect(links.length).toEqual(1);
        expect(links[0]).toEqual(url + 'theme/js/modernizr.js');
    });

    it('getPageLinks mixed', function () {
        var url = 'http://blog.kamidox.com/';
        var body = ['<!doctype html><script src="./theme/js/modernizr.js"></script>',
            '<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js"></script>',
            '<link rel="stylesheet" href="./theme/css/custom.css" />',
        ];
        var links = utils.getPageLinks(url, body.join('\n'));
        expect(links.length).toEqual(body.length - 1);
        expect(links[0]).toEqual(url + 'theme/js/modernizr.js');
        expect(links[1]).toEqual(url + 'theme/css/custom.css');
    });

    it('getPageLinks html', function () {
        var url = 'http://blog.kamidox.com/';
        var body = '<!doctype html><li ><a href="./category/android.html">android</a></li>';
        var links = utils.getPageLinks(url, body);
        expect(links.length).toEqual(1);
        expect(links[0]).toEqual(url + 'category/android.html');
    });

    it('getPageLinks file in current dir', function () {
        var url = 'http://blog.kamidox.com/';
        var body = '<!doctype html><li><a href="about.html">About</a></li>';
        var links = utils.getPageLinks(url, body);
        expect(links.length).toEqual(1);
        expect(links[0]).toEqual(url + 'about.html');
    });

    it('getPageLinks remote image', function () {
        var url = 'http://blog.kamidox.com/';
        var body = '<!doctype html><p><img alt="向真理低头是个幸福的事" src="https://raw.githubusercontent.com/kamidox/blogs/master/images/12_citizen.png" /></p>';
        var links = utils.getPageLinks(url, body);
        expect(links.length).toEqual(0);
    });

    it('getPageLinks remote image', function () {
        var url = 'http://blog.kamidox.com/';
        var body = '<!doctype html><li><a href="　http://github.com/mattupstate/flask-mail/">Flask-Mail</a><br />';
        var links = utils.getPageLinks(url, body);
        expect(links.length).toEqual(0);
    });
    
    it('getPageLinks mixed image', function () {
        var url = 'http://blog.kamidox.com/';
        var body = ['<!doctype html><p><img src="http://blog.kamidox.com/images/1.png" /></p>',
            '<p><img src="./images/2.png" /></p>',
            '<p><img src="./images/2.png" /></p>',
            '<p><img src="https://blog.kamidox.com/images/3.png" /></p>'
        ];
        var links = utils.getPageLinks(url, body);
        expect(links.length).toEqual(body.length - 1);
        expect(links[0]).toEqual(url + 'images/1.png');
        expect(links[1]).toEqual(url + 'images/2.png');
        expect(links[2]).toEqual('https://blog.kamidox.com/images/3.png');
    });

    it('getPageLinks remove hash', function () {
        var url = 'http://blog.kamidox.com/';
        var body = '<!doctype html><li><a href="about.html#hash_link">About</a></li>';
        var links = utils.getPageLinks(url, body);
        expect(links.length).toEqual(1);
        expect(links[0]).toEqual('http://blog.kamidox.com/about.html');
    });
});
