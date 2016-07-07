const spider = require('./spider');

var url = 'http://kamidox.com/index.html';
var fname = 'C:\\Users\\CNJOHUA10\\lab\\spider\\blog.html'
spider.download(url, fname)
    .then((body) => console.log(`Download Successed. Size = ${body.length}`))
    .catch((err) => console.log(err));