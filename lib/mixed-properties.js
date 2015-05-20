
var _ = require('lodash');
var defs = require('./property-definitions');

module.exports = function(root, result, opts) {

  var opts = opts || {};

  root.eachRule(function(rule) {
    var x = 0;
    var y = 0;
    var ratio = 0;
    var score = 0;
    var properties = [];

    rule.eachDecl(function(decl) {
      properties.push(decl.prop);
    });

    properties.forEach(function(prop) {
      if (_.indexOf(defs.structure, prop) !== -1) {
        x++;
      } else if (_.indexOf(defs.color, prop) !== -1) {
        y++;
      }
    });

    rule.ratio = (x > y) ? y/x : x/y || 0;
    rule.score = rule.ratio * properties.length;

    if (rule.score > opts.mixed.threshold) {
      result.warn('Rule has a high mixed properties score and has been removed', { node: rule });
      rule.removeSelf();
    } else if (rule.ratio > .48) {
      result.warn('Rule has a high mix of property types and has been removed', { node: rule });
      rule.removeSelf();
    } else if (rule.ratio > 0) {
      result.warn('Mixed properties found in ruleset', { node: rule });
    }

    //console.log(result.warnings())

  });
};
