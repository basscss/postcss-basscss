
var postcss = require('postcss')
var specificity = require('specificity')

module.exports = postcss.plugin('postcss-basscss-remove-ids', function () {

  return function (root, result) {

    root.eachRule(function (rule) {
      var hasId = false

      rule.selectors.forEach(function (selector) {
        var score = specificity
          .calculate(rule.selector)[0]
          .specificity
          .split(',')
        if (parseInt(score[1], 10) > 0) {
          hasId = true
        }
      })

      if (hasId) {
        var ruleCss = postcss().process(rule).css
        var comment = postcss.comment({
          text: [
            'ERROR! This rule contains an ID selector and has been disabled.',
            ruleCss
          ].join('')
        })
        result.warn(rule.selector + ' contains an ID selector and its rule has been commented out.', { node: rule })
        rule.replaceWith(comment)
      }
    })

  }

})

