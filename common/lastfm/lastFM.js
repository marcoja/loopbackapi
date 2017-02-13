'use strict';

//Required modules
var request = require('request');
var chalk   = require('chalk');

//This method will build a final configuration object fot the http request
//based on a given base configuration file.
var buildOptions = function(baseConfig, query, cb) {
  //console.log('method: buildOptions');
  //validate base config
  if (baseConfig.uri === '' || baseConfig.key === '') {
    var error = new Error('bad baseConfig');
    return cb(error);
  }
  //Build query string object for http request
  var qs = {
    method: 'track.search',
    format: 'json',
    'api_key': baseConfig.key,
    limit: query.items,
    page: query.page,
    track: query.name,
  };
  //Build options objects for http request
  var parsedConfig = {uri: baseConfig.uri, qs: qs};
  cb(null, parsedConfig);
};//buildOptions

//This method will parse and format the final response based on the
//http request results
var buildResponse = function(rawResponse, cb) {
  //console.log('method: buildResponse');
  var parsedResponse = [];
  var tmpResponse = JSON.parse(rawResponse);
  var trackList = tmpResponse.results.trackmatches.track;
  //console.log(trackList[0]);
  trackList.forEach(function(track, index) {
    if (track.mbid) {
      var tmp = {
        name: track.name,
        author: track.artist,
        mbid: track.mbid,
        image: track.image[1]['#text'],
      };
      parsedResponse.push(tmp);
    }
  });
  cb(null, parsedResponse);
};//buildResponse

//This methos will parse the intial option for the request
//initial options:
//name  - string  - Required
//items - number  - Optional  - Default: 10
//page  - number  - Optional  - Default: 1
var parseQuery = function(options, cb) {
  //console.log('method: parseQuery');

  if (!options.name) {
    var err = new Error();
    err.name    = 'Bad name';
    err.status  = '400';
    err.message = 'Missing track name, Unable to perform search.';
    return cb(err);
  }

  var newOpts = {};
  newOpts.name  = options.name;
  newOpts.items = !options.items ? 10 : options.items;
  newOpts.page  = !options.page ? 1 : options.page;
  cb(null, newOpts);
};//parseQuery

//This method will handle the process of "search songs by id"
var searchByID = function(query, cb) {
  //console.log('method: searchById');
  var baseConfig  = require('./configLastFM');
  buildOptions(baseConfig, query, function(error, parsedConfig) {
    //check for errors
    if (error) { return cb(error); }
    //handle success
    request(parsedConfig, function(error, request, response) {
      //check for errors
      if (error) { return cb(error, null); }
      //handle success
      buildResponse(response, function(error, response) {
        //check for errors
        if (error) { return cb(error, null); }
        //handle success
        cb(null, response);
      });
    });//request
  });//buildOptions
};//searchByID
//Build object with public methods
var LastFM = {
  query: parseQuery,
  search: searchByID,
};
//Make methods available
module.exports = LastFM;
