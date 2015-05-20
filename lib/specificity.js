
var specificity = require('specificity');
var base10 = require('./specificity-to-base-10');

module.exports = function(root, result, opts) {

  root.eachRule(function(rule) {

    rule.selectors.forEach(function(selector) {
      var s = specificity.calculate(selector)[0];
      var n = base10(s.specificity);
      if (n > opts.specificity.threshold) {
        console.log('specificity', n, rule);
        result.warn('High specificity found. Rule will be removed.', { node: rule });
        rule.removeSelf();
      }
    });

  });

};

