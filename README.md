# postcss-basscss

PostCSS plugin for [Basscss](http://basscss.com)

Prepends Basscss modules to the beginning of a stylesheet,
enforcing Basscss immutability and removing ID selectors.

## Usage

```js
var fs = require('fs')
var postcss = require('postcss')
var basscss = require('postcss-basscss')

var src = fs.readFileSync('css/input.css', 'utf8')

var options = {
  customProperties: {
    variables: {
      'font-family': '"Avenir Next", "Helvetica Neue", sans-serif'
    }
  }
}

var output = postcss()
  .use(basscss(options))
  .process(src)
  .css

console.log(output)
```

## Basscss Conformance

This plugin **comments out rules** and throws a warning when one of the following occurs:

- A Basscss class selector is mutated – i.e. another ruleset uses the same class name
- An ID selector is used

## Options

### `modules`

An object to enable and disable Basscss modules.

```js
// example
postcss()
  .use(basscss({
    modules: {
      'basscss-responsive-white-space': true,
      'basscss-colors': false
    }
  })
```

### `raw`

Type: `Boolean`
Default `false`

When set to true, this option disables the use of `postcss-custom-media`, `postcss-custom-properties`, `postcss-calc`, and `postcss-color-function` when processing the Basscss source modules. This is useful when defining custom properties in a custom stylesheet.

When using this option, it is recommended to process the results with these plugins or cssnext to ensure browser compatibility.

### `immutable`

Type: `Boolean`
Default: `true`

When set to `true`, mutations on Basscss styles are commented out.

### `removeIds`

Type: `Boolean`
Default: `true`

When set to `true`, rulesets with ID selectors are commented out.

### `import`

Type: `Object`
Default: `{}`

Passes options to the [postcss-import](https://github.com/postcss/postcss-import) plugin when processing Basscss.

### `customMedia`

Type: `Object`
Default: `{}`

Passes options to the [postcss-custom-media](https://github.com/postcss/postcss-custom-media) plugin when processing Basscss.

### `customProperties`

Type: `Object`
Default: `{}`

Passes options to the [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) plugin when processing Basscss.

### `calc`

Type: `Object`
Default: `{}`

Passes options to the [postcss-calc](https://github.com/postcss/postcss-calc) plugin when processing Basscss.

### `colorFunction`

Type: `Object`
Default: `{}`

Passes options to the [postcss-color-function](https://github.com/postcss/postcss-color-function) plugin when processing Basscss.


MIT License

