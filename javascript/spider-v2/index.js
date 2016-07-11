const spider = require('./spider');

var url = 'http://blog.kamidox.com/';
spider.spider(url, 6)
    .then(() => console.log(`Download Successed.`))
    .catch((err) => console.log(err));
