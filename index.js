
var _defaults = require('lodash').defaults
var postcss = require('postcss')
var atImport = require('postcss-import')
var customMedia = require('postcss-custom-media')
var customProperties = require('postcss-custom-properties')
var calc = require('postcss-calc')
var colorFunction = require('postcss-color-function')
var removeMutations = require('postcss-remove-mutations')
var removeIds = require('./lib/remove-ids')
var bassmods = require('basscss').modules

module.exports = postcss.plugin('postcss-basscss', function (opts) {

  var bassmodsObj = {}
  bassmods.forEach(function (key) {
    bassmodsObj[key] = true
  })

  opts = opts || {}
  opts = _defaults(opts, {
    modules: bassmodsObj,
    import: {},
    customMedia: {},
    customProperties: {},
    calc: {},
    colorFunction: {},
    immutable: true,
    removeIds: true
  })

  var basscssSource = []

  Object.keys(opts.modules).forEach(function (key) {
    if (opts.modules[key]) {
      basscssSource.push('@import "' + key + '";')
    }
  })

  var processor = postcss([
    atImport(opts.import),
    customMedia(opts.customMedia),
    customProperties(opts.customProperties),
    calc(opts.calc),
    colorFunction(opts.colorFunction)
  ])

  return function (root, result) {

    var basscss = processor
      .process(basscssSource.join('\n'))
      .root

    if (opts.immutable) {
      root = postcss()
        .use(removeMutations({
          immutables: basscss
        }))
        .process(root)
        .root
    }

    if (opts.removeIds) {
      root = postcss()
        .use(removeIds())
        .process(root)
        .root
    }

    root.append(basscss)

  }

})

