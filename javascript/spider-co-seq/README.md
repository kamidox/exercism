# Sequence network spider with co

Provide a url, the spider will download all the resources (including html, css, javascript etc) recursively in the domain specific by url in sequence mode. 

## Usage

Please refer to `index.js`:

```js
const spider = require('./spider');     // import spider module
const co = require('co');

var url = 'http://blog.kamidox.com/';   // the url to download recursively
co(function* () {
    try {
        spider.spider(url, 6);
        console.log('Download Successed.');
    } catch (e) {
        console.log('Download Error.');
        console.log(e);
    }
})();           // co return a thunk function, we need to call it
```

## Features

* Use [co](https://npmjs.org/package/co) to implement async flow
* Download resource recursively one by one
* Only download the resource in the same host as specific by url
