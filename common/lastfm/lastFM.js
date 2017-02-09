'use strict';

//Required modules
var request = require('request');
var chalk   = require('chalk');
var config  = require('./configLastFM');

//Module for interacting with the last fm api
var LastFM = function() {
  this.moduleName = 'LastFM';
};

//This method will request matadata information for a given song
//from the lastfm API
LastFM.prototype.searchById = function(name, limit, cb) {
  console.log(chalk.green('I am searchById'));
  var error, answer;
  var options = this.buildOptions(name, limit);
  request(options, function(err, response, body) {

    console.log('lalalalaq');
    console.log(body);

    //check for error
    if (error) {
      console.log('error');
      cb(error, null);
    }
    //check for response code
    if (response.statusCode !== 200) {
      console.log('bad status code');
      error = {code: response.statusCode, msg: response.statusMessage};
      cb(error, null);
    }
    //handling request
    cb(null, body);
  });
};//searchById

//Helper method to parse and build the request options object.
LastFM.prototype.buildOptions = function(name, limit) {
  //console.log(chalk.cyan('I am buildOptions'));
  var qs = {
    'method': 'track.search',
    'format':'json',
    'api_key': config.key,
    'limit': limit,
    'track': name,
  };

  var parsedOptions = {
    uri: config.uri,
    qs: qs,
  };
  return parsedOptions;
};//buildOptions

//Helper method for parsing and building the custom response object.
LastFM.prototype.buildResponse = function(foo) {
  console.log(chalk.cyan('I am buildResponse'));
};//buildResponse

module.exports = new LastFM();
