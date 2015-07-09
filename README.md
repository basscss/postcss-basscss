# postcss-basscss

Postcss plugin for [Basscss](http://basscss.com)

Adds Basscss modules to the end of a stylesheet.

## Usage

```js
var fs = require('fs')
var postcss = require('postcss')
var basscss = require('postcss-basscss')

var src = fs.readFileSync('css/input.css', 'utf8')

var output = postcss()
  .use(basscss())
  .process(src)
  .css

console.log(output)
```

More features to come...

MIT License
