// Suggested test cases:
// BS57980 is a two person match
// RK77773 is a one person match

var regnr = require('./brreg-regnr.js');
var input = process.argv[2].toUpperCase();

regnr.search(input, function(result){
  console.log(result);
});
