const spider = require('./spider');

var url = 'http://blog.kamidox.com';
var fname = './tmp/index.html'
spider.download(url, fname)
    .then((body) => console.log(`Download Successed. Size = ${body.length}`))
    .catch((err) => console.log(err));
