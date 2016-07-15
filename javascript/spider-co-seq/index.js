const spider = require('./spider');     // import spider module
const co = require('co');

var url = 'http://blog.kamidox.com/';   // the url to download recursively
co(function* () {
    yield spider.spider(url, 6);
}).then(() => {
    console.log('Download Successed.');
}).catch((err) => {
    console.log('Download Error.');
    console.log(err);
});
