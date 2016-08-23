var http = require('http');
var jsdom = require('jsdom');

var personSearch = function(text){
  var personSearch = new RegExp('\ +([a-zA-ZæøåÆØÅ]+)([a-zA-ZæøåÆØÅ\ ]+)\n\ +([0-9a-zA-ZæøåÆØÅ\ ]*)\n* \ +([0-9][0-9][0-9][0-9])\ ([a-zA-ZæøåÆØÅ]+)', 'g');
  var matches = [];

  var currentMatch = personSearch.exec(text);
  while (currentMatch !== null){
    matches.push(currentMatch);
    currentMatch = personSearch.exec(text);
  }

  return matches.map(function(match){
    return {
      firstName: match[2].trim(),
      lastName: match[1].trim(),
      address: match[3].trim(),
      zip: match[4].trim(),
      city: match[5].trim()
    }
  });
}

var extractLog = function(logUrl, callback){
  var baseUrl = 'http://w2.brreg.no/motorvogn/';
  var result = [];

  jsdom.env(baseUrl + logUrl, ["https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"], function (errors, window) {
    var text = window.$('pre').html();
    var htmlLineEndings = new RegExp('<br>', 'g');
    text = text.replace(htmlLineEndings, '\n');
    text = text.substr(text.indexOf("foretak:") + 8);
    result = personSearch(text);

    if(typeof(callback) == "function") callback(result);
  });
}

var search = function(query, callback){
  var url = 'http://w2.brreg.no/motorvogn/heftelser_motorvogn.jsp?regnr=' + query;
  jsdom.env(url, ["https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"], function (errors, window) {
    var logUrl = window.$('table tr a').attr('href');

    if(logUrl.indexOf('dagbokutskrift') === -1){
      if(typeof(callback) == "function") callback([]);
      return;
    }

    extractLog(logUrl, function(result){
      if(typeof(callback) == "function") callback(result);
    });
  });
}

module.exports = { search: search };
