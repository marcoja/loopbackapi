'use strict';

var chalk = require('chalk');
var fs    = require('fs');

function makeLog(url, method, endpoint) {
  var file = 'appLogs/appLog.log';
  var date  = new Date();
  var output = `request - ${method} - ${endpoint} - ${url} - ${date}`;
  console.log(chalk.cyan(output));

  fs.appendFile(file, `${output} \n`, function(err) {
    if (err) { console.log(chalk.red(err)); }
  });
}

module.exports = function(Video) {
  var endpointName = '/Videos';

  Video.search = function(cb) {
    var response = 'Hello I am the remote method search!';
    cb(null, response);
  };
  Video.remoteMethod('search', {
    http: {path: '/search', verb: 'get'},
    returns: {arg: 'search', type: 'string'},
  });

  Video.beforeRemote('find', function(context, user, next) {
    //console.log('hook hook hook!');
    makeLog(context.req.url, context.req.method, endpointName);
    next();
  });
};//module exports
