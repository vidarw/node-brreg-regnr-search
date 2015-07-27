# brreg-regnr-search
Searches Brønnøysundregistrene for vechicle owner information based on Norwegian license plates.

## Example

    var regnr = require('brreg-regnr-search');
    
    regnr.search("RK77773", function(result){
      console.log(result);
    });

