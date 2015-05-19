
var basscss = require('..');
var postcss = require('postcss');
var assert = require('assert');

var processor = postcss();

var css = [
  '.tomato { width: 100%; color: tomato }',
].join('\n');
var results;

describe('postcss-basscss', function() {

  it('should not throw', function() {
    assert.doesNotThrow(function() {
      results = postcss()
        .use(basscss())
        .process(css).css;
      console.log(results);
    });
  });

  it('should return a postcss lazy object', function() {
    results = processor.process(css);
    assert.equal(typeof results, 'object');
  });
});

