
module.exports = function(s) {

  if (!s) { return false }

  var flattened = s.split(',').map(function(n) {
    if (n < 10) {
       return n;
    } else {
      return 9;
    }
  });
  var base10 = flattened.join('');

  return parseInt(base10, 10);

};

