
var basscss = require('..')
var postcss = require('postcss')
var assert = require('assert')

var processor = postcss([basscss({
})])

var css = [
  '/* Please don’t write CSS like this */',
  '.tomato { width: 100%; height: 12px; display: block; color: tomato; }',
  '#potato { display: block; }',
  '.herp { height: 12px; display: block; color: tomato; }',
  '.brown { width: 100%; color: brown; }',
  '.red { color: red; }',
  '.blue { color: green; }',
  '.derp { color: blue; }'
].join('\n')

var results

describe('postcss-basscss', function () {

  it('should not throw', function () {
    assert.doesNotThrow(function () {
      results = processor
        .process(css)
        .css
    })
  })

  it('should return a postcss lazy object', function () {
    results = processor.process(css)
    assert.equal(typeof results, 'object')
  })

})

