# Sequence network spider

Provide a url, the spider will download all the resources (including html, css, javascript etc) recursively in the domain specific by url in sequence mode. 

## Usage

Please refer to `index.js`:

```js
const spider = require('./spider');     // import spider module

var url = 'http://blog.kamidox.com/';   // the url to download recursively
spider.spider(url, 6)
    .then(() => console.log(`Download Successed.`))
    .catch((err) => console.log(err));
```

## Features

* Use ES6 Promise
* Download resource recursively one by one
* Only download the resource in the same host as specific by url
