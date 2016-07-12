# Parallel network spider

Provide a url, the spider will download all the resources (including html, css, javascript etc) recursively in the domain specific by url in parallel mode. 

## Usage

Please refer to `index.js`:

```js
const spider = require('./spider');     // import spider module

var url = 'http://blog.kamidox.com/';   // the url to download recursively
spider.spider(url, 6)
    .then(() => console.log(`Parallel downloading task is starting ...`))
    .catch((err) => console.log(err));
```

## Features

* Use ES6 Promise
* Download resources recursively and work in parallel mode
* Concurrency task can be config in `spider.js`, default is 5
* Only download the resource in the same host as specific by url
