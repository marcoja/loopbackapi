'use strict';

var chalk = require('chalk');
var fs    = require('fs');
var lastFM  = require('../lastfm/lastFM');

//This function will log any GET request to the custom application log file.
//this function shoulf be converted into a separate node module.
function makeLog(url, method, endpoint) {
  var file = 'appLogs/appLog.log';
  var date  = new Date();
  var output = `request - ${method} - ${endpoint} - ${url} - ${date}`;
  console.log(chalk.yellow(output));
  //Writes log to file
  fs.appendFile(file, `${output} \n`, function(err) {
    if (err) { console.log(chalk.red(err)); }
  });
}

module.exports = function(Video) {
  var endpointName = '/Videos';
  Video.search = function(name, items, page, cb) {
    var query = {name: name, items: items, page: page};
    lastFM.query(query, function(error, goodQuery) {
      //check for error
      if (error) { return cb(error, null); }
      //Handle success
      lastFM.search(goodQuery, function(error, response) {
        //check for error
        if (error) {
          return cb(error, null);
        }
        //handle success
        cb(null, response);
      });//search
    });//query
  };//video

  //Method metadata definition
  Video.remoteMethod('search', {
    http: {path: '/search', verb: 'get'},
    accepts: [
      {arg: 'name', type: 'string'},
      {arg: 'itemsPerPage', type: 'number'},
      {arg: 'page', type: 'number'},
    ],
    //returns: {arg: 'results', type: 'json'},
    returns: {type: 'array', root: true},
  });

 //Remote hook acting on endpoint method find
  Video.beforeRemote('find', function(context, user, next) {
    console.log('hook hook hook!');
    makeLog(context.req.url, context.req.method, endpointName);
    next();
  });

  //Remote hook acting on endpoint method search
  Video.beforeRemote('search', function(context, user, next) {
    console.log(chalk.green('remote method: search'));
    makeLog(context.req.url, context.req.method, endpointName);
    next();
  });
};//module exports
