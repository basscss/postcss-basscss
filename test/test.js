
var basscss = require('..');
var postcss = require('postcss');
var assert = require('assert');

var processor = postcss([basscss()]);

var css = [
  '.tomato { width: 100%; height: 12px; display: block; color: tomato; }',
  '#potato { display: block; }',
  '.herp { height: 12px; display: block; color: tomato; }',
  '.brown { width: 100%; color: brown; }',
  '.red { color: red; }',
  '.derp { color: blue; }',
].join('\n');
var results;

describe('postcss-basscss', function() {

  it('should not throw', function() {
    assert.doesNotThrow(function() {
      results = processor
        .process(css).css;
      console.log(results);
    });
  });

  it('should return a postcss lazy object', function() {
    results = processor.process(css);
    assert.equal(typeof results, 'object');
  });

  it('should produce warnings', function() {
    results = processor.process(css);
    var warnings = results.warnings();
    console.log(warnings, results.css);
    assert.equal(Array.isArray(warnings), true);
  });

});

