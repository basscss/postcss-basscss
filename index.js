
var _ = require('lodash');
var postcss = require('postcss');
var atImport = require('postcss-import');
var customMedia = require('postcss-custom-media');
var customProperties = require('postcss-custom-properties');
var calc = require('postcss-calc');
var colorFunction = require('postcss-color-function');

var mixed = require('./lib/mixed-properties');
var specificity = require('./lib/specificity');
var mutations = require('./lib/mutations');

module.exports = postcss.plugin('postcss-basscss', function(opts) {

  var opts = opts || {};
  opts = _.defaults(opts, {
    mutations: true,
    specificity: {
      threshold: 30
    },
    mixed: {
      threshold: 3
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


    mixed(root, result, opts);
    specificity(root, result, opts);
    //mutations(root, result);

    root.append(basscss);

  }

});

