
var _ = require('lodash');
var postcss = require('postcss');
var atImport = require('postcss-import');
var customMedia = require('postcss-custom-media');
var customProperties = require('postcss-custom-properties');
var calc = require('postcss-calc');
var colorFunction = require('postcss-color-function');

var mutations = require('./lib/mutations');
var mixed = require('./lib/mixed-properties');

module.exports = postcss.plugin('postcss-basscss', function(opts) {

  var opts = opts || {};
  opts = _.defaults(opts, {
    mutations: true,
    mixedProperties: {
      threshold: 7
    },
    modules: {}
  });

  var basscssSource = [
    '@import "basscss-base-reset";',
  ].join('\n');

  var processor = postcss([
    atImport(),
    customMedia(),
    customProperties(),
    calc(),
    colorFunction()
  ]);


  return function(root, result) {

    var basscss = processor
      .process(basscssSource).root;


    mutations(root, result);
    mixed(root, result);

    root.append(basscss);

  }

});

