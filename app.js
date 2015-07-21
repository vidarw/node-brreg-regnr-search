var regnr = require('./brreg-regnr.js');
var input = process.argv[2].toUpperCase();

regnr.search(input, function(result){
  console.log(result);
});
