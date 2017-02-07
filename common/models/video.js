'use strict';

var chalk = require('chalk');
var fs    = require('fs');
var request = require('request');

//This function will log any GET request to the custom application log file.
//this function shoulf be converted into a separate node module.
function makeLog(url, method, endpoint) {
  var file = 'appLogs/appLog.log';
  var date  = new Date();
  var output = `request - ${method} - ${endpoint} - ${url} - ${date}`;
  console.log(chalk.cyan(output));
  //Writes log to file
  fs.appendFile(file, `${output} \n`, function(err) {
    if (err) { console.log(chalk.red(err)); }
  });
}

module.exports = function(Video) {
  var endpointName = '/Videos';

  Video.search = function(name, cb) {
    //Array to store the resulting list of songs
    var results = [];
    //Sets default search term in case none is provided
    if (!name) { name = 'another brick in the wall'; }
    //Information to build the final url
    var baseUrl    = 'http://ws.audioscrobbler.com/2.0/?method=track.search&format=json&track=';
    var searchName = name;
    var apiKey     = '&api_key=5ead2e438c59e9cd17ef41039f2bfbc6';
    var url        = baseUrl + searchName + apiKey;
    //http request options
    var options = {
      method: 'get',
      url: url,
    };
    request(options, function(error, response, body) {
      if (error) { throw new Error(error); }
      var test = JSON.parse(body);
      var list = test.results.trackmatches.track;
      list.forEach(function(track, index) {
        results.push({name: track.name, author: track.artist, year: 1990});
      });
      cb(null, results);
    });
  };
  //Method metadata definition
  Video.remoteMethod('search', {
    http: {path: '/search', verb: 'get'},
    accepts: [{arg: 'name', type: 'string'}],
    returns: {arg: 'results', type: 'json'},
  });
 //Remote hook acting on endpoint method find
  Video.beforeRemote('find', function(context, user, next) {
    //console.log('hook hook hook!');
    makeLog(context.req.url, context.req.method, endpointName);
    next();
  });
  //Remote hook acting on endpoint method search
  Video.beforeRemote('search', function(context, user, next) {
    //console.log(chalk.green('another hook!'));
    makeLog(context.req.url, context.req.method, endpointName);
    next();
  });
};//module exports
