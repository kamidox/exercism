const spider = require('./spider');

var url = 'http://blog.kamidox.com/';
spider.spider(url, 6)
    .then(() => console.log(`Parallel downloading task is starting ...`))
    .catch((err) => console.log(err));
